'use client';

import { Section } from '@/components/section/section';
import './styles.scss';
import { SectionText } from '@/components/section-text/section-text';
import { SectionTitle } from '@/components/section-title/section-title';
import { ChurchModal } from '@/components/modals/church-modal/church-modal';
import { useEffect, useState } from 'react';
import { Church } from '@/lib/model/church';
import { Footer } from '@/components/footer/footer';
import { Spinner } from 'react-bootstrap';

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState<Church | undefined>();
  const [churches, setChurches] = useState<Array<Church>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/churches').then(async (response) => {
      const _churches = await response.json();
      setChurches(_churches);
      setLoading(false);
    });
  }, []);

  // const churches = [
  //   { name: 'Knox Presbyterian', address: '170 Main St. E.', imageSrc: '/church-knox-presbyterian.jpg' },
  //   { name: 'Grace Anglican', address: '317 Main St. E.', imageSrc: '/church-grace-anglican.webp' },
  //   { name: 'Southside @ Main', address: '317 Main St. E.', imageSrc: '/church-southside.jpg' },
  //   { name: "St. Paul's United", address: '317 Main St. E.', imageSrc: '/church-st-pauls.jpg' },
  //   { name: 'Red Hill', address: '317 Main St. E.', imageSrc: '/church-red-hill.jpg' },
  //   {
  //     name: 'Milton Bible Church',
  //     address: '121 Chisholm Dr, Milton, ON L9T 4A6',
  //     imageSrc: '/church-milton-bible.webp',
  //   },
  // ];

  const handleChurchSelected = (church: any) => {
    setSelectedChurch(church);
    setModalVisible(true);
  };
  return (
    <div className="page-churches">
      <Section title="The Church in Milton">
        <div>
          <h4 className="mb-4">Welcome to the Church in Milton.</h4>
          <h5 className="mb-5">
            We believe that “the Church in Milton” consists of everyone who is actively following Jesus.
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
            </div>
          )}
        </div>
      </Section>
      <ChurchModal modalVisible={modalVisible} setModalVisible={setModalVisible} churchData={selectedChurch} />
      <Footer />
    </div>
  );
}
