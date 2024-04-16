'use client';

import './home-section.scss';
import Image from 'next/image';
import { HomeTitle } from './_components/home-title/home-title';
import { HomeTitleMobile } from './_components/home-title-mobile/home-title-mobile';
import { useRef } from 'react';

export const HomeSection = ({ navigateToNext }: { navigateToNext: () => void }) => {
  return (
    <div className="home-section">
      <div className="d-none d-sm-block home-carousel-container">
        <Image src="/milton-1.png" alt="Milton" fill={true} className="home-carousel-item" priority />
        <HomeTitle />
      </div>
      <div className="d-block d-sm-none carousel-container">
        <HomeTitleMobile navigateToNext={navigateToNext} />
      </div>
    </div>
  );
};
