export type ImportProjectDataType = {
  notionId: number;
  project: string;
  customerIds?: number[];
  commitmentIds?: number[];
  done?: boolean;
  doneOn?: string;
  dueOn?: string;
  onHoldTill?: string;
  createdAt: string;
  myNextActions?: string;
  nextActionsOfOthers?: string;
  context: string;
};
