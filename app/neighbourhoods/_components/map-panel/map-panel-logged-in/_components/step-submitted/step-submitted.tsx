import { Button } from 'react-bootstrap';
import './step-submitted.scss';
import '../steps.scss';
import { User } from 'next-auth';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import CircleCheck from '@/public/circle-check.svg';
import Image from 'next/image';

export const StepSubmitted = ({ neighbourhood }: { neighbourhood?: Neighbourhood }) => {
  return (
    <div className="map-panel-logged-in-step-submitted">
      <div className="step-submitted-container mb-4 mt-4">
        <Image className="cicle-check mt-1 mb-3" src={CircleCheck} alt="Cicle Check" />
        <p className="mb-2">Your request to be a Neighbourhood Advocate has been received!</p>
      </div>
      <div className="mb-5">
        <p>
          A Neighbourhood Coach will be in touch shortly to further describe the role and to answer any questions you
          may have.
        </p>
      </div>
    </div>
  );
};
