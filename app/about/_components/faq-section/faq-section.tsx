'use client';

import { Section } from '@/components/section/section';
import './faq-section.scss';
import { useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { SendMessageModal } from '@/components/modals/send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';
import { MiltonChurchLabel } from '@/components/milton-church/milton-church';

export const FaqSection = () => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="faq-section">
      <Section title="Frequently Asked Questions" shaded={false}>
        <div>
          <h4 className="pt-2 mb-4">Here are some of the questions we get asked regularly.</h4>
          <h5 className="mb-4"> Don’t see your question below? Just let us know so we can add it to the list.</h5>
          <Button className="btn-lg" onClick={() => setContactModalVisible(true)}>
            Ask a Question
          </Button>
          <h5 className="faq-title mb-3 bold mt-5">Signing up for the Newsletter</h5>
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>If I sign up for the newsletter, how often will you email me?</Accordion.Header>
              <Accordion.Body>
                <p>
                  We’re still in the process of figuring out how frequently we’ll have news and stories to share with
                  the Church, but we’ll be very careful not to overload your inbox. At this point we’re expecting to
                  communicate maybe once or twice a month. If the communication does become too frequent, you can always
                  unsubscribe and we’ll respect that (although we hope you’ll share you feedback with us first so we can
                  learn from your experience!)
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Will you share my email address with anyone if I sign up for the newsletter?
              </Accordion.Header>
              <Accordion.Body>
                <p>Nope! We won&apos;t publish or share your email address with anyone.</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <h5 className="faq-title mb-3 mt-5 bold">Neighbourhood Advocates</h5>
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is a Neighbourhood Advocate?</Accordion.Header>
              <Accordion.Body>
                <p>
                  A Neighbourhood Advocate is someone who is passionate about seeing the Kingdom of God spread within a
                  specific geographical area in the city, and is committed to actively partnering with God and others to
                  make it happen.{' '}
                </p>

                <p>
                  It can be hard to feel like we’re going it alone in our neighbourhoods, so each Neighbourhood Advocate
                  is paired with a Advocate Coach to help pray for the neighbourhood and to build connections with other
                  Neighbourhood advocates to share ideas and strategies.
                </p>

                <p>Becoming a Neighbourhood Advocate means that you are committing to:</p>
                <ul className="mb-3">
                  <li>Pray for your neighbourhood regularly</li>
                  <li>Respond to others nearby who reach out to you via this website looking to connect and help</li>
                  <li>Meeting monthly with your Advocate Coach to share updates and stay connected</li>
                  <li>
                    Join the quarterly Advocate Gatherings, where all the Neighbourhood Advocates meet to share stories,
                    encourage, and equip one another in our shared mission
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How do I become a Neighbourhood Advocate</Accordion.Header>
              <Accordion.Body>
                <p>
                  After creating a{' '}
                  <a className="pink" href="/api/auth/signin">
                    free account
                  </a>{' '}
                  (if you haven’t done so already) head over to the{' '}
                  <a className="blue" href="/neighbourhoods">
                    Neighbourhoods page
                  </a>{' '}
                  and follow the instructions to mark the area that you would like to take responsibility for. An
                  Advocate Coach will then be in touch to find a time to chat in order to further explain what it means
                  to be a Neighbourhood Advocate, and to answer any questions you might have. If you’re still interested
                  after having that conversation, we’ll mark your geographical area of responsibility on the map and
                  you’ll be up and running!
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <h5 className="faq-title mb-3 mt-5 bold">Churches &amp; Church Participation</h5>
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Why isn’t my church shown on the map?</Accordion.Header>
              <Accordion.Body>
                <p>
                  We’ve included all the churches that we’re aware of, so if yours (or one you know) is missing, please
                  let us know! We’re happy to represent churches of all shapes and sizes. And if you’d like to go beyond
                  just being listed on the map and become involved as a participating church, let us know that too!
                </p>
                <Button className="mb-4" onClick={() => setContactModalVisible(true)}>
                  Get in Touch
                </Button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How can my church show up on the Churches page?</Accordion.Header>
              <Accordion.Body>
                <p>
                  We work closely with any church who wants to get more involved with <MiltonChurchLabel />. We know
                  church leaders are busy so we’ve intentionally created a process that allows your congregation to plug
                  in without adding extra overhead for you.{' '}
                  <a className="text-pink" onClick={() => setContactModalVisible(true)}>
                    Contact us
                  </a>{' '}
                  to find out more.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Section>
      <SendMessageModal
        modalVisible={contactModalVisible}
        setModalVisible={setContactModalVisible}
        description={`Do you have questions, ideas, or suggestions for Milton.Church? We'd love to hear from you!`}
        successMessage="Your message was sent successfully. We'll be in touch soon!"
        user={session?.user}
        title="Get in Touch"
      />
    </div>
  );
};
