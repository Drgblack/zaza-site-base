export type SnippetPreset = {
  id: string;
  label: string;
  topic: string;              // short internal name
  student?: string;
  tone: "Supportive"|"Concise"|"Friendly"|"Formal"|"Warm-professional";
  language: "English"|"German"|"Spanish"|"French"|"Italian";
  seed: {
    positives?: string;
    focus?: string;
    next?: string;
  }
};

export const PRESETS: SnippetPreset[] = [
  {
    id: "behaviour",
    label: "Behaviour update",
    topic: "classroom behaviour",
    student: "Max",
    tone: "Supportive",
    language: "English",
    seed: {
      positives: "Kind to classmates, works well in groups",
      focus: "staying on task during independent work",
      next: "agree on a 2-step cue he can follow to refocus"
    }
  },
  {
    id: "praise",
    label: "Praise note",
    topic: "progress praise",
    student: "Ava",
    tone: "Warm-professional",
    language: "English",
    seed: {
      positives: "great effort in writing workshop",
      focus: "keeping the momentum going",
      next: "ask Ava what she is most proud of this week"
    }
  },
  {
    id: "homework",
    label: "Missing homework",
    topic: "homework follow up",
    student: "Luca",
    tone: "Friendly",
    language: "English",
    seed: {
      positives: "participates well in class",
      focus: "bringing assignments on the due day",
      next: "set a simple reminder routine that works at home"
    }
  },
  {
    id: "attendance",
    label: "Attendance",
    topic: "attendance and punctuality",
    student: "Maya",
    tone: "Concise",
    language: "English",
    seed: {
      positives: "settles quickly once in class",
      focus: "arriving on time",
      next: "share any morning constraints so we can support"
    }
  },
  {
    id: "checkin",
    label: "General check-in",
    topic: "student wellbeing",
    student: "Noah",
    tone: "Supportive",
    language: "English",
    seed: {
      positives: "strong peer relationships",
      focus: "energy levels after lunch",
      next: "quick check-in this week if you have time"
    }
  }
];