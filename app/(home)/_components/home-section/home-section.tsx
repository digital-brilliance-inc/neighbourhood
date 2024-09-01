'use client';

import './home-section.scss';
import Image from 'next/image';
import { HomeTitle } from './_components/home-title/home-title';
import { HomeTitleMobile } from './_components/home-title-mobile/home-title-mobile';
import { Button, Carousel } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Neighbourhood } from '@/lib/model/neighbourhood';

export type NeighbourhoodImageItem = {
  neighbourhoodName: string;
  imageUrl: string;
};

export const HomeSection = ({ navigateToNext }: { navigateToNext: () => void }) => {
  const [images, setImages] = useState([
    'https://pprodmvxocpnjrkh.public.blob.vercel-storage.com/milton/milton-map-XcXZnATCBBjOjOSOQWPRvOf1GNeivW.png',
  ]);
  const [neighbourhoods, setNeighbourhoods] = useState<Array<Neighbourhood>>([]);
  const [neighbourhoodImageItems, setNeighbourhoodImageItems] = useState<Array<NeighbourhoodImageItem>>([]);
  let sliderRef = useRef<Slider | null>(null);
  // const images = [
  //   'https://pprodmvxocpnjrkh.public.blob.vercel-storage.com/milton/neighbourhoods/valleyview/Valleyview-1-Skp0ypTcOPxHBEUsfFFhnrIDyI0Ds4.jpg',
  //   'https://pprodmvxocpnjrkh.public.blob.vercel-storage.com/milton/neighbourhoods/valleyview/Valleyview-3-2JzkB4EWHwd4zr9kUWC7gBzRBNPYqk.jpg',
  //   // '/milton-2-mobile.png',
  //   // '/milton-3-mobile.jpg',
  //   // '/milton-4-mobile.png',
  //   // '/milton-5-mobile.jpg',
  // ];

  const shuffle = (array: Array<any>) => {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  useEffect(() => {
    fetch('/api/neighbourhoods', { cache: 'no-store' }).then(async (response) => {
      const neighbourhoodsResponse = await response.json();
      setNeighbourhoods(neighbourhoodsResponse);
      // setImages([...images, ...neighbourhoods.reduce((n: any, cur: Array<string>) => [...cur, ...n.imageUrls], [])]);
      console.log('Retrieved neighbourhoods: %o', neighbourhoodsResponse);
      const niItems = [];
      for (let n of neighbourhoodsResponse) {
        for (let imgUrl of n.imageUrls) {
          niItems.push({ neighbourhoodName: n.name, imageUrl: imgUrl });
        }
      }
      shuffle(niItems);
      console.log('shuffledItems = %o', niItems);
      setNeighbourhoodImageItems(niItems);
      setTimeout(() => {
        sliderRef.current?.slickGoTo(1);
      }, 3000);
    });
  }, []);
  return (
    <div className="home-section">
      <div className="d-none d-sm-block home-carousel-container">
        {/* {!imagesReady && (
          <div className="carousel-image" style={{ backgroundImage: `url('${images[0]}')` }} />

        )} */}
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          fade={true}
          speed={2000}
          autoplay={true}
          autoplaySpeed={5000}
          pauseOnHover={false}
        >
          <div>
            <div
              className="carousel-image"
              style={{
                width: '100%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                backgroundPosition: 'center top',
                backgroundImage: `url('https://pprodmvxocpnjrkh.public.blob.vercel-storage.com/milton/map-satellite-milton-5cHnpCP0E60otyGkVkjb8vdX4gVKdZ.jpg')`,
              }}
            />
          </div>
          {neighbourhoodImageItems.map((nii) => (
            <div key={nii.imageUrl}>
              <div className="carousel-image" style={{ backgroundImage: `url('${nii.imageUrl}')` }}>
                <div className="neighbourhood-label">
                  <div className="neighbourhood-name">{nii.neighbourhoodName}</div>
                  <div className="neighbourhood-sublabel">has a neighbourhood advocate</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        {/* <Carousel interval={2000} variant="primary">
          {images.map((imgUrl) => (
            <Carousel.Item key={imgUrl}>
              <div className="carousel-image" style={{ backgroundImage: `url('${imgUrl}')` }} />
            </Carousel.Item>
          ))}
        </Carousel> */}
        <HomeTitle />
        {/* <Image src="/milton-1.png" alt="Milton" fill={true} className="home-carousel-item" priority />
        <HomeTitle /> */}
      </div>
      <div className="d-block d-sm-none carousel-container">
        <HomeTitleMobile navigateToNext={navigateToNext} neighbourhoodImageItems={neighbourhoodImageItems} />
      </div>
    </div>
  );
};
