import { ReactNode } from 'react';
import './section-subtitle.scss';

export const SectionSubtitle = ({ children }: { children: ReactNode }) => {
  return (
    <div className="subtitle-container">
      <h4 className="subtitle">{children}</h4>
      <div className="subtitle-underline"></div>
    </div>
  );
};
