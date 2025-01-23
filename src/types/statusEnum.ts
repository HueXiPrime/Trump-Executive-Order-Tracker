export enum EOStatus {
  ACTIVE = "Active",
  IN_PROGRESS = "Implementation in progress",
  BLOCKED = "Blocked by lawsuit",
  PARTIALLY_BLOCKED = "Partially blocked",
  RESCINDED = "Rescinded",
  AWAITING_REVIEW = "Awaiting Review",
  UNCLEAR = "Unclear / Hard to implement",
  COMPLETE = "Fully implemented",
}

export type ExecutiveOrder = {
  id: string;
  name: string;
  type: string;
  link: string;
  summary: string;
  notes: string;
  status: EOStatus;
  signedDate: string;
  forecastStall: number;
  forecastImpact: number;
  lawsuits: Lawsuit[];
  lastUpdated: string;
};

interface Lawsuit {
  caseName: string;
  description: string;
}
