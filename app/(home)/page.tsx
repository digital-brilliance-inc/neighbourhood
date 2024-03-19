import Image from 'next/image';
import './styles.scss';
import { Section } from '@/components/section/section';
import { SectionTitle } from '@/components/section-title/section-title';
import { SectionText } from '@/components/section-text/section-text';
import { ActivityRing } from '@/components/activity-ring/activity-ring';
import { HomeTitle } from '@/components/home-title/home-title';
import { Footer } from '@/components/footer/footer';
import { auth } from '@/auth';
import { Metric } from '@/components/metric/metric';

export default async function Home() {
  const churches = [
    { name: 'Knox Presbyterian', address: '170 Main St. E.', imageSrc: '/church-knox-presbyterian.jpg' },
    { name: 'Grace Anglican', address: '317 Main St. E.', imageSrc: '/church-grace-anglican.webp' },
    { name: 'Southside @ Main', address: '317 Main St. E.', imageSrc: '/church-southside.jpg' },
    { name: "St. Paul's United", address: '317 Main St. E.', imageSrc: '/church-st-pauls.jpg' },
    { name: 'Red Hill', address: '317 Main St. E.', imageSrc: '/church-red-hill.jpg' },
    {
      name: 'Milton Bible Church',
      address: '121 Chisholm Dr, Milton, ON L9T 4A6',
      imageSrc: '/church-milton-bible.webp',
    },
  ];
  // const session = await auth();
  // console.log('session = %o', session);
  // return <p>Welcome {session?.user?.name}!</p>;

  return (
    <>
      <main className="home-container">
        <div className="carousel-container">
          <Image src="/milton-1.png" alt="Milton" fill={true} className="carousel-item" priority />
          <HomeTitle />
        </div>
        <Section shaded={true}>
          <SectionTitle>What is this about?</SectionTitle>
        </Section>
        <Section>
          <SectionTitle>How are we doing?</SectionTitle>
          <SectionText>
            God moves at the speed of relationship, so we know this is going to take some time and that it’s not going
            to be easy. As we unite together, we want to celebrate the small ways God is bringing us together.
          </SectionText>
          <div className="progress-container">
            <ActivityRing value={2.3} color="orange" label="of neighbourhoods accounted for"></ActivityRing>
            <Metric value={1} color="pink" label="neighbourhood advocates identified"></Metric>
            <ActivityRing value={8} color="blue" label="of churches participating"></ActivityRing>
          </div>
        </Section>
        <Section shaded={true}>
          <SectionTitle>Participating churches</SectionTitle>
          <SectionText>
            Jesus’ last prayer (John 17) was that his followers would join together in unity, and that through that
            unity the world would be introduced to his love. If you’d like your church to join us, let’s us know!
          </SectionText>
          <div className="button-container">
            <button>Join us!</button>
          </div>
          <div className="churches-container">
            {churches.map((c, index) => (
              <div className="church" key={index}>
                <div
                  className="church-image-container"
                  style={{
                    backgroundImage: `url(${c.imageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                  }}
                >
                  {/* <Image className="church-image" src={c.imageSrc} alt={c.name} fill={true} sizes="100%"></Image> */}
                </div>
                <div className="church-name">{c.name}</div>
                <div className="church-address">{c.address}</div>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
