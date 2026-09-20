import type { AiActionId } from "@/types";
import type { ResumeDraft } from "@/types";

export function buildImprovePrompt(text: string, context?: string) {
  return {
    system:
      "You are an expert resume editor. Improve clarity, impact, and professionalism. Return ONLY the improved text with no quotes or preamble.",
    prompt: `Context: ${context ?? "resume content"}\n\nImprove this:\n\n${text}`,
  };
}

export function buildGenerateSummaryPrompt(draft: ResumeDraft) {
  const experience = draft.sections
    .filter((s) => s.layout === "timeline")
    .flatMap((s) => (s.layout === "timeline" ? s.entries : []))
    .map((e) => ({
      org: e.organization,
      roles: e.roles.map((r) => ({ title: r.title, bullets: r.bullets })),
    }));

  return {
    system:
      "You write concise professional resume summaries. Return ONLY the summary paragraph.",
    prompt: `Write a 3–4 sentence professional summary for ${draft.profile.name}, headline: ${draft.profile.headline}.\n\nExperience:\n${JSON.stringify(experience, null, 2)}`,
  };
}

export function buildGrammarCheckPrompt(text: string) {
  return {
    system:
      "You are a careful copy editor. Fix grammar and spelling. Return ONLY the corrected text.",
    prompt: text,
  };
}

export function buildDraftCoverLetterPrompt(
  draft: ResumeDraft,
  jobDescription: string,
  placeholders: { company?: string; role?: string; hiringManager?: string },
) {
  const summary = draft.sections.find(
    (s) => s.layout === "text" && s.id === "summary",
  );
  return {
    system:
      "You write tailored cover letters. Use a warm professional tone. Return ONLY the letter body paragraphs separated by blank lines. Do not include a greeting (Dear …), closing (Sincerely / Best regards), sender address block, or signature / those are added by the layout.",
    prompt: `Candidate: ${draft.profile.name} (${draft.profile.headline})
Company: ${placeholders.company ?? ""}
Role: ${placeholders.role ?? ""}
Hiring manager: ${placeholders.hiringManager ?? ""}

Resume summary:
${summary && summary.layout === "text" ? summary.content : ""}

Job description:
${jobDescription}

Write the cover letter body only.`,
  };
}

export function buildTranslatePrompt(text: string, targetLanguage: string) {
  return {
    system: `Translate resume content into ${targetLanguage}. Preserve structure and meaning. Return ONLY the translation.`,
    prompt: text,
  };
}

export function buildPromptForAction(
  action: AiActionId,
  payload: Record<string, unknown>,
  draft?: ResumeDraft,
): {
  system: string;
  prompt: string;
  stream: boolean;
  effort: "low" | "medium" | "high";
} {
  if (action === "improve") {
    const built = buildImprovePrompt(
      String(payload.text ?? ""),
      payload.context ? String(payload.context) : undefined,
    );
    return { ...built, stream: false, effort: "low" };
  }
  if (action === "generate-summary") {
    if (!draft) throw new Error("Draft required");
    return {
      ...buildGenerateSummaryPrompt(draft),
      stream: false,
      effort: "medium",
    };
  }
  if (action === "grammar-check") {
    return {
      ...buildGrammarCheckPrompt(String(payload.text ?? "")),
      stream: false,
      effort: "low",
    };
  }
  if (action === "draft-cover-letter") {
    if (!draft) throw new Error("Draft required");
    const built = buildDraftCoverLetterPrompt(
      draft,
      String(payload.jobDescription ?? ""),
      {
        company: payload.company ? String(payload.company) : undefined,
        role: payload.role ? String(payload.role) : undefined,
        hiringManager: payload.hiringManager
          ? String(payload.hiringManager)
          : undefined,
      },
    );
    return { ...built, stream: true, effort: "high" };
  }
  if (action === "translate") {
    const built = buildTranslatePrompt(
      String(payload.text ?? ""),
      String(payload.targetLanguage ?? "English"),
    );
    return { ...built, stream: true, effort: "high" };
  }
  throw new Error(`Unknown action: ${action}`);
}
