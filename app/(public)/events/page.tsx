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
  const [events, setEvents] = useState<Array<any>>([]);
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

  useEffect(() => {
    fetch('/api/events', { cache: 'no-store' }).then(async (response) => {
      const rawEvents = await response.json();
      const allEvents = eventOccurrences(
        rawEvents,
        moment().subtract(1, 'day').format('YYYY-MM-DD'),
        moment().add(1, 'year').format('YYYY-MM-DD'),
      );
      console.log('allEvents = %o', allEvents);
      setEvents(allEvents);
      setLoading(false);

      if (currentSearchParams.get('eventId')) {
        handleEventSelected(allEvents.find((ev) => ev.id === currentSearchParams.get('eventId')));
      }
    });
  }, []);

  useEffect(() => {
    console.log('useEffect[currentSearchParams]: currentSearchParams = ' + currentSearchParams.toString());
    if (!currentSearchParams.get('eventId')) {
      setEventModalVisible(false);
    }
  }, [currentSearchParams]);

  return (
    <div className="page-events">
      <div className="flex-container">
        <Section title="Upcoming Events">
          <div>
            <h5>What’s happening in the Church in Milton? </h5>

            <p>
              Think of this page as a shared community calendar for the Church in Milton. Every event listed here is
              open to everyone, regardless of what church you attend on Sunday morning. Let&apos;s come together to
              support one another as we reach the city together!
            </p>

            <p>
              Are you running an upcoming event that you’d like others to know about? We’d love to grab a coffee and
              hear about it!{' '}
            </p>
            <Button className="btn-lg mt-4" onClick={() => setModalVisible(true)}>
              Get in Touch
            </Button>
            <div className="mt-5" />
            {loading && (
              <div className="loading-container">
                <Spinner animation="grow" variant="primary" />
                <div className="loading-label">Loading events</div>
              </div>
            )}
            {!loading &&
              events.map((ev, index) => (
                <div key={ev.id}>
                  {index === 0 || moment(ev.startDate).month() != moment(events[index - 1].startDate).month() ? (
                    <div className="mt-5">
                      <SectionSubtitle>{moment(ev.startDate).format('MMMM YYYY')}</SectionSubtitle>
                    </div>
                  ) : null}
                  <div className="pb-3" onClick={() => handleEventSelected(ev)}>
                    <EventItem eventItem={ev}></EventItem>
                  </div>
                </div>
              ))}
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
