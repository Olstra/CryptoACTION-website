export const ScopeOptions = {
  National: "National",
  Eu: "Eu",
  Global: "Global",
} as const;

export type ScopeType = (typeof ScopeOptions)[keyof typeof ScopeOptions];
