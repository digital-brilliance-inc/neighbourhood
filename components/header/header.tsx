'use client';
import Link from 'next/link';
import './header.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Logo from '@/public/logo.svg';
import Image from 'next/image';
import { User } from 'next-auth';
import { useContext } from 'react';
import { useModal } from '@/app/contexts/modal-context/modal-context';

export const Header = ({ user }: { user?: User }) => {
  const pathname = usePathname();
  const [isVisible, setVisible] = useModal();
  return (
    <div className="header-container">
      <Link href="/">
        <div className="logo-container">
          <Image className="logo" src={Logo} width={40} alt="Logo" />
          <div className="logo-text">Milton.church</div>
        </div>
      </Link>
      <div className="pages-container">
        <Link className={clsx('page', { current: pathname === '/' })} href="/">
          <div>About</div>
          <div className="underline" />
        </Link>
        <Link className={clsx('page', { current: pathname === '/map' })} href="/map">
          <div>Map</div>
          <div className="underline" />
        </Link>
        <Link className={clsx('page', { current: pathname === '/ideas' })} href="/ideas">
          <div>Ideas</div>
          <div className="underline" />
        </Link>
      </div>
      {user && (
        <div className="login-container">
          <Link href="/api/auth/signout" className="button link">
            Logout
          </Link>
          <img src={user.image || '/user.png'} alt={user.name || user.email!} width={50} height={50} />
        </div>
      )}
      {!user && (
        <div className="login-container">
          <Link href="/api/auth/signin" className="button">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};
