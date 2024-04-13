import { ReactNode } from 'react';
import './section-side.scss';
import clsx from 'clsx';

export const SectionSide = ({ children }: { children: ReactNode }) => {
  return (
    <div className="section-side">
      <div className="section-side-container">{children}</div>
    </div>
  );
};
