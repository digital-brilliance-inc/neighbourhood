import { Section } from '@/components/section/section';
import './styles.scss';
import { SectionText } from '@/components/section-text/section-text';
import { SectionTitle } from '@/components/section-title/section-title';
import { Footer } from '@/components/footer/footer';
import { Button } from 'react-bootstrap';
import { SectionSide } from '@/components/section/section-side/section-side';
import Image from 'next/image';
import picture_neighbours1 from '@/public/images/neighbours-1.png';
import picture_neighbours2 from '@/public/images/neighbours-2.jpg';
import picture_neighbourhood1 from '@/public/images/neighbourhood-1.jpg';

export default async function Page() {
  return (
    <div className="page-stories">
      <div className="flex-container">
        <Section title="Storytellers Wanted">
          <div>
            <h5>
              Are you a good listener who loves Jesus and also loves talking to people? Are you able to distill
              conversations into written articles or blog posts that are engaging, inspiring, and fun to read?{' '}
            </h5>

            <p>
              We’re looking for a few people to act as Storytellers for the Church in Milton who can help to spread the
              word as the Kingdom grows in our neighbourhoods and churches. As is the case for everything we do at
              Milton.Church, we want to do this in a relationally connecting way.{' '}
            </p>

            <p>If this sounds like a fit for you, please reach out and let us know!</p>
            <Button className="btn-lg mt-4">Get in Touch</Button>
          </div>
        </Section>
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
      </div>
      <Footer />
    </div>
  );
}
