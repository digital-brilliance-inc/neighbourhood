export enum InitiativeStageEnum {
  NEW = 'NEW',
  GATHERING_INTEREST = 'GATHERING_INTEREST',
  PLANNING_ORGANIZING = 'PLANNING_ORGANIZING',
  RUNNING = 'RUNNING',
}

export type InitiativeLeader = {
  name: string;
  title: string;
  imageUrl?: string;
};

export type Initiative = {
  id: string;
  title: string;
  stage: InitiativeStageEnum;
  shortDescription: string;
  description: string;
  imageUrl: string;
  leaders: Array<InitiativeLeader>;
};
