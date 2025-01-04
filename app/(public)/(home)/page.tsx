'use client';

import Image from 'next/image';
import './styles.scss';
import { Section } from '@/components/section/section';
import { SectionTitle } from '@/components/section-title/section-title';
import { SectionText } from '@/components/section-text/section-text';
import { Footer } from '@/components/footer/footer';
import { auth } from '@/auth';
import { AboutSection } from './_components/about-section/about-section';
import { Button } from 'react-bootstrap';
import { ActivityRing } from './_components/activity-ring/activity-ring';
import { Metric } from './_components/metric/metric';
import { HomeSection } from './_components/home-section/home-section';
import { useEffect, useRef, useState } from 'react';
import { ChurchSection } from './_components/church-section/church-section';
import { Loader } from '@googlemaps/js-api-loader';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import { Church } from '@/lib/model/church';
import { SignUpSection } from './_components/sign-up-section/sign-up-section';

export default function Home() {
  const signUpSectionRef = useRef<HTMLDivElement>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [areaCoveredPct, setAreaCoveredPct] = useState(0);
  const [neighbourhoodAdvocateCount, setNeighbourhoodAdvocateCount] = useState(0);
  const [churchParticipationPct, setChurchParticipationPct] = useState(0);

  useEffect(() => {
    const loader = new Loader({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, version: 'weekly' });
    const initMap = async () => {
      await loader.importLibrary('geometry');
      fetch('/api/neighbourhoods', { cache: 'no-store' }).then(async (response) => {
        const neighbourhoods = await response.json();
        setNeighbourhoodAdvocateCount(neighbourhoods.length);
        console.log('Retrieved neighbourhoods: %o', neighbourhoods);
        let area = 0;
        neighbourhoods.forEach((n: Neighbourhood) => {
          const coords = [];
          for (let v of n.coords) {
            coords.push(new google.maps.LatLng(v));
          }
          console.log('Neighbourhood area: %o', google.maps.geometry.spherical.computeArea(coords));
          area += google.maps.geometry.spherical.computeArea(coords);
        });
        console.log('Milton area: %o', process.env.NEXT_PUBLIC_CITY_RESIDENTIAL_AREA_M2);
        console.log(
          'Total area covered: %o (%o%)',
          area,
          area / Number(process.env.NEXT_PUBLIC_CITY_RESIDENTIAL_AREA_M2),
        );
        setAreaCoveredPct(area / Number(process.env.NEXT_PUBLIC_CITY_RESIDENTIAL_AREA_M2));
        setDataLoading(false);
      });

      fetch('/api/churches', { cache: 'no-store' }).then(async (response) => {
        const churches = await response.json();
        setChurchParticipationPct(churches.filter((c: Church) => c.isSponsor).length / churches.length);
        console.log('Retrieved churches: %o', churches);
      });
    };
    initMap();
  }, []);

  const navigateToNext = () => {
    if (signUpSectionRef.current) {
      signUpSectionRef.current.scrollIntoView();
    }
  };

  return (
    <>
      <main className="home-container">
        <HomeSection navigateToNext={navigateToNext}></HomeSection>
        <div ref={signUpSectionRef}>
          <SignUpSection />
        </div>
        <div>
          <AboutSection />
        </div>
        <Section title="How are we doing?">
          <div className="pt-4">
            <h5>
              Our goal is for every <strong className="text-blue">neighbourhood in Milton</strong> to be actively loved
              and cared for by a <strong className="text-pink">Neighbourhood Advocate</strong> within the next five
              years.
            </h5>
            <div className="progress-container">
              <Metric
                value={neighbourhoodAdvocateCount}
                color="pink"
                label="neighbourhood advocates identified"
              ></Metric>
              <ActivityRing
                value={areaCoveredPct}
                color="orange"
                label="of neighbourhoods accounted for"
              ></ActivityRing>
              <Metric value={10} color="blue" label="churches participating"></Metric>
            </div>
          </div>
        </Section>
        {/* <ChurchSection /> */}
      </main>
      <Footer />
    </>
  );
}
