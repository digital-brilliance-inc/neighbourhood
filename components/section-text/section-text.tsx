import { ReactNode } from 'react';
import './section-text.scss';

export const SectionText = ({ children }: { children: ReactNode }) => {
  return <p className="section-text">{children}</p>;
};
