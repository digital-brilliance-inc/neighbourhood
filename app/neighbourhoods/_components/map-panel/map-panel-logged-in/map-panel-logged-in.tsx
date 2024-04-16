'use client';
import { Button } from 'react-bootstrap';
import './map-panel-logged-in.scss';
import { useState } from 'react';
import { User } from 'next-auth';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import { v4 as uuid } from 'uuid';
import { Step1 } from './_components/step-1/step-1';
import { Step2 } from './_components/step-2/step-2';
import { Step3 } from './_components/step-3/step-3';
import { StepSubmitted } from './_components/step-submitted/step-submitted';

export const MapPanelLoggedIn = ({
  user,
  neighbourhood,
  createNeighbourhood,
  setNeighbourhood,
}: {
  user: User;
  neighbourhood?: Neighbourhood;
  createNeighbourhood: () => void;
  setNeighbourhood: (neighbourhood: Neighbourhood) => void;
}) => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="map-panel-logged-in">
      <h4 className="bold mb-3">Ready to be a Neighbourhood Advocate?</h4>
      {activeStep < 4 && (
        <>
          <p className="mb-5">
            You can become a Neighbourhood Advocate in <span className="text-orange bold">three easy steps.</span>
          </p>
          <div className="mb-5">
            <Step1
              activeStep={activeStep}
              user={user}
              neighbourhood={neighbourhood}
              createNeighbourhood={createNeighbourhood}
              uncreateNeighbourhood={createNeighbourhood}
              setNeighbourhood={setNeighbourhood}
              completeStep={() => setActiveStep(2)}
              editStep={() => setActiveStep(1)}
            />
          </div>
          <div className="mb-5">
            <Step2
              activeStep={activeStep}
              user={user}
              neighbourhood={neighbourhood}
              setNeighbourhood={setNeighbourhood}
              completeStep={() => setActiveStep(3)}
              editStep={() => setActiveStep(2)}
            />
          </div>
          <div className="mb-5">
            <Step3
              activeStep={activeStep}
              user={user}
              neighbourhood={neighbourhood}
              setNeighbourhood={setNeighbourhood}
              completeStep={() => setActiveStep(4)}
            />
          </div>
          <p>
            Once your request is submitted, a local Neighbourhood Coach will be in touch shortly to further describe the
            role and to answer any questions you may have.
          </p>
        </>
      )}
      {activeStep === 4 && <StepSubmitted neighbourhood={neighbourhood}></StepSubmitted>}
    </div>
  );
};
