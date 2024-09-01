'use client';
import { Section } from '@/components/section/section';
import './styles.scss';
import { Footer } from '@/components/footer/footer';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  return (
    <div className="page-privacy-policy">
      <div className="flex-container">
        <Section title="Privacy Policy">
          <div>
            <div>
              <div>
                <p className="">This Privacy Policy was last modified on June 3, 2024.</p>
                <p>
                  Milton.Church (<span style={{ fontWeight: 'bold' }}>“we”</span>,{' '}
                  <span style={{ fontWeight: 'bold' }}>“our”</span>, <span style={{ fontWeight: 'bold' }}>“us”</span>)
                  recognizes the importance of your right to privacy and wants you to be familiar with how we collect,
                  use and disclose any personal information that individually identifies you and our commitment to meet
                  our obligations under applicable Canadian privacy laws.
                </p>
                <p>
                  This Privacy Policy (<span style={{ fontWeight: 'bold' }}>“Privacy Policy”</span>) explains how we
                  collect, use, disclose and protect your personal information when you use our website (
                  <span style={{ fontWeight: 'bold' }}>“Website”</span>) and our services (the{' '}
                  <span style={{ fontWeight: 'bold' }}>“Services”</span>
                  ). It also explains how you can contact us if you have questions about how we handle your information.
                  We will only collect, use and disclose your personal information in accordance with this Privacy
                  Policy.
                </p>
                <p>
                  By using our Website and Services and supplying your personal information, you acknowledge that you
                  have read and understood this Privacy Policy, and you agree and consent to the collection, use,
                  disclosure and other processing of your personal information as outlined in this Privacy Policy. If
                  you do not agree to the terms of this Privacy Policy, please do not use our Website or Services or
                  supply your personal information to us.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>1. What Personal Information do we collect?</h4>
                <p>
                  Personal information means any information about an identifiable individual. Anonymous data means data
                  that is not associated with or linked to any individual’s personal information or will not easily
                  permit the identification of individuals (<span style={{ fontWeight: 'bold' }}>“Anonymous Data”</span>
                  ). We do not consider personal information to include Anonymous Data.
                </p>
                <p>
                  We collect your personal information about you when you provide it to us or use our Website or
                  Services. We may also collect information about you from certain third parties in order for us to be
                  able to provide and facilitate the Services to you. In most instances, you will decide what
                  information you provide us. In certain instances, if you choose not to provide us with personal
                  information, you may not be able to fully utilize our Website or Services. The types of personal
                  information that we may collect include, but is not limited to:{' '}
                </p>
                <ul>
                  <li>
                    General contact information such as your name and e-mail address (if you choose to make an account
                    with us)
                  </li>
                  <li>
                    Your profile picture associated with the social login method you have chosen to use for
                    authentication (e.g. Google or Facebook)
                  </li>
                  <li>
                    The boundaries of the neighbourhood you are the advocate for, should you choose to sign up as such
                  </li>
                </ul>
                <p>
                  If you choose to make a Milton.Church account, you will have access to the full version of the
                  Website. Your personal information will not be displayed publicly on the website, but if you submit a
                  form to connect with a Neighbourhood Advocate, your name and email address will be shared with that
                  Neighbourhood Advocate directly. If you choose to become a Neighbourhood Advocate, you will receive
                  emails whenever someone fills out the form to connect with you. That email will contain the name and
                  email address of the person who has filled out the form.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>
                  2. Purposes for Collecting Your Personal Information
                </h4>
                <p>
                  We collect, use and disclose your personal information in order to provide you with our Services. We
                  also collect, use and disclose your personal information to comply with legal and regulatory
                  requirements and as otherwise may be permitted or required by applicable laws. We will only use the
                  personal information that we collect for the purposes for which it was collected. We collect your
                  personal information for the following purposes and in accordance with applicable laws:
                </p>
                <ul>
                  <li>To present our Website and its contents to you;</li>
                  <li>To provide you with our Services;</li>
                  <li>To provide you with information, products, or Services that you request from us;</li>
                  <li>
                    To fulfill the purposes for which you provided the information or that were described when it was
                    collected, or any other purpose for which you provide it;
                  </li>
                  <li>To notify you about changes to our Website or any Services we offer or provide though it;</li>
                  <li>To improve our Website or Services, marketing, or customer relationships and experiences;</li>
                  <li>To verify and confirm your identity;</li>
                  <li>
                    To establish and maintain commercial relations with you, including responding to your questions
                    regarding our Services;
                  </li>
                  <li>To respond to questions that you send by email or through our Website;</li>
                  <li>
                    Subject to applicable law, to notify you about other services and events provided by us, which may
                    be of interest to you;
                  </li>
                  <li>To customize the appearance of the Website displayed to you;</li>
                  <li>To provide and administer your online account or service your requests;</li>
                  <li>To obtain your feedback regarding our Website and Services, including any surveys;</li>
                  <li>To track behavioral information on the Website to serve similar content upon future visits;</li>
                  <li>
                    To support our business functions such as internal business processes, marketing and advertising;
                    and
                  </li>
                  <li>To meet any legal or regulatory requirements.</li>
                </ul>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>3. When Do We Collect Personal Information?</h4>
                <p>
                  We may collect your personal information when you voluntarily provide it to us by using our Website
                  and Services or from third party sources. For example, we may ask you to provide personal information
                  if you:
                </p>
                <ul>
                  <li>Use our Website and our Services;</li>
                  <li>Send us a question or comment by email or phone;</li>
                  <li>Register to receive newsletters, articles and updates about our Services;</li>
                  <li>Submit an application to become a Neighbourhood Advocate; or</li>
                  <li>Submit a form to connect with a Neighbourhood Advocate or Church</li>
                </ul>
                <p>
                  We may receive personal information about you from third party sources. We use this information to:
                  (i) assist with our business operations; (ii) provide and facilitate the Services to you; and (iii)
                  ensure that the Services that we provide you are delivered appropriately. You authorize the collection
                  of your personal information from these sources and, if applicable, you authorize these sources to
                  give us your personal information for the above mentioned purposes.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>4. limiting Collection of Personal Information</h4>
                <p>
                  We limit the collection of personal information to information that is necessary to fulfill the
                  purposes identified in this Privacy Policy and we collect, use and disclose your personal information
                  only in accordance with this Privacy Policy.
                </p>
                <p>
                  Location Information Tool – We may from time to time collect information about your organization from
                  your publically available website in order to update our database with information about your
                  organization’s name, address, location on a map, and to complete a profile on your organization. You
                  may request to receive, amend, or delete such information from our database, at any time, in
                  accordance with Section 12 below.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>
                  5. Consent, Use Disclosure and Retention of Personal Information
                </h4>
                <p>
                  Depending on the sensitivity of the personal information, your consent to our collection, use and
                  disclosure of personal information may be implied, deemed (using an opt-out mechanism) or express.
                  Express consent can be given orally, electronically or in writing. Implied consent is consent that can
                  reasonably be inferred from your action or inaction.
                </p>
                <p>
                  Your personal information will not be used without your consent for purposes other than those for
                  which it was collected or in accordance with applicable laws. From time to time, we may wish to use
                  personal information for new or additional purposes, in which case we will amend the Privacy Policy to
                  include these new or additional purposes and will obtain your consent through your continued use of
                  our Website and Services. If we make any material changes to how we use your personal information, we
                  will notify you by email to the primary email address that you have provided us or that is specified
                  in your account, and we may also post a notice on the Website home page.
                </p>
                <p>
                  We may generate Anonymous Data from personal information collected through the Website and Services by
                  removing information that makes the data personally identifiable to an individual. Such Anonymous Data
                  includes, but is not limited to, information we collect from your use of our Website and Services. We
                  may use this Anonymous Data and aggregated data for any reasonable purpose subject to applicable laws.
                </p>
                <p>
                  We retain your personal information only for as long as we need it to fulfill the purposes for which
                  it was collected and to comply with our legal obligations.
                </p>
                <p>
                  We may also use and disclose your personal information to service providers, data processors and other
                  third parties (<span style={{ fontWeight: 'bold' }}>“Third Parties”</span>) under the following
                  limited circumstances:
                </p>
                <ul>
                  <li>
                    To Third Parties that assist with our operations and facilitating our Website and Services
                    including, without limitation, for customer services, our business operations, monitoring and
                    analyzing Website activity, and operating and maintaining the Website. Such Third Parties may only
                    use your personal information for the purposes described in this Privacy Policy.
                  </li>
                  <li>
                    When necessary to protect (i) our safety, property or other rights; (ii) our representatives,
                    customers and users of the Website and stakeholders; (iii) to conduct investigations of possible
                    breaches of law, including, including to detect and prevent fraud;
                  </li>
                  <li>
                    To identify, contract or bring legal action against someone who may be violating an agreement that
                    they have with us;
                  </li>
                  <li>
                    To investigate breaches of security safeguards or cooperate with government or regulatory
                    authorities pursuant to a legal matter;
                  </li>
                  <li>
                    On the sale of our business where personal information may be provided to third parties in
                    connection with a prospective or completed business transaction, including a sale or merger
                    (including transfers made as part of bankruptcy proceedings or insolvency) involving all or a part
                    of Milton.Church or as a part of a corporate reorganization or stock sale or additional or other
                    changes in corporate control;
                  </li>
                  <li>With your consent; or</li>
                  <li>As otherwise required or permitted by law.</li>
                </ul>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>6. Data Transfers</h4>
                <p>
                  Your personal information may be collected, used, processed, transferred, and retained in multiple
                  countries including Canada and the United States which may be outside the region in which you are
                  situated and may have different privacy or data protection legislation, and may therefore be subject
                  to the laws of these countries. Additionally and as discussed above, we may also engage Third Parties
                  to perform certain services on our behalf and to otherwise provide the Services. These Third Parties
                  may store, process and transfer personal information on servers located outside of Canada in
                  jurisdictions whose data protection laws may differ from those of Canada, such as the United States of
                  America. As a result, personal information may be subject to access requests from governments, courts,
                  or law enforcement in those jurisdictions according to the laws in those jurisdictions. For example,
                  information may be shared in response to valid demands or requests from government authorities, courts
                  and law enforcement officials in those countries. Subject to applicable laws in such other
                  jurisdictions, we will use reasonable efforts to ensure that appropriate protections are in place to
                  require our Third Parties to maintain protections on personal information that are equivalent to those
                  that apply in Canada.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>7. links to Other Apps</h4>
                <p>
                  Our Website may contain links to other Apps that are independently owned and operated by third
                  parties. These other Apps may have their own privacy policies and are not governed by this Privacy
                  Policy. We are not responsible for the privacy practices or the content of any Apps owned and operated
                  by any third parties. Other Apps may collect and treat information collected differently, so we
                  encourage you to carefully read and review the privacy policy of each Website you visit.
                </p>
                <p>
                  Any personal information posted, used or disclosed on a social media page (Facebook, linkedIn,
                  Twitter, Instagram, or the like) or other social networking page or Website is subject to that
                  website’s privacy policy, and is not subject to this Privacy Policy.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>
                  8. Cookies, Web Beacons and Other Similar Technology
                </h4>
                <p>
                  As you interact with this Website and Services, we may use automatic data collection technology and
                  services that record and collect information that identifies your computer, tracks your use of this
                  Website and Services and collects certain other information about you and your surfing habits. These
                  data collection technology and services allows us to store and manage user preferences, enable
                  content, deliver targeted advertising and collect usage data and analytics to ensure the smooth
                  functioning of our Website on your computer or device. These data collection technology may include
                  cookies, web beacons and other similar devices on this Website and Services to enhance functionality
                  and navigation for our visitors. Cookies and other tracking technologies are commonly used by websites
                  and apps through which information is collected about your online activities.
                </p>
                <p>
                  A cookie is a small data file that is placed on your computer or other electronic device so that your
                  device will “remember” information when you visit a Website.
                </p>
                <p>
                  Web beacons and tags are small strings of code that are used in conjunction with a cookie and allow us
                  to record activity on our Website. Internet tags, graphic tags and similar web beacon type functions
                  allow us to count the number of users who have visited a particular web page or to access certain
                  cookies.
                </p>
                <p>
                  We may use web beacons on this Website to count users and to recognize users by accessing our cookies.
                  Being able to access our cookies allows us to personalize this Website and improve your experience at
                  our Website. We may also include web beacons in HTML-formatted e-mail messages that we send to
                  determine which e-mail messages were opened. Information tracked through these mechanisms includes,
                  but is not limited to: (i) your IP address; (ii) the type of web browser and operating system being
                  used; (iii) the pages of the Website a user visits; and (iv) other Apps a user visited before visiting
                  our Website. Web beacons may also be used to deliver interest-based advertising to you.
                </p>
                <p>
                  You can set your internet browser up so that you are notified when cookies are stored, you can decide
                  in each individual case whether you want to accept cookies, or you can refuse to accept any cookies.
                  However, if you do not accept cookies, you may be restricted in how you are able to use our Website.
                  You can delete cookies that are already stored on your hard disk at any time. You will find more
                  details on how to do this in the operating guide for your Internet browser program.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>9. Third Party Analytics</h4>
                <p>
                  Our Website uses third party analytics services such as Google Analytics and web analytics service of
                  Google. Google Analytics uses cookies to analyze how you use our Website. The information generated by
                  the cookie about your use of our Website (including your IP address) is sent to a Google server in the
                  U.S. and stored there. Google will use this information to evaluate your use of our Website, compile
                  reports on Website activity for our Website operators and to provide other Website activity related
                  internet services. Additionally, Google may transfer this information to a third-party when required
                  by law or in the case of a third party processing information on Google&apos;s behalf. In no case will
                  Google use your IP address in connection with any other information held by Google. You can set your
                  internet browser to prohibit the installation of cookies, although we must point out that some
                  features and functions of our Website will then be unusable. By using our Website, you consent to the
                  processing of data about you collected by Google in the manner described and for the above-mentioned
                  purpose. The consent for collection and storage of data can be withdrawn at any time in the future by
                  clicking on the following a:{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout?hl=en">
                    https://tools.google.com/dlpage/gaoptout?hl=en
                  </a>
                  .
                </p>
                <p>
                  We also may use cookies to carry out frequency assessments, page usage assessments and marketing
                  assessments. For these assessments, we use this cookie information without access to your personal
                  information, so it is completely anonymous.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>10. How We Protect Your Information</h4>
                <p>
                  We maintain reasonable technical, physical and organizational security safeguards to protect your
                  personal information against loss, theft, and unauthorized access. Any personal information that you
                  provide to us is exchanged on a secured server. Unfortunately, no data transmission over the Internet
                  can be guaranteed to be 100% secure. As a result, while we are committed to protecting your personal
                  information, we cannot ensure or warrant the security of any information you provide to us.
                </p>
                <p>
                  We take reasonable steps to verify your identity before granting you access to your account on our
                  Website, however, you are solely responsible for maintaining the secrecy of your username, password
                  and any other account information. We also take reasonable steps to ensure that our employees are
                  aware of the importance of maintaining the confidentiality of personal information and that
                  unauthorized persons do not gain access to personal information that we have disposed of or destroyed.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>11. Children Under 13</h4>
                <p>
                  We do not knowingly solicit, collect, or store any personally identifiable information from anyone
                  under the age of 13. Children under the age of 13 are not allowed to create an account or otherwise
                  use the Services. In the event we learn that we collected personal information from a child under the
                  age of 13, we will delete that information as quickly as possible. If parents or guardians believe
                  that we have unintentionally collected their children’s personal information, they may request the
                  deletion of the information by contacting us at{' '}
                  <a href="mailto:hello@milton.church" target="_blank">
                    hello@milton.church
                  </a>
                  .
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>
                  12. Individual Access and Accuracy of Personal Information
                </h4>
                <p>
                  You may request access to your personal information which we may hold by contacting us at the contact
                  information set forth below, and we will respond within the time periods provided for under applicable
                  laws. We will need to verify your identity before providing you with the personal information we hold
                  about you. There is no cost for such access request unless you require copies of records. We may not
                  be able to provide you with access to your personal information if the information cannot be separated
                  from the personal information of others, cannot be disclosed for reasons of security or commercial
                  confidentiality, or is protected by legal privilege. If we cannot provide you with access to your
                  personal information, we will advise you of the reasons access is being denied, unless we are
                  prohibited by law from doing so.
                </p>
                <p>
                  You may request to update and change your personal information at the contact information set forth
                  below. We will endeavor to correct or complete any personal information which you advise us is
                  inaccurate or incomplete. Where appropriate, the amended information will be transmitted to third
                  parties having access to such information.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>13. Electronic Communications</h4>
                <p>
                  When you sign up for a Digital Brilliance account and create a profile, or otherwise sign-up to
                  receive information regarding our developments or related products and services, we collect your
                  contact information such as your name, phone number, mailing addresses and email address. If you opt
                  in to receiving our communications, we will use this information to send you communications based on
                  your expressed interests by mail or email.
                </p>
                <p>
                  You will always have the opportunity to unsubscribe from receiving any of our e-mail or other
                  communications at any time by contacting us at (six four seven)-612-2878 or by email at{' '}
                  <a href="mailto://hello@milton.church" target="_blank">
                    hello@milton.church
                  </a>{' '}
                  and we will ensure that our e-mails include instructions on how to unsubscribe if you no longer wish
                  to receive future e-mails from us. We provide an on-going opportunity to unsubscribe or opt-out of
                  contact by us as described in the footer of all emails, or at{' '}
                  <a href="hello@milton.church" target="_blank">
                    hello@milton.church
                  </a>
                  .
                </p>
                <p>
                  If you decide to unsubscribe, we will only contact you (i) for the purposes allowed under applicable
                  law; (ii) to send you notices of changes to our Privacy Policy; or (iii) to receive Service related
                  messages.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>14. Changes to this Privacy Policy</h4>
                <p>
                  We reserve the right to change or replace this Privacy Policy at our sole discretion at any time.
                  Please check back from time to time to ensure that you are aware of any updates or changes in this
                  Privacy Policy. We will post the most current version on our Website and we will indicate at the top
                  of this page the date this Privacy Policy was last revised. Your continued access or use of this
                  Website after any such changes constitutes your acceptance of the Privacy Policy as revised. If we
                  make any material changes to this Privacy Policy, we will notify you by email to the primary email
                  address that you have provided us or that is specified in your account and we may also post a notice
                  on the Website home page.
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>
                  15. Your Consent to the Terms of this Privacy Policy
                </h4>
                <p>
                  By using our Services and providing us with your personal information, you agree that Digital
                  Brilliance may collect your personal information and you voluntarily consent to the collection, use,
                  disclosure and transfer of your personal information in accordance with this Privacy Policy. If you do
                  not agree with any terms of this Privacy Policy, please do not use our Website or our Services or
                  provide us with any personal information. If you do not understand the nature, purpose and
                  consequences of us collecting, using and disclosing your personal information, please do not use our
                  Website or our Services or provide us with any personal information, and contact us at the contact
                  information set forth below so that we can address your questions or concerns.
                </p>
                <p>
                  Subject to legal and contractual requirements, you may refuse or withdraw your consent to certain of
                  the purposes identified in this Privacy Policy at any time by contacting the email or telephone number
                  below and providing reasonable prior written notice. If you refuse or withdraw your consent, you
                  acknowledge that we may not be able to provide you or continue to provide you with certain services or
                  information that may be of value to you. However, you may not be permitted to withdraw your consent to
                  certain necessary collections, uses and disclosures of your personal information (for example, if
                  Digital Brilliance needs to maintain reasonable business and transaction records).
                </p>
                <h4 style={{ marginTop: 24, fontWeight: 'bold' }}>16. How to Contact Us</h4>
                <p>
                  We welcome your feedback. If you have questions, comments or concerns about this Privacy Policy, or
                  would like to do any of the following:
                </p>
                <ul>
                  <li>
                    See your personal information that you have already sent us so that you can correct, update or
                    delete it from our files;
                  </li>
                  <li>Ask that we not send you electronic communications or otherwise contact you; or</li>
                  <li>Report any violation of this Privacy Policy</li>
                </ul>
                <p>
                  Please contact us via email at{' '}
                  <a href="mailto:hello@milton.church" target="_blank">
                    hello@milton.church
                  </a>{' '}
                  and we will endeavour to get back to you within a reasonable time.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </div>
  );
}
