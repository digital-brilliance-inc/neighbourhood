import { ReactNode } from 'react';
import './section-title.scss';

export const SectionTitle = ({ children }: { children: ReactNode }) => {
  return (
    <div className="title-container">
      <h2 className="title">{children}</h2>
      <div className="title-underline"></div>
    </div>
  );
};
