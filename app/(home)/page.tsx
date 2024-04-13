import Image from 'next/image';
import './styles.scss';
import { Section } from '@/components/section/section';
import { SectionTitle } from '@/components/section-title/section-title';
import { SectionText } from '@/components/section-text/section-text';
import { HomeTitle } from '@/components/home-title/home-title';
import { Footer } from '@/components/footer/footer';
import { auth } from '@/auth';
import { AboutSection } from './_components/about-section/about-section';
import { Button } from 'react-bootstrap';
import { ActivityRing } from './_components/activity-ring/activity-ring';
import { Metric } from './_components/metric/metric';

export default async function Home() {
  const churches = [
    { name: 'Knox Presbyterian', address: '170 Main St. E.', imageSrc: '/church-knox-presbyterian.jpg' },
    { name: 'Grace Anglican', address: '317 Main St. E.', imageSrc: '/church-grace-anglican.webp' },
    { name: 'Southside @ Main', address: '317 Main St. E.', imageSrc: '/church-southside.jpg' },
    { name: "St. Paul's United", address: '317 Main St. E.', imageSrc: '/church-st-pauls.jpg' },
    { name: 'Red Hill', address: '317 Main St. E.', imageSrc: '/church-red-hill.jpg' },
    {
      name: 'Milton Bible Church',
      address: '121 Chisholm Dr.',
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
          <Image src="/milton-1.png" alt="Milton" fill={true} className="home-carousel-item" priority />
          <HomeTitle />
        </div>
        <AboutSection />
        <Section title="How are we doing?">
          <div>
            <h5>
              Our goal is for every <strong className="text-blue">neighbourhood in Milton</strong> to be actively loved
              and cared for by a <strong className="text-purple">Neighbourhood Advocate</strong> within the next five
              years and for <strong className="text-pink">100% of churches</strong> in the city to be actively engaged
              in this shared mission.
            </h5>
            <div className="progress-container">
              <ActivityRing value={3.3} color="orange" label="of neighbourhoods accounted for"></ActivityRing>
              <Metric value={1} color="pink" label="neighbourhood advocates identified"></Metric>
              <ActivityRing value={8} color="blue" label="of churches participating"></ActivityRing>
            </div>
          </div>
        </Section>
        <Section title="Participating churches" shaded={true}>
          <div>
            <SectionText>
              Jesus’ last prayer (John 17) was that his followers would join together in unity, and that through that
              unity the world would be introduced to his love. If you’d like your church to join us, let’s us know!
            </SectionText>
            <Button className="btn-lg mt-4 mb-4">Join us!</Button>
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
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
