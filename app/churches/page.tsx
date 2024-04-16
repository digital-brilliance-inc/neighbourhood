'use client';

import { Section } from '@/components/section/section';
import './styles.scss';
import { SectionText } from '@/components/section-text/section-text';
import { SectionTitle } from '@/components/section-title/section-title';
import { ChurchModal } from '@/components/modals/church-modal/church-modal';
import { useEffect, useState } from 'react';
import { Church } from '@/lib/model/church';
import { Footer } from '@/components/footer/footer';
import { Button, Spinner } from 'react-bootstrap';
import { SendMessageModal } from '@/components/modals/send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState<Church | undefined>();
  const [churches, setChurches] = useState<Array<Church>>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    fetch('/api/churches?sponsor=true').then(async (response) => {
      const _churches = await response.json();
      setChurches(_churches);
      setLoading(false);
    });
  }, []);

  const handleChurchSelected = (church: any) => {
    setSelectedChurch(church);
    setModalVisible(true);
  };
  return (
    <div className="page-churches">
      <Section title="The Church in Milton">
        <div>
          <h4 className="mb-4">Working together for the flourishing of our city</h4>
          <h5 className="mb-5">
            The following churches are actively partnering together to achieve our goal: for every{' '}
            <strong className="text-blue">neighbourhood in Milton</strong> to be actively loved and cared for by a{' '}
            <strong className="text-purple">Neighbourhood Advocate</strong> within the next five years and for{' '}
            <strong className="text-pink">100% of churches</strong> in the city to be actively engaged in this shared
            mission.
          </h5>
          {loading && (
            <div className="loading-container">
              <Spinner animation="grow" variant="primary" />
              <div className="loading-label">Loading churches in Milton</div>
            </div>
          )}
          {!loading && (
            <div className="church-card-container">
              {churches.map((c, index) => (
                <div className="church-card mb-2" key={index} onClick={() => handleChurchSelected(c)}>
                  <div
                    className="church-image-container mb-3"
                    style={{
                      backgroundImage: `url(${c.primaryImageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center center',
                    }}
                  >
                    {/* <Image className="church-image" src={c.imageSrc} alt={c.name} fill={true} sizes="100%"></Image> */}
                  </div>
                  <div className="church-name">{c.name}</div>
                  <div className="church-address">{c.address}</div>
                </div>
              ))}
              <div className="church-card mb-2 empty" onClick={() => setContactModalVisible(true)}>
                <div className="church-image-container mb-3">
                  <div className="empty-text p-absolute pb-3">Your church here</div>
                </div>
                <Button className="btn-small btn-secondary">Join us!</Button>
              </div>
            </div>
          )}
        </div>
      </Section>
      <ChurchModal modalVisible={modalVisible} setModalVisible={setModalVisible} churchData={selectedChurch} />
      <SendMessageModal
        modalVisible={contactModalVisible}
        setModalVisible={setContactModalVisible}
        description={`We’re excited to work closely with any church who wants to get more involved with Milton.Church. Tell us about you and your church below and we'll be in touch shortly!`}
        successMessage="Your message was sent successfully. We'll be in touch soon. Thank you!"
        user={session?.user}
        title="Get Involved"
      />
      <Footer />
    </div>
  );
}
