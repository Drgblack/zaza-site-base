// src/components/zara/types.ts
export type Tone = "neutral" | "warm" | "formal" | "friendly";
export type ContextType = "parent_email" | "report_comment" | "student_feedback" | "staff_note";

export interface ZaraContext {
  type?: ContextType;
  grade?: string | null;
  language?: string;
  tone?: Tone;
}

export interface ZaraPrefs {
  defaultTone?: Tone;
  defaultLanguage?: string;
}

export interface ZaraRequest {
  message: string;
  context?: ZaraContext;
  userPrefs?: ZaraPrefs;
}

export interface ZaraResponse {
  text: string;
  explanation: string;
  alternatives: string[];
  error?: boolean;
  errorType?: 'service_unavailable' | 'api_error' | 'network_error';
}