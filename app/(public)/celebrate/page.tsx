'use client';
import './styles.scss';
import { Footer } from '@/components/footer/footer';
import { Accordion, Button, Spinner } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { SendMessageModal } from '@/components/modals/send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';
import { Church } from '@/lib/model/church';
import { topics } from './topics';
import { kidsPrograms } from './kids-programs';

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);
  const { data: session } = useSession();
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'pink' | 'blue' | 'orange' | null>(null);
  const [selectedTopicItems, setSelectedTopicItems] = useState<Array<string>>([]);
  const [churches, setChurches] = useState<Array<Church>>([]);
  const [churchesLoading, setChurchesLoading] = useState(true);

  useEffect(() => {
    const order = [
      "St. Paul's United Church",
      'Southside @ Main',
      'Milton Bible Church',
      'Freedom Centre',
      'Redhill',
      'Saint Benedict Parish',
      'The Salvation Army Khi Community Church & Family Services',
      'Milton Micro-Church',
      'New Life Church',
      'Knox Presbyterian Church',
      'Grace Anglican Church',
      'PORTICO Community Church Milton',
      'Grace Expression House',
      'Hillside Church',
      'Holy Rosary Parish',
      'Crosstowne Church',
      'St. George and St. Abanoub Coptic Orthodox Church',
      'Milton Baptist Church',
      'The House of David',
      'Boston Presbyterian Church',
      'Center of Life Church',
      'Graceway Baptist Church',
    ];
    fetch('/api/churches', { cache: 'no-store' }).then(async (response) => {
      const churches = await response.json();
      setChurches(
        churches
          .filter((c: any) => !c.hidden)
          .sort((a: any, b: any) => {
            const indexA = order.indexOf(a.name);
            const indexB = order.indexOf(b.name);
            return indexA < indexB ? -1 : 1;
          }),
      );
      console.log('churches = %o', churches);
      setChurchesLoading(false);
    });
  }, []);

  const toggleTopicItemSelection = (item: any) => {
    if (selectedTopicItems.includes(item.id)) {
      setSelectedTopicItems(selectedTopicItems.filter((element) => element !== item.id));
    } else {
      setSelectedTopicItems([...selectedTopicItems, item.id]);
    }
  };

  const getItemById = (itemId: string) => {
    for (let topic of topics) {
      const item = topic.items.find((item) => item.id === itemId);
      if (item) {
        return item;
      }
    }
    return null;
  };

  return (
    <div className="page-celebrate">
      <div className="banner">
        <div className="banner-text">
          Milton All-Church
          <br />
          Worship and Prayer Night
        </div>
      </div>
      <div className="flex-container1">
        <div className="top-content-container">
          <h3>Welcome! We’re so glad you’re here.</h3>
          <p style={{ lineHeight: '140%' }}>
            Welcome to our all-church prayer night! Everyone’s invited as we gather for worship, prayer, pizza, and
            community. You belong here!
          </p>
          <p>
            This gathering, hosted and organized by multiple local churches, is open to everyone — whether or not you’ve
            ever attended church before. Here you’ll find worship led by a music ensemble from several churches,
            opportunities for personal prayer with faith leaders, and a welcoming time of fellowship (including pizza on
            the lawn). Stay for as long or as little as you’d like, and experience the unity of the body of Christ in
            our community.
          </p>
        </div>
        <div>
          <div className={`tab-content-container blue visible`}>
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ marginBottom: 32 }}>The Church(es) of Milton</h3>
              <h5 style={{ marginBottom: 32 }}>
                Not yet part of a faith community here in the city? Find a local gathering that’s right for you! Need
                some help finding where you fit? <a href="mailto:hello@milton.church">Contact us</a> and we'll get you
                connected!
              </h5>
            </div>
            <div className="church-list-container">
              {churches.map((c) => (
                <div className="church" key={c.id} onClick={() => c.contactUrl && window.open(c.contactUrl, '_blank')}>
                  <div className="church-inner-container">
                    <div
                      className="church-image-container"
                      style={{
                        backgroundImage: `url(${c.primaryImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                      }}
                    ></div>
                    <div className="church-details">
                      <div className={`church-name bold ${c.contactUrl && 'has-link'}`}>{c.name}</div>
                      <div className="church-address text-small">{c.address}</div>
                      {c.shortDescription && (
                        <div
                          className="church-description text-small"
                          dangerouslySetInnerHTML={{ __html: c.shortDescription }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
