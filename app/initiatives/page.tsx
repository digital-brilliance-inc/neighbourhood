'use client';
import { Section } from '@/components/section/section';
import './styles.scss';
import { SectionText } from '@/components/section-text/section-text';
import { SectionTitle } from '@/components/section-title/section-title';
import { Footer } from '@/components/footer/footer';
import { Button, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { SendMessageModal } from '@/components/modals/send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';
import ArrowRight from '@/public/icon-arrow-forward.svg';
import Image from 'next/image';
import { Initiative, InitiativeStageEnum } from '@/lib/model/initiative';
import { describe } from 'node:test';
import { InitiativeItem } from '@/components/initiative-item/initiative-item';
import { SectionSide } from '@/components/section/section-side/section-side';
import { InitiativeModal } from '@/components/modals/initiative-modal/initiative-modal';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [initiatives, setInitiatives] = useState<Array<Initiative>>([]);
  const [initiativeModalVisible, setInitiativeModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative>();
  const { data: session } = useSession();

  useEffect(() => {
    fetch('/api/initiatives', { cache: 'no-store' }).then(async (response) => {
      const _initiatives = await response.json();
      setInitiatives(_initiatives);
      setLoading(false);
    });
  }, []);

  const handleInitiativeSelected = (initative: Initiative) => {
    setSelectedInitiative(initative);
    setInitiativeModalVisible(true);
  };

  return (
    <div className="page-initiatives">
      <div className="flex-container mb-5">
        <Section title="Initiatives">
          <div>
            <h4>
              God has provided the Church in Milton with all the resources necessary to accomplish the work that He
              wants to do here. Let’s get connected to bring those resources together!
            </h4>

            <p>
              The purpose of this page is to help you connect with other Christians in Milton who are passionate about
              the same ideas as you, and to build critical mass to help those ideas come to life.
            </p>
            <p>
              Select an initiative below to learn more, connect with others passionate about this idea, and find out how
              you can get involved.
            </p>
            <h5 className="mt-5 mb-4 bold">Current Initiatives</h5>

            {loading && (
              <div className="loading-container">
                <Spinner animation="grow" variant="primary" />
                <div className="loading-label">Loading initiatives</div>
              </div>
            )}
            {!loading && (
              <div className="initiatives-container">
                {initiatives.map((initiative) => (
                  <div key={initiative.id} onClick={() => handleInitiativeSelected(initiative)}>
                    <InitiativeItem initiative={initiative}></InitiativeItem>
                  </div>
                ))}
              </div>
            )}
            <h5 className="mt-5 mb-4 bold">Have Your Own Idea?</h5>
            <p>
              If you feel prompted by the Spirit to start something fresh in unity with other Jesus followers in the
              city, just{' '}
              <a className="none" onClick={() => setContactModalVisible(true)}>
                let us know
              </a>{' '}
              about your idea so we can feature it below and help connect you with the abundant Kingdom resources
              available in Milton.
            </p>
            <Button className="btn-lg" onClick={() => setContactModalVisible(true)}>
              Suggest an Initiative
            </Button>
          </div>
        </Section>
        <SectionSide>
          <div className="section-side-inner-container">
            <p>
              {' '}
              An initiative can be in one of the following stages of maturity depending on how far along the concept has
              involved, and how many people have come alongside to help:
            </p>
            <div className="stage-container">
              <span className="stage-tag new" style={{ boxShadow: '0 2px 4px #37393b' }}>
                Freshly proposed
              </span>
              <Image className="arrow" src={ArrowRight} alt="Arrow" />
              <span className="stage-tag gathering-interest" style={{ boxShadow: '0 2px 4px #37393b' }}>
                Gathering interest
              </span>
              <Image className="arrow" src={ArrowRight} alt="Arrow" />
              <span className="stage-tag planning-organizing" style={{ boxShadow: '0 2px 4px #37393b' }}>
                Planning &amp; Organizing
              </span>
              <Image className="arrow" src={ArrowRight} alt="Arrow" />
              <span className="stage-tag running" style={{ boxShadow: '0 2px 4px #37393b' }}>
                Up and Running
              </span>
              <Image className="arrow" src={ArrowRight} alt="Arrow" />
              <span className="stage-tag completed" style={{ boxShadow: '0 2px 4px #37393b' }}>
                Finished
              </span>
            </div>
          </div>
        </SectionSide>
      </div>
      <Footer />
      <InitiativeModal
        modalVisible={initiativeModalVisible}
        setModalVisible={setInitiativeModalVisible}
        initiativeData={selectedInitiative}
      />
      <SendMessageModal
        modalVisible={contactModalVisible}
        setModalVisible={setContactModalVisible}
        description={`Do you have an idea for how to grow the Kingdom of God in Milton that you're looking for others to help bring to life? Explain a little bit about your idea below and we'll be in touch!`}
        successMessage="Your message was sent successfully. We'll be in touch soon. Thank you!"
        context="Initiative Suggestion / Feedback"
        subject="Initiative Suggestion / Feedback"
        user={session?.user}
        title="Suggest an Initiative"
      />
    </div>
  );
}
