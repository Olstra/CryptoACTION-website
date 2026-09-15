import { useState, useMemo } from "react";
import type { Publication, ProcessStepSummary } from "./types";
import { parseBibTeXContent, getProcessStepSummaries } from "./bibParser";

export function useTaxonomy(rawBibText: string) {
  const publications = useMemo<Publication[]>(() => {
    return parseBibTeXContent(rawBibText);
  }, [rawBibText]);

  const steps = useMemo<ProcessStepSummary[]>(() => {
    return getProcessStepSummaries(publications);
  }, [publications]);

  const [selectedStep, setSelectedStep] = useState<string | null>(
    steps.length > 0 ? steps[0].stepKey : null,
  );

  const filteredPublications = useMemo(() => {
    if (!selectedStep) return publications;
    const normalized = selectedStep.toLowerCase().trim();
    return publications.filter((pub) =>
      pub.processSteps.some((s) => s.toLowerCase().includes(normalized)),
    );
  }, [publications, selectedStep]);

  return {
    steps,
    selectedStep,
    setSelectedStep,
    publications: filteredPublications,
    totalCount: publications.length,
  };
}
