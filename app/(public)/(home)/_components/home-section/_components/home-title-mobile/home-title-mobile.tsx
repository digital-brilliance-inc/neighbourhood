'use client';
import { Ref, RefObject, useEffect, useState } from 'react';
import './home-title-mobile.scss';
import clsx from 'clsx';
import { Button, Carousel } from 'react-bootstrap';
import Image from 'next/image';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import Slider from 'react-slick';
import { NeighbourhoodImageItem } from '../../home-section';

export const HomeTitleMobile = ({
  neighbourhoodImageItems,
  navigateToNext,
}: {
  neighbourhoodImageItems: Array<NeighbourhoodImageItem>;
  navigateToNext: () => void;
}) => {
  const [highlightStates, setHighlightStates] = useState<any>();

  useEffect(() => {
    const initialStates = {
      blue: { wait: 1000, showing: false },
      orange: { wait: 2000, showing: false },
      green: { wait: 2800, showing: false },
    };
    setHighlightStates(initialStates);

    const timeoutHandles: Array<NodeJS.Timeout> = [];
    for (let key of Object.keys(initialStates)) {
      const wait = (initialStates[key as 'blue' | 'orange' | 'green'] as any).wait as number;
      timeoutHandles.push(
        setTimeout(() => {
          setHighlightStates((prevState: any) => {
            return { ...prevState, [key]: { ...prevState[key], showing: true } };
          });
        }, wait),
      );
    }
    return () => {
      for (let handle of timeoutHandles) {
        clearTimeout(handle);
      }
    };
  }, []);

  const images = [
    '/milton-1-mobile.png',
    '/milton-2-mobile.png',
    '/milton-3-mobile.jpg',
    '/milton-4-mobile.png',
    '/milton-5-mobile.jpg',
  ];

  return (
    <div className="home-container-mobile">
      <div className="home-title-container-mobile">
        <div className="line">Let’s saturate every</div>
        <div className="line">
          <span className={clsx('highlight', { 'text-blue': highlightStates?.blue?.showing })}>neighbourhood</span> in
          Milton
        </div>
        <div className="line">
          with the{' '}
          <span className={clsx('highlight', { 'text-orange': highlightStates?.orange?.showing })}>practical love</span>
        </div>
        <div className="line">
          of <span className={clsx('highlight', { 'text-green': highlightStates?.green?.showing })}>Jesus.</span>
        </div>
        <div className="pt-4 pb-3">
          <Button className="btn btn-primary btn-lg" onClick={navigateToNext}>
            Learn More
          </Button>
        </div>
      </div>
      <div className="carousel-container">
        <Slider fade={true} speed={2000} autoplay={true} autoplaySpeed={5000} pauseOnHover={false}>
          {neighbourhoodImageItems.map((nii) => (
            <div key={nii.imageUrl}>
              <div className="carousel-image-container">
                <div className="carousel-image" style={{ backgroundImage: `url('${nii.imageUrl}')` }} />
                <div className="neighbourhood-label">
                  <div className="neighbourhood-name">{nii.neighbourhoodName}</div>
                  <div className="neighbourhood-sublabel">has a neighbourhood advocate</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
