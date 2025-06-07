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
      'Knox Presbyterian Church',
      "St. Paul's United Church",
      'Grace Anglican Church',
      'PORTICO Community Church Milton',
      'Grace Expression House',
      'Freedom Centre',
      'Saint Benedict Parish',
      'Southside @ Main',
      'Holy Rosary Parish',
      'Milton Bible Church',
      'Milton Micro-Church',
      'Redhill',
      'Hillside Church',
      'Crosstowne Church',
      'St. George and St. Abanoub Coptic Orthodox Church',
      'Milton Baptist Church',
      'The Salvation Army Khi Community Church & Family Services',
      'New Life Church',
      'Boston Presbyterian Church',
      'Center of Life Church',
      'The House of David',
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
        <img src="/images/celebrate/summerfest-text.png" />
      </div>
      <div className="flex-container1">
        <div className="top-content-container">
          <h3>Welcome! We’re so glad you’re here.</h3>
          <p style={{ lineHeight: '140%' }}>
            This is a space where you can <span className="text-pink bold">connect with others</span> around meaningful
            conversations, <span className="text-blue bold">explore local churches</span>, and{' '}
            <span className="text-orange bold">discover amazing kids programs</span> happening this summer.
          </p>
          <p>We’re celebrating what God is doing in Milton — and we’d love for you to be a part of it.</p>
        </div>
        <div>
          <div className="button-bar">
            <div
              className={`tab-button pink ${selectedTab === 'pink' && 'selected'}`}
              onClick={() => setSelectedTab('pink')}
            >
              <div>
                Join a new
                <br />
                <span className="bold">Community Conversation</span>
                <br />
                group
              </div>
            </div>
            <div
              className={`tab-button blue ${selectedTab === 'blue' && 'selected'}`}
              onClick={() => setSelectedTab('blue')}
            >
              <div>
                See the participating
                <br />
                <span className="bold">Local Churches</span>
                <br />
                in Milton
              </div>
            </div>
            <div
              className={`tab-button orange ${selectedTab === 'orange' && 'selected'}`}
              onClick={() => setSelectedTab('orange')}
            >
              <div>
                Discover
                <br />
                <span className="bold">Fun Kids Programs</span>
                <br />
                running this summer
              </div>
            </div>
          </div>
          <div className={`gradient-container ${selectedTab}`}>
            <div className="gradient-tail"></div>
          </div>

          <div
            className={`mobile-tab-button pink ${selectedTab === 'pink' && 'selected'}`}
            onClick={() => (selectedTab === 'pink' ? setSelectedTab(null) : setSelectedTab('pink'))}
          >
            <div>
              Join a new <span className="bold">Community Conversation</span> group
            </div>
          </div>
          <div className={`tab-content-container ${selectedTab === 'pink' && 'pink visible'}`}>
            <div className="intro-text">
              <h4 className="bold">Let’s talk about the things that matter, together.</h4>
              <p>
                Below you’ll find a list of topics that people in our community are curious about, wrestling with, or
                simply want to explore more deeply. Pick the ones that interest you and when enough people (between
                8-10) choose the same topic, we’ll launch a new group where you can meet others, share perspectives, and
                discover what God might be saying in the middle of it all.{' '}
              </p>
              <p>
                It’s a fresh start with new faces and real conversations — a simple way to connect, grow, and not go it
                alone.
              </p>
            </div>
            <Accordion alwaysOpen>
              {topics.map((t, index) => (
                <Accordion.Item key={t.id} eventKey={index + ''}>
                  <Accordion.Header>{t.label}</Accordion.Header>
                  <Accordion.Body>
                    <div className="topics-container">
                      {t.items.map((item) => (
                        <div
                          key={item.id}
                          className={`topic-item ${selectedTopicItems.includes(item.id) && 'selected'}`}
                          onClick={() => toggleTopicItemSelection(item)}
                        >
                          <img className="icon" src={item.icon} />
                          <div className="text-container">
                            <div className="title">{item.label}</div>
                            <div className="description">{item.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>

          <div
            className={`mobile-tab-button blue ${selectedTab === 'blue' && 'selected'}`}
            onClick={() => (selectedTab === 'blue' ? setSelectedTab(null) : setSelectedTab('blue'))}
          >
            <div>
              See the participating <span className="bold">Local Churches</span> in Milton
            </div>
          </div>
          <div className={`tab-content-container ${selectedTab === 'blue' && 'blue visible'}`}>
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
          <div
            className={`mobile-tab-button orange ${selectedTab === 'orange' && 'selected'}`}
            onClick={() => (selectedTab === 'orange' ? setSelectedTab(null) : setSelectedTab('orange'))}
          >
            <div>
              Discover <span className="bold">Fun Kids Programs</span> running this summer
            </div>
          </div>
          <div className={`tab-content-container ${selectedTab === 'orange' && 'orange visible'}`}>
            <div className="kids-program-list-container">
              {kidsPrograms.map((kp) => (
                <div
                  className="kids-program"
                  key={kp.id}
                  onClick={() => kp.contactUrl && window.open(kp.contactUrl, '_blank')}
                >
                  <div className="kids-program-inner-container">
                    <div
                      className="kids-program-image-container"
                      style={{
                        backgroundImage: `url(${kp.imgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                      }}
                    ></div>
                    <div className="kids-program-details">
                      <div className={`kids-program-name bold ${kp.contactUrl && 'has-link'}`}>{kp.name}</div>
                      <div className="kids-program-address text-small">{kp.location1}</div>
                      <div className="kids-program-address text-small">{kp.location2}</div>
                      {kp.description && (
                        <div
                          className="kids-program-description text-small"
                          dangerouslySetInnerHTML={{ __html: kp.description }}
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
      <div className={`submit-bar ${selectedTab === 'pink' && selectedTopicItems.length > 0 && 'visible'}`}>
        <Button className="btn btn-inverse" onClick={() => setModalVisible(true)}>
          Register My Interest ({selectedTopicItems.length} topic{selectedTopicItems.length > 1 && 's'})
        </Button>
      </div>
      <Footer />
      <SendMessageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        description={`<div><strong>We’d love to connect you with others who care about the same things.</strong></div>
<div>Share your name and email below so we can reach out when a group forms around one of the topics you’ve selected. No pressure — just an open door to meaningful conversation and new community.</div>`}
        successMessage="Your interest was registered successfully. We'll be in touch soon. Thank you!"
        subject="Discussion Group Interest"
        context="Discussion Group Interest"
        user={session?.user}
        messageDefault={[
          'Please let me know when there is a group forming around any of the following topics:',
          ...selectedTopicItems.map((tid) => '- ' + getItemById(tid)?.label),
        ].join('\n')}
        title="Register My Interest in a Community Group"
      />
    </div>
  );
}
