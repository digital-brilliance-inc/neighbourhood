'use client';

import './sign-up-section.scss';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Section } from '@/components/section/section';
import { SectionText } from '@/components/section-text/section-text';
import { SendMessageModal } from '@/components/modals/send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';
import { MiltonChurchLabel } from '@/components/milton-church/milton-church';
import { MailingListModal } from '@/components/modals/mailing-list-modal/mailing-list-modal';

export const SignUpSection = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="sign-up-section">
      <Section title="" shaded={false}>
        <div className="sign-up-content-container">
          <SectionText>
            <div>
              <h4 className="welcome-to-label">Welcome to</h4>
              <h2 className="milton-church-label">
                <MiltonChurchLabel></MiltonChurchLabel>
              </h2>
              <h4>
                We want to bring the followers of Jesus together in Milton and share what God is doing inside and
                outside the churches in our city.
              </h4>
            </div>
          </SectionText>
          <Button className="btn-lg mt-4 mb-4" onClick={() => setModalVisible(true)}>
            Join the Mailing List
          </Button>
        </div>
      </Section>
      <MailingListModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </div>
  );
};
