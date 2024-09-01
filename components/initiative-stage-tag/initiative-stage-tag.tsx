import { ReactNode } from 'react';
import './initiative-stage-tag.scss';
import { Initiative, InitiativeStageEnum } from '@/lib/model/initiative';

export const InitiativeStageTag = ({ initiative }: { initiative: Initiative }) => {
  const stageToTagClass = (stage: string) => {
    switch (stage) {
      case InitiativeStageEnum.NEW:
        return 'new';
      case InitiativeStageEnum.GATHERING_INTEREST:
        return 'gathering-interest';
      case InitiativeStageEnum.PLANNING_ORGANIZING:
        return 'planning-organizing';
      case InitiativeStageEnum.RUNNING:
        return 'running';
    }
  };
  const stageToTagLabel = (stage: string) => {
    switch (stage) {
      case InitiativeStageEnum.NEW:
        return 'Freshly Proposed';
      case InitiativeStageEnum.GATHERING_INTEREST:
        return 'Gathering Interest';
      case InitiativeStageEnum.PLANNING_ORGANIZING:
        return 'Planning & Organizing';
      case InitiativeStageEnum.RUNNING:
        return 'Up and Running';
    }
  };
  return <div className={`stage-tag ${stageToTagClass(initiative.stage)}`}>{stageToTagLabel(initiative.stage)}</div>;
};
