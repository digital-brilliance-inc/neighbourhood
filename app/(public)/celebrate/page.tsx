'use client';
import { Section } from '@/components/section/section';
import './styles.scss';
import { Footer } from '@/components/footer/footer';
import { Button, Spinner } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { SendMessageModal } from '@/components/modals/send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import { SectionSubtitle } from '@/components/section-subtitle/section-subtitle';
import { EventItem } from '@/components/event-item/event-item';
import { datetime, RRule, RRuleSet, rrulestr } from 'rrule';
import { eventOccurrences, toRRule } from '@/lib/utils';
import { EventModel } from '@/lib/model/event-model';
import { EventModal } from '@/components/modals/event-modal/event-modal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { data: session } = useSession();
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventModel>();
  const currentSearchParams = useSearchParams();
  const pathname = usePathname(); // let's get the pathname to make the component reusable - could be used anywhere in the project
  const router = useRouter();

  const handleEventSelected = (eventItem: EventModel) => {
    setSelectedEvent(eventItem);
    setEventModalVisible(true);
    const updatedSearchParams = new URLSearchParams(currentSearchParams.toString());
    updatedSearchParams.set('eventId', eventItem.id);
    router.push(pathname + '?' + updatedSearchParams.toString());
  };

  // useEffect(() => {
  //   console.log('useEffect[currentSearchParams]: currentSearchParams = ' + currentSearchParams.toString());
  //   if (!currentSearchParams.get('eventId')) {
  //     setEventModalVisible(false);
  //   }
  // }, [currentSearchParams]);

  return (
    <div className="page-celebrate">
      <div className="flex-container">
        <Section title="Welcome to the party!">
          <div>
            <p>
              PLACEHOLDER: This will be an introduction paragraph to welcome people to the site and help orient them to
              what they will find here.
            </p>

            <div className="mt-4"></div>
            <SectionSubtitle>Summer programs for kids</SectionSubtitle>
            <p>&lt; Summer Vacation Bible School info will be filled in here! &gt;</p>
            {/* <Button className="btn-lg" onClick={() => setModalVisible(true)}>
              Something missing?
            </Button> */}

            <div className="mt-4"></div>
            <SectionSubtitle>Church gatherings</SectionSubtitle>
            <p>&lt; Church list with Sunday service times will be filled in here! &gt;</p>
            {/* <Button className="btn-lg" onClick={() => setModalVisible(true)}>
              Something missing?
            </Button> */}
            <div className="mt-5" />

            <div className="mt-4"></div>
            <SectionSubtitle>Discussion Groups</SectionSubtitle>
            <h5>Are you looking for a way to meet people and talk about things that are meaningful to you?</h5>
            <p>
              You&apos;ll find some suggested topics below... Is there something there that interests you? If so, let us
              know how to reach you, and we&apos;ll be in touch when there is enough interest in that topic to start a
              group.{' '}
            </p>

            <h5>Truth</h5>
            <ul>
              <li>
                <a href="">Courage</a>
              </li>
              <li>
                <a href="">Faith</a>
              </li>
              <li>
                <a href="">Hope</a>
              </li>
              <li>
                <a href="">Justic</a>
              </li>
              <li>
                <a href="">Love</a>
              </li>
              <li>
                <a href="">Obedience</a>
              </li>
              <li>
                <a href="">Peace</a>
              </li>
            </ul>

            <h5>Challenge</h5>
            <ul>
              <li>
                <a href="">Anger</a>
              </li>
              <li>
                <a href="">Crisis</a>
              </li>
              <li>
                <a href="">Grief</a>
              </li>
              <li>
                <a href="">Hurt</a>
              </li>
              <li>
                <a href="">Money</a>
              </li>
              <li>
                <a href="">Reconciliation</a>
              </li>
              <li>
                <a href="">Self Esteem</a>
              </li>
              <li>
                <a href="">Stress</a>
              </li>
            </ul>

            {/* <h5>Money</h5>
            <ul>
              <li>
                <a href="">Money and God</a>
              </li>
              <li>
                <a href="">Money Advice</a>
              </li>
              <li>
                <a href="">Giving</a>
              </li>
              <li>
                <a href="">Marketplace</a>
              </li>
            </ul> */}

            <h5>People</h5>
            <ul>
              <li>
                <a href="">Marriage</a>
              </li>
              <li>
                <a href="">Men</a>
              </li>
              <li>
                <a href="">Parenting</a>
              </li>
              <li>
                <a href="">Singles</a>
              </li>
              <li>
                <a href="">Women</a>
              </li>
              <li>
                <a href="">Youth</a>
              </li>
            </ul>

            <h5>God</h5>
            <ul>
              <li>
                <a href="">Father</a>
              </li>
              <li>
                <a href="">Son</a>
              </li>
              <li>
                <a href="">Holy Spirit</a>
              </li>
              <li>
                <a href="">3 in 1</a>
              </li>
              <li>
                <a href="">Bible</a>
              </li>
              <li>
                <a href="">Kingdom</a>
              </li>
              <li>
                <a href="">Mission</a>
              </li>
              <li>
                <a href="">Prayer</a>
              </li>
            </ul>

            <h5>Jesus</h5>
            <ul>
              <li>
                <a href="">Miracles</a>
              </li>
              <li>
                <a href="">Parables</a>
              </li>
              <li>
                <a href="">Teachings</a>
              </li>
            </ul>
            {/* <Button className="btn-lg mt-4" onClick={() => setModalVisible(true)}>
              Something missing?
            </Button> */}
            <div className="mt-5" />
          </div>
        </Section>
      </div>
      <Footer />
      <SendMessageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        description={`Thanks for your interest in helping out with Milton.Church. Fill out the form below to let us know how you'd like to get involved and we'll be in touch shortly!`}
        successMessage="Your message was sent successfully. We'll be in touch soon. Thank you!"
        subject="Offer to Help with Milton.Church"
        context="Offer to Help with Milton.Church"
        user={session?.user}
        title="Get Involved"
      />
      <EventModal modalVisible={eventModalVisible} setModalVisible={setEventModalVisible} eventItem={selectedEvent} />
    </div>
  );
}
