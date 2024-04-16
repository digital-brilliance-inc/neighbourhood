'use client';
import { Ref, RefObject, useEffect, useState } from 'react';
import './home-title-mobile.scss';
import clsx from 'clsx';
import { Button, Carousel } from 'react-bootstrap';
import Image from 'next/image';

export const HomeTitleMobile = ({ navigateToNext }: { navigateToNext: () => void }) => {
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
        <Carousel interval={null} variant="primary">
          {images.map((imgUrl) => (
            <Carousel.Item key={imgUrl}>
              <div className="carousel-image" style={{ backgroundImage: `url('${imgUrl}')` }} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
