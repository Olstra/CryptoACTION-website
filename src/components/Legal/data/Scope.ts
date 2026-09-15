export const ScopeOptions = {
  National: "National",
  Eu: "EU",
  Global: "Global",
  MicaCasps: "MicaCasps",
  PreMica: "PreMica",
} as const;

export type ScopeType = (typeof ScopeOptions)[keyof typeof ScopeOptions];
