export interface DraftStore<T> {
  load(): T;
  save(value: T): void;
  subscribe(callback: () => void): () => void;
}

interface CreateLocalStorageDraftStoreOptions<T extends { version: number }> {
  key: string;
  currentVersion: number;
  buildDefault: () => T;
  migrate?: (raw: unknown, fromVersion: number) => T;
  /** ms to debounce writes by / the change event still fires immediately. */
  debounceMs?: number;
}

/**
 * The only `DraftStore` implementation today. A future Supabase-backed store
 * just needs to satisfy the same interface / nothing above this file (hooks,
 * editor components, PDF/preview templates) touches `localStorage` directly.
 */
export function createLocalStorageDraftStore<T extends { version: number }>({
  key,
  currentVersion,
  buildDefault,
  migrate,
  debounceMs = 500,
}: CreateLocalStorageDraftStoreOptions<T>): DraftStore<T> {
  const changeEvent = `cv-lab-storage-change:${key}`;
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  let pendingWrite: T | undefined;
  let pagehideBound = false;

  // Cached snapshot / `useSyncExternalStore` requires `load` (its getSnapshot)
  // to return a stable reference between calls when nothing changed, or it
  // loops forever. Only re-read/re-parse localStorage on first load; every
  // later read/write goes through this cache.
  let cache: T | undefined;

  function readFromStorage(): T {
    if (typeof window === "undefined") return buildDefault();

    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return buildDefault();

      const parsed = JSON.parse(raw) as { version?: number };
      const version = typeof parsed.version === "number" ? parsed.version : 0;

      if (version !== currentVersion) {
        const migrated = migrate ? migrate(parsed, version) : buildDefault();
        writeNow(migrated);
        return migrated;
      }

      return parsed as T;
    } catch (error) {
      console.warn(
        `cv-lab-storage: failed to load "${key}", falling back to default`,
        error,
      );
      return buildDefault();
    }
  }

  function load(): T {
    if (cache === undefined) cache = readFromStorage();
    return cache;
  }

  function writeNow(value: T) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`cv-lab-storage: failed to save "${key}"`, error);
    }
  }

  function flushPending() {
    if (!pendingWrite) return;
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = undefined;
    }
    writeNow(pendingWrite);
    pendingWrite = undefined;
  }

  function ensurePagehideFlush() {
    if (typeof window === "undefined" || pagehideBound) return;
    pagehideBound = true;
    window.addEventListener("pagehide", flushPending);
  }

  function save(value: T) {
    cache = value;
    pendingWrite = value;
    if (typeof window === "undefined") return;

    window.dispatchEvent(new CustomEvent(changeEvent));
    ensurePagehideFlush();

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debounceTimer = undefined;
      if (pendingWrite) {
        writeNow(pendingWrite);
        pendingWrite = undefined;
      }
    }, debounceMs);
  }

  function subscribe(callback: () => void) {
    if (typeof window === "undefined") return () => {};

    const onLocal = () => callback();
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      cache = undefined;
      callback();
    };

    window.addEventListener(changeEvent, onLocal);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(changeEvent, onLocal);
      window.removeEventListener("storage", onStorage);
    };
  }

  return { load, save, subscribe };
}
