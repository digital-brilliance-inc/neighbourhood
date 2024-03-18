import { ReactNode } from 'react';
import './section.scss';
import clsx from 'clsx';

export const Section = ({ shaded, children }: { shaded?: boolean; children: ReactNode }) => {
  return (
    <section className={clsx({ shaded })}>
      {children}
      <div className="section-underlay"></div>
    </section>
  );
};
