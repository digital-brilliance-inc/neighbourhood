import { Section } from '@/components/section/section';
import './styles.scss';
import { Footer } from '@/components/footer/footer';

export default function Page() {
  return (
    <div className="page-data-deletion">
      <div className="flex-container">
        <Section title="Instructions for Data Deletion">
          <div>
            <p className="">These data deletion instructions were last modified on June 3, 2024.</p>
            <p>
              To have you account information deleted, simply drop us an email at{' '}
              <a href="mailto:milton.church@digitalbrilliance.ca?subject=Account deletion request">
                milton.church@digitalbrilliance.ca
              </a>{' '}
              and we will be happy to assist you by deleting your personal information.
            </p>
          </div>
        </Section>
      </div>
      <Footer />
    </div>
  );
}
