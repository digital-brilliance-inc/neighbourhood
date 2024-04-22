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
import { useRef } from 'react';
import { ChurchSection } from './_components/church-section/church-section';

export default function Home() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const churches = [
    { name: 'Knox Presbyterian', address: '170 Main St. E.', imageSrc: '/church-knox-presbyterian.jpg' },
    { name: 'Grace Anglican', address: '317 Main St. E.', imageSrc: '/church-grace-anglican.webp' },
    { name: 'Southside @ Main', address: '317 Main St. E.', imageSrc: '/church-southside.jpg' },
    { name: "St. Paul's United", address: '317 Main St. E.', imageSrc: '/church-st-pauls.jpg' },
    { name: 'Red Hill', address: '317 Main St. E.', imageSrc: '/church-red-hill.jpg' },
    {
      name: 'Milton Bible Church',
      address: '121 Chisholm Dr.',
      imageSrc: '/church-milton-bible.webp',
    },
  ];

  const navigateToNext = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView();
    }
  };

  return (
    <>
      <main className="home-container">
        <HomeSection navigateToNext={navigateToNext}></HomeSection>
        <div ref={aboutSectionRef}>
          <AboutSection />
        </div>
        <Section title="How are we doing?">
          <div className="pt-4">
            <h5>
              Our goal is for every <strong className="text-blue">neighbourhood in Milton</strong> to be actively loved
              and cared for by a <strong className="text-purple">Neighbourhood Advocate</strong> within the next five
              years and for <strong className="text-pink">100% of churches</strong> in the city to be actively engaged
              in this shared mission.
            </h5>
            <div className="progress-container">
              <ActivityRing value={4.1} color="orange" label="of neighbourhoods accounted for"></ActivityRing>
              <Metric value={3} color="pink" label="neighbourhood advocates identified"></Metric>
              <ActivityRing value={8} color="blue" label="of churches participating"></ActivityRing>
            </div>
          </div>
        </Section>
        <ChurchSection />
      </main>
      <Footer />
    </>
  );
}
