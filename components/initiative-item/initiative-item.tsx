import { ReactNode } from 'react';
import './initiative-item.scss';
import { Initiative, InitiativeStageEnum } from '@/lib/model/initiative';

export const InitiativeItem = ({ initiative }: { initiative: Initiative }) => {
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
  return (
    <div
      className="initiative"
      style={{
        backgroundImage: `url(${initiative.imageUrl})`,
      }}
    >
      <div className="initiative-title-container">
        <div className="initiative-title">{initiative.title}</div>
        <div className={`stage-tag ${stageToTagClass(initiative.stage)}`}>{stageToTagLabel(initiative.stage)}</div>
      </div>
    </div>
  );
};
