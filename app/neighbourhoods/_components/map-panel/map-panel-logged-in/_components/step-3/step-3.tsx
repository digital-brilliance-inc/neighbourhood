import { Button } from 'react-bootstrap';
import './step-3.scss';
import '../steps.scss';
import { User } from 'next-auth';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import Check from '@/public/check.svg';
import Arrow from '@/public/arrow.svg';
import Image from 'next/image';
import clsx from 'clsx';
import { submitAdvocateRequest } from '@/lib/actions';

export const Step3 = ({
  activeStep,
  user,
  neighbourhood,
  setNeighbourhood,
  completeStep,
}: {
  activeStep: number;
  user: User;
  neighbourhood?: Neighbourhood;
  setNeighbourhood: (neighbourhood: Neighbourhood) => void;
  completeStep: () => void;
}) => {
  const handleCompleteStep = async () => {
    // Save proposed neighbourhood to server
    if (neighbourhood) {
      const n = await submitAdvocateRequest(user, neighbourhood);
      setNeighbourhood(n);
      completeStep();
    }
  };

  return (
    <div className="map-panel-logged-in-step-3">
      <div className={clsx('step-container mb-5', { active: activeStep === 3, complete: activeStep > 3 })}>
        <div className="step-number">
          <Image className="arrow" src={Arrow} alt="Arrow" />3
          <Image className="check" src={Check} alt="Check" />
        </div>
        <div className="step-contents mb-2">
          <p>Submit your request to become a Neighbourhood Advocate</p>
          {activeStep === 3 && (
            <Button className="btn-sm" onClick={handleCompleteStep}>
              Submit Request
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
