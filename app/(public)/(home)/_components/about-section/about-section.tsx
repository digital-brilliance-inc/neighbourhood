'use client';

import './about-section.scss';
import { useModal } from '@/app/contexts/modal-context/modal-context';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Modal } from 'react-bootstrap';
import { AboutLevel } from './about-level/about-level';
import Image from 'next/image';
import picture_neighbours1 from '@/public/images/neighbours-1.png';
import picture_neighbours2 from '@/public/images/neighbours-2.jpg';
import picture_neighbourhood1 from '@/public/images/neighbourhood-1.jpg';
import { Section } from '@/components/section/section';
import { MiltonChurchLabel } from '@/components/milton-church/milton-church';
import { SectionSide } from '@/components/section/section-side/section-side';
import { MailingListModal } from '@/components/modals/mailing-list-modal/mailing-list-modal';
import { useSession } from 'next-auth/react';

export const AboutSection = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="about-section">
      <Section title="What is this about?" shaded={true}>
        <div>
          <h4 className="pt-2 mb-4">
            The Word became flesh and blood, and moved into the neighborhood. - John 1:14a (MSG)
          </h4>
          <h5>
            We want to help spread God’s Kingdom by growing loving relationships within our neighbourhoods. And in the
            process, we want to build a network of Jesus followers across the city who are passionate about doing this
            work together.
          </h5>
          <p>There are three main ways to get involved (depending on how engaged you want to be!):</p>
          <div className="section-bullets">
            <div className="section-bullet-container">
              <AboutLevel num={1} color="purple"></AboutLevel>
              <p>
                Are you a follower of Jesus?{' '}
                <a className="purple bold" onClick={() => setModalVisible(true)}>
                  Sign up for the newsletter
                </a>{' '}
                to be in the loop with what God is doing in our city and learn how you can connect with others.
              </p>
            </div>
            <div className="section-bullet-container">
              <AboutLevel num={2} color="blue"></AboutLevel>
              <p>
                Ready for more? Check out{' '}
                <a className="blue bold" href="/neighbourhoods">
                  our neighbourhoods
                </a>{' '}
                to see if there is a Neighbourhood Advocate near you and get in touch to see how you can help.
              </p>
            </div>
            <div className="section-bullet-container">
              <AboutLevel num={3} color="pink"></AboutLevel>
              <p>
                Do you want to love your neighbourhood? Connect with us to find out how to{' '}
                <a className="pink bold" href={session?.user ? '/neighbourhoods' : '/api/auth/signin'}>
                  become a Neighbourhood Advocate
                </a>{' '}
                yourself to see the Kingdom come in your area.
              </p>
            </div>
          </div>
          <p>
            As helpful as we hope this site will be, we know that technology can’t do the slow, hard – but very
            rewarding – work of building relationships. Are you ready to do your part to bring the love of Jesus to
            Milton?
          </p>
          <Button className="btn btn-lg mt-3" href="/about">
            Learn More
          </Button>
        </div>
        <SectionSide>
          <div className="section-side-inner-container">
            <Image
              className="section-side-picture"
              src={picture_neighbours1}
              alt="Neighbours talking"
              width={300}
            ></Image>
            <Image
              className="section-side-picture"
              src={picture_neighbours2}
              alt="Love your neighbour"
              width={300}
            ></Image>
            <Image
              className="section-side-picture"
              src={picture_neighbourhood1}
              alt="Neighbourhood"
              width={300}
            ></Image>
          </div>
        </SectionSide>
      </Section>
      <MailingListModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </div>
  );
};
