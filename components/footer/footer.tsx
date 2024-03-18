import Link from 'next/link';
import './footer.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Logo from '@/public/logo.svg';
import Image from 'next/image';

export const Footer = ({}) => {
  return (
    <div className="footer-container">
      <div className="footer-row1-container">
        <div className="logo-container">
          <Image className="logo" src={Logo} width={30} alt="Logo" />
          <div className="logo-text">Milton.church</div>
        </div>
        <div className="pages-container">
          <Link className={clsx('page')} href="/">
            <div>About</div>
          </Link>
          <Link className={clsx('page')} href="/map">
            <div>Map</div>
          </Link>
          <Link className={clsx('page')} href="/ideas">
            <div>Ideas</div>
          </Link>
        </div>
      </div>
      <div className="footer-row2-container">
        <hr />
        <div className="collaboration-text">
          Milton.church is a collaboration by the local churches in Milton, Ontario
        </div>
      </div>
    </div>
  );
};
