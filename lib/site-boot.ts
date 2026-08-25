export const THEME_STORAGE_KEY = 'portfolio-theme'
export const SPLASH_STORAGE_KEY = 'portfolio-splash-seen'
export const SPLASH_DONE_CLASS = 'splash-done'
export const SPLASH_DURATION_MS = 1500

export const BOOTSTRAP_SCRIPT = `(function(){try{var r=document.documentElement;var t=localStorage.getItem('${THEME_STORAGE_KEY}');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(sessionStorage.getItem('${SPLASH_STORAGE_KEY}')||reduce){r.classList.add('${SPLASH_DONE_CLASS}')}else{sessionStorage.setItem('${SPLASH_STORAGE_KEY}','1');setTimeout(function(){r.classList.add('${SPLASH_DONE_CLASS}')},${SPLASH_DURATION_MS})}}catch(e){document.documentElement.classList.add('${SPLASH_DONE_CLASS}')}})()`
