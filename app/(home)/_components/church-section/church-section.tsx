'use client';

import './church-section.scss';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Section } from '@/components/section/section';
import { SectionText } from '@/components/section-text/section-text';
import { Church } from '@/lib/model/church';
import { SendMessageModal } from '@/components/modals/send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';

export const ChurchSection = () => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const { data: session } = useSession();
  const [selectedChurch, setSelectedChurch] = useState<Church | undefined>();
  const [churches, setChurches] = useState<Array<Church>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/churches?sponsor=true', { cache: 'no-store' }).then(async (response) => {
      const _churches = await response.json();
      setChurches(_churches);
      setLoading(false);
    });
  }, []);

  return (
    <div className="church-section">
      <Section title="Participating churches" shaded={true}>
        <div>
          <SectionText>
            Jesus’ last prayer (John 17) was that his followers would join together in unity, and that through that
            unity the world would be introduced to his love. If you’d like your church to join us, let’s us know!
          </SectionText>
          <Button className="btn-lg mt-4 mb-4" onClick={() => setContactModalVisible(true)}>
            Join us!
          </Button>
          <div className="churches-container">
            {churches.map((c, index) => (
              <div className="church" key={index}>
                <div
                  className="church-image-container"
                  style={{
                    backgroundImage: `url(${c.primaryImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                  }}
                ></div>
                <div className="church-name">{c.name}</div>
                <div className="church-address">{c.address}</div>
              </div>
            ))}
            <div className="church">
              <div className="church-image-container empty">
                <div className="empty-text">Your church here</div>
              </div>

              <Button className="btn-lg mt-2 mb-4" variant="secondary" onClick={() => setContactModalVisible(true)}>
                Join us!
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <SendMessageModal
        modalVisible={contactModalVisible}
        setModalVisible={setContactModalVisible}
        description={`We’re excited to work closely with any church who wants to get more involved with Milton.Church. Tell us about you and your church below and we'll be in touch shortly!`}
        successMessage="Your message was sent successfully. We'll be in touch soon!"
        user={session?.user}
        subject="New Church Request"
        context="New Church Request"
        title="Join Us!"
      />
    </div>
  );
};
