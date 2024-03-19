import * as React from 'react';
import './modal-wrapper.scss';
import Image from 'next/image';
import { useModal } from '@/app/contexts/modal-context/modal-context';

export const ModalWrapper = ({ isVisible = false }: { isVisible: boolean }) => {
  const [content, setVisible] = useModal();
  if (!isVisible) {
    return null;
  }
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="close-button" onClick={() => setVisible(false)}>
          <Image src="/close.svg" alt="Close" width={30} height={30} />
        </div>
        {content}
      </div>
    </div>
  );
};
