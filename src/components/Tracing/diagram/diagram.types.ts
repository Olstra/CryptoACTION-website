export interface SubNode {
  id: string;
  label: string;
}

export interface NodeItem {
  id: string;
  label: string;
  subNodes?: SubNode[];
}

export interface PipelineStage {
  id: string;
  title: string;
  nodes: NodeItem[];
}
