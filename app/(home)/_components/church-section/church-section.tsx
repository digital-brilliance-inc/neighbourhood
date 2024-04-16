'use client';

import './church-section.scss';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Section } from '@/components/section/section';
import { SectionText } from '@/components/section-text/section-text';
import { Church } from '@/lib/model/church';

export const ChurchSection = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState<Church | undefined>();
  const [churches, setChurches] = useState<Array<Church>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/churches?sponsor=true').then(async (response) => {
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
          <Button className="btn-lg mt-4 mb-4">Join us!</Button>
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
                >
                  {/* <Image className="church-image" src={c.imageSrc} alt={c.name} fill={true} sizes="100%"></Image> */}
                </div>
                <div className="church-name">{c.name}</div>
                <div className="church-address">{c.address}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
