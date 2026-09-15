export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journalOrBook: string;
  doi?: string;
  url?: string;
  processSteps: string[];
  methods: string[];
}

export interface ProcessStepSummary {
  stepKey: string;
  displayName: string;
  count: number;
}
