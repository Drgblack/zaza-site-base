export type Starter = {
  id: "behaviour" | "praise" | "homework" | "attendance";
  label: string;
  topic: string;
  seed: { positives?: string; focus?: string; next?: string };
};

export const STARTERS: Starter[] = [
  {
    id: "behaviour",
    label: "Behaviour",
    topic: "classroom behaviour",
    seed: {
      positives: "kind to classmates",
      focus: "staying on task",
      next: "use a 2-step cue to refocus"
    }
  },
  {
    id: "praise",
    label: "Praise",
    topic: "progress praise",
    seed: {
      positives: "great effort in writing",
      focus: "keeping momentum",
      next: "ask what they are most proud of"
    }
  },
  {
    id: "homework",
    label: "Homework",
    topic: "homework follow-up",
    seed: {
      positives: "participates in class",
      focus: "bringing work on the due day",
      next: "set a simple after-dinner reminder"
    }
  },
  {
    id: "attendance",
    label: "Attendance",
    topic: "attendance and punctuality",
    seed: {
      positives: "settles quickly when present",
      focus: "arriving on time",
      next: "share any morning constraints"
    }
  }
];