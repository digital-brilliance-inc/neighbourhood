import { Button } from 'react-bootstrap';
import './step-1.scss';
import '../steps.scss';
import { User } from 'next-auth';
import Check from '@/public/check.svg';
import Arrow from '@/public/arrow.svg';
import Image from 'next/image';
import clsx from 'clsx';
import { Neighbourhood, NeighbourhoodStatusEnum } from '@/lib/model/neighbourhood';

export const Step1 = ({
  activeStep,
  neighbourhood,
  user,
  createNeighbourhood,
  uncreateNeighbourhood,
  setNeighbourhood,
  completeStep,
  editStep,
}: {
  activeStep: number;
  neighbourhood?: Neighbourhood;
  user: User;
  createNeighbourhood: () => void;
  uncreateNeighbourhood: () => void;
  setNeighbourhood: (neighbourhood: Neighbourhood) => void;
  completeStep: () => void;
  editStep: () => void;
}) => {
  const handleCompleteStep = () => {
    if (neighbourhood) {
      setNeighbourhood({ ...neighbourhood, status: NeighbourhoodStatusEnum.NEW });
    }
    completeStep();
  };

  const handleEditStep = () => {
    if (neighbourhood) {
      setNeighbourhood({ ...neighbourhood, status: NeighbourhoodStatusEnum.EDITABLE });
    }
    editStep();
  };

  return (
    <div className="map-panel-logged-in-step-1">
      <div className={clsx('step-container mb-5', { active: activeStep === 1, complete: activeStep > 1 })}>
        <div className="step-number">
          <Image className="arrow" src={Arrow} alt="Arrow" />1
          <Image className="check" src={Check} alt="Check" />
        </div>
        {activeStep === 1 && (
          <>
            {!neighbourhood && (
              <div className="step-contents mb-2">
                <p>Click the button below to start marking your neighbourhood on the map. </p>
                <Button className="btn-sm" onClick={createNeighbourhood}>
                  Draw Area on Map
                </Button>
              </div>
            )}
            {neighbourhood && (
              <div className="step-contents mb-2">
                <p>
                  Adjust and move the shape to represent the area you want to be responsible flor. When you’re done,
                  click Done.
                </p>
                <div className="d-flex">
                  <Button className="btn-sm link" onClick={uncreateNeighbourhood}>
                    Cancel
                  </Button>
                  <Button className="btn-sm" onClick={handleCompleteStep}>
                    Done
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
        {activeStep > 1 && (
          <div className="step-contents mb-2">
            <p>You’ve finished identifying your neighbourhood region!</p>
            <Button className="btn-sm link edit" onClick={handleEditStep}>
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
