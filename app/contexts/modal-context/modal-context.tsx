'use client';

import { ModalWrapper } from '@/components/modal-wrapper/modal-wrapper';
import React from 'react';

const ModalContext = React.createContext<
  [React.ReactNode, React.Dispatch<React.SetStateAction<React.ReactNode>>] | undefined
>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalContent, setVisible] = React.useState<React.ReactNode | undefined>(undefined);
  return (
    <ModalContext.Provider value={[modalContent, setVisible]}>
      {children}
      <ModalWrapper isVisible={!!modalContent}></ModalWrapper>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
