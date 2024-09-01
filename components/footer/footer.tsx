import Link from 'next/link';
import './footer.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Logo from '@/public/logo-white-bottom.svg';
import Image from 'next/image';
import { MiltonChurchLabel } from '../milton-church/milton-church';

export const Footer = ({}) => {
  return (
    <div className="footer-container">
      <div className="logo-container">
        <Image className="logo" src={Logo} alt="Logo" />
      </div>
      <div className="footer-inner-container">
        <div className="footer-row1-container">
          <div className="logo-text">
            <span className="text-blue">Milton</span>.<span className="text-pink">Church</span>
          </div>
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
            <Link className={clsx('page')} href="/initiatives">
              <div>Initiatives</div>
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
            Milton.Church is a collaboration of Jesus followers in Milton, Ontario. For more information{' '}
            <a className="text-white" href="mailto:hello@milton.church">
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
