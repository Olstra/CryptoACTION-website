import type { PipelineStage } from "./diagram.types";

export const MAIN_PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "monitoring",
    title: "Monitoring",
    nodes: [
      { id: "legal-regulations", label: "Legal Regulations" },
      { id: "risk-indicators", label: "Risk Indicators" },
      {
        id: "monitoring-tools",
        label: "Monitoring Tools",
        subNodes: [
          { id: "monitoring-ai", label: "AI-Based" },
          { id: "monitoring-rule", label: "Rule-Based" },
        ],
      },
    ],
  },
  {
    id: "tracing",
    title: "Tracing",
    nodes: [
      { id: "rule-based", label: "Rule-Based" },
      { id: "clustering", label: "Clustering" },
      { id: "heuristic-based", label: "Heuristic-Based" },
      {
        id: "graph-based",
        label: "Graph-Based",
        subNodes: [{ id: "visualization-tools", label: "Visualization Tools" }],
      },
      {
        id: "nlp",
        label: "NLP",
        subNodes: [
          { id: "named-entity-recognition", label: "Named Entity Recognition" },
          { id: "sentiment-analysis", label: "Sentiment Analysis" },
          { id: "other-nlp", label: "Other NLP techniques" },
        ],
      },
      {
        id: "machine-learning",
        label: "Machine Learning",
        subNodes: [
          { id: "learning-tx", label: "Learning via TX history" },
          {
            id: "learning-offchain",
            label: "Learning via off-chain data sources",
          },
        ],
      },
      { id: "generative-ai", label: "Generative AI" },
    ],
  },
  {
    id: "attribution",
    title: "Attribution",
    nodes: [
      {
        id: "address-identification",
        label: "Address Identification Services",
        subNodes: [
          {
            id: "data-legal",
            label: "Data acquisition through legal intervention",
          },
          { id: "data-open", label: "Data acquisition through open sources" },
        ],
      },
      { id: "entity-databases", label: "Entity Databases" },
    ],
  },
  {
    id: "legal-action",
    title: "Legal Action",
    nodes: [],
  },
  {
    id: "prevention",
    title: "Prevention",
    nodes: [],
  },
];

export const ALL_IN_ONE_STAGE: PipelineStage = {
  id: "all-in-one-tools",
  title: "All-in-one Tools",
  nodes: [],
};
