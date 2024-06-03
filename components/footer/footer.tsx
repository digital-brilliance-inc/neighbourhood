import Link from 'next/link';
import './footer.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Logo from '@/public/logo-white-bottom.svg';
import Image from 'next/image';

export const Footer = ({}) => {
  return (
    <div className="footer-container">
      <div className="logo-container">
        <Image className="logo" src={Logo} alt="Logo" />
      </div>
      <div className="footer-inner-container">
        <div className="footer-row1-container">
          <div className="logo-text">Milton.church</div>
          <div className="pages-container">
            <Link className={clsx('page')} href="/">
              <div>Home</div>
            </Link>
            <Link className={clsx('page')} href="/about">
              <div>About</div>
            </Link>
            <Link className={clsx('page')} href="/neighbourhoods">
              <div>Neighbourhoods</div>
            </Link>
            <Link className={clsx('page')} href="/stories">
              <div>Stories</div>
            </Link>
            <Link className={clsx('page')} href="/team">
              <div>Team</div>
            </Link>
          </div>
        </div>
        <hr />
        <div className="footer-row2-container">
          <div className="collaboration-text">
            Milton.church is a collaboration by the Churches in Milton, Ontario. For more information{' '}
            <a className="text-white" href="mailto:contact@digitalbrilliance.ca">
              contact us
            </a>
            .
          </div>
          <div className="collaboration-text" style={{ display: 'flex', gap: 16 }}>
            <Link className="text-white" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="text-white" href="/data-deletion">
              Data Deletion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
