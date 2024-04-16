'use client';
import { useEffect, useState } from 'react';
import './home-title.scss';
import clsx from 'clsx';

export const HomeTitle = () => {
  const [highlightStates, setHighlightStates] = useState<any>();

  useEffect(() => {
    const initialStates = {
      blue: { wait: 1000, showing: false },
      orange: { wait: 2000, showing: false },
      green: { wait: 2800, showing: false },
      // blue: { wait: 1000, showing: false },
      // purple: { wait: 2000, showing: false },
      // orange: { wait: 2800, showing: false },
      // green: { wait: 3500, showing: false },
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

  return (
    <>
      <div className="home-title-container">
        {/* <div className="line line1">
          Uniting the <span className={clsx('highlight', { blue: highlightStates?.blue?.showing })}>Church</span>
        </div> */}
        <div className="line line2">
          Let’s saturate every{' '}
          <span className={clsx('highlight', { blue: highlightStates?.blue?.showing })}>neighbourhood in Milton</span>
        </div>
        <div className="line line3">
          with the <span className={clsx('highlight', { orange: highlightStates?.orange?.showing })}>practical</span>{' '}
          love of <span className={clsx('highlight', { green: highlightStates?.green?.showing })}>Jesus.</span>
        </div>
      </div>
      <div className="home-title-container mobile">
        {/* <div className="line">Uniting the</div>
        <div className="line">
          <span className={clsx('highlight', { blue: highlightStates?.blue?.showing })}>Church</span>
        </div> */}
        <div className="line">Let’s saturate every</div>
        <div className="line">
          <span className={clsx('highlight', { blue: highlightStates?.blue?.showing })}>neighbourhood</span>
        </div>
        <div className="line">with the</div>
        <div className="line">
          <span className={clsx('highlight', { orange: highlightStates?.orange?.showing })}>practical love</span>
        </div>
        <div className="line">
          <span className={clsx('highlight', { green: highlightStates?.green?.showing })}>of Jesus.</span>
        </div>
      </div>
    </>
  );
};
