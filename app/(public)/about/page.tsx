'use client';
import { Section } from '@/components/section/section';
import './styles.scss';
import { MiltonChurchLabel } from '@/components/milton-church/milton-church';
import { Button } from 'react-bootstrap';
import { SectionSide } from '@/components/section/section-side/section-side';
import picture_logo from '@/public/images/logo-large.png';
import picture_neighbours1 from '@/public/images/neighbours-1.png';
import picture_neighbours2 from '@/public/images/neighbours-2.jpg';
import picture_neighbourhood1 from '@/public/images/neighbourhood-1.jpg';
import picture_church from '@/public/images/GatheredAndScatteredChurch.png';
import Image from 'next/image';
import { FaqSection } from './_components/faq-section/faq-section';
import { Footer } from '@/components/footer/footer';
import { useRef, useState } from 'react';
import { MailingListModal } from '@/components/modals/mailing-list-modal/mailing-list-modal';
import { SendMessageModal } from '@/components/modals/send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';

export default function Page() {
  const faqRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const [modalVisible, setModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const title = (
    <div>
      About <MiltonChurchLabel />
    </div>
  );
  const whoIsItForTitle = (
    <div>
      Who is <MiltonChurchLabel /> For?
    </div>
  );
  return (
    <div className="page-about">
      <div className="flex-container">
        <Section title={title}>
          <div>
            <h4>
              Milton.Church is a local platform powered by real people wanting to build connections between Jesus
              followers in Milton and to grow the Kingdom in our city.
            </h4>
            <p>
              Our desire is to see every neighbourhood in Milton be cared for by a{' '}
              <a className="pink" onClick={() => faqRef.current?.scrollIntoView()}>
                Neighbourhood Advocate
              </a>{' '}
              and other local Jesus followers who are praying for their neighbourhood and actively partnering with God
              to build loving relationships that demonstrate God’s Kingdom here in Milton.
            </p>

            <p>
              Beyond Neighbourhood Advocates, we want to make it possible for all Christians in Milton to be in the loop
              with what God in doing in our city. To that end, we are creating a{' '}
              <a className="blue" onClick={() => setModalVisible(true)}>
                newsletter
              </a>{' '}
              that we can use to share stories of God on the move, bring awareness to events organized by local churches
              and individuals, and provide information to help people connect with one another.
            </p>

            <p>
              We are not affiliated with any one church, but rather our desire is to serve all churches while also
              reconnecting with those Jesus followers who have struggled to find a faith community where they belong. We
              are non-political and actively partner with any organization that adheres to the theological tenets of the{' '}
              <a href="https://en.wikipedia.org/wiki/English_versions_of_the_Nicene_Creed">Nicene Creed</a>.
            </p>

            <p>Still have questions? Feel free to get in touch, or check out our Frequently Asked Questions below.</p>
            <Button className="btn-lg mt-4" onClick={() => setContactModalVisible(true)}>
              Get in Touch
            </Button>
          </div>
        </Section>
        <SectionSide>
          <div className="section-side-inner-container">
            <Image className="section-side-picture" src={picture_logo} alt="Milton dot Church" width={200}></Image>
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
      </div>
      <Section title={whoIsItForTitle} shaded={true}>
        <div className="who-for-inner-container">
          <div>
            <h4>Milton.Church is for the Church in Milton.</h4>
            <p>
              When we say “the Church in Milton” (with a capital C), we mean all the people in the city who are actively
              following Jesus.
            </p>

            <p>
              Many members of the Church gather within churches (with a lowercase C) to grow closer to Jesus together.
              Let’s call these wonderful people the Gathered Church. But there are also those who follow Jesus outside
              of the more traditional church structures. We call these wonderful people the Scattered Church.
            </p>

            <p>
              Milton.Church exists to help the Church (both Gathered and Scattered) to be united in our mission to
              spread God’s Kingdom through the active pursuit of loving, flourishing relationships with each other and
              within our neighbourhoods.
            </p>
          </div>

          <div className="section-side-inner-container">
            <Image
              className="section-side-picture"
              src={picture_church}
              alt="The Gathered and Scattered Church"
              width={350}
            ></Image>
          </div>
        </div>
      </Section>
      <div ref={faqRef} />
      <FaqSection></FaqSection>

      <Footer />
      <MailingListModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <SendMessageModal
        modalVisible={contactModalVisible}
        setModalVisible={setContactModalVisible}
        description={`Do you have questions, ideas, or suggestions for Milton.Church? We'd love to hear from you!`}
        successMessage="Your message was sent successfully. We'll be in touch soon!"
        subject="Feedback on Milton.Church"
        context="About: Feedback on Milton.Church"
        user={session?.user}
        title="Get in Touch"
      />
    </div>
  );
}
