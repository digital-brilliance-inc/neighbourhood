import { ReactNode } from 'react';
import './section.scss';
import clsx from 'clsx';
import { SectionTitle } from '../section-title/section-title';

export const Section = ({
  shaded,
  title,
  children,
}: {
  shaded?: boolean;
  title?: string | ReactNode;
  children: ReactNode;
}) => {
  return (
    <section className={clsx({ shaded })}>
      <div className="section-inner-container">
        {title && <SectionTitle>{title}</SectionTitle>}
        <div className="section-body">{children}</div>
      </div>
      <div className="section-underlay"></div>
    </section>
  );
};
