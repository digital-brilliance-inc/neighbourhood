import { Section } from '@/components/section/section';
import './styles.scss';
import { SectionText } from '@/components/section-text/section-text';
import { SectionTitle } from '@/components/section-title/section-title';

export default async function Page() {
  return (
    <Section>
      <SectionTitle>How can we serve our neighbourhoods?</SectionTitle>
      <SectionText>
        Let&apos;s fill out this section with ideas for how we can serve our neighbourhoods, starting small and growing
        over time as relationships are built.
      </SectionText>
      <div style={{ paddingTop: 16 }}>- Prayer Walks</div>
      <div style={{ paddingTop: 16 }}>- Neighbourhood-wide trash pickup</div>
      <div style={{ paddingTop: 16 }}>- Community pot-luck</div>
    </Section>
  );
}
