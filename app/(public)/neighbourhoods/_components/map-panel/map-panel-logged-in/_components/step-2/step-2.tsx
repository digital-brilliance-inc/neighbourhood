import { Button } from 'react-bootstrap';
import './step-2.scss';
import '../steps.scss';
import { User } from 'next-auth';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import Check from '@/public/check.svg';
import Arrow from '@/public/arrow.svg';
import Image from 'next/image';
import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';

export const Step2 = ({
  activeStep,
  user,
  neighbourhood,
  setNeighbourhood,
  completeStep,
  editStep,
}: {
  activeStep: number;
  user: User;
  neighbourhood?: Neighbourhood;
  setNeighbourhood: (neighbourhood: Neighbourhood) => void;
  completeStep: () => void;
  editStep: () => void;
}) => {
  const handleNameChange = useDebouncedCallback((name: string) => {
    if (neighbourhood) {
      console.log('new name = %o', name);
      setNeighbourhood({ ...neighbourhood, name });
    }
  }, 300);

  return (
    <div className="map-panel-logged-in-step-2">
      <div className={clsx('step-container mb-5', { active: activeStep === 2, complete: activeStep > 2 })}>
        <div className="step-number">
          <Image className="arrow" src={Arrow} alt="Arrow" />2
          <Image className="check" src={Check} alt="Check" />
        </div>
        <div className="step-contents mb-2">
          <p>Provide the name of this neighbourhood.</p>
          {activeStep === 2 && (
            <form>
              <input
                type="text"
                className="mb-3"
                name="neighbourhoodName"
                placeholder="Neighbourhood name"
                defaultValue={neighbourhood?.name}
                onChange={(e) => handleNameChange(e.target.value)}
              ></input>
              <Button className="btn btn-sm" onClick={completeStep} disabled={!neighbourhood?.name}>
                Done
              </Button>
            </form>
          )}
          {activeStep === 3 && (
            <>
              <p>
                <span className="bold">{neighbourhood?.name || '<no name provided>'}</span>
              </p>
              <Button className="btn-sm link edit" onClick={editStep}>
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
