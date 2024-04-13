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
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { MiltonChurchLabel } from '../milton-church/milton-church';

export const Header = ({ user }: { user?: User }) => {
  const pathname = usePathname();
  const [isVisible, setVisible] = useModal();
  return (
    <Navbar expand="lg" className="bg-body-tertiary header-navbar" sticky="top">
      <div className="header-inner-container">
        <Navbar.Brand>
          <Link className="logo-container" href="/">
            <Image className="logo" src={Logo} width={40} alt="Logo" />
            <span className="logo-text">
              <MiltonChurchLabel />
            </span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto pages-container">
            <Link className={clsx('page', { current: pathname === '/about' })} href="/about">
              <div>About</div>
              <div className="underline" />
            </Link>

            <Link className={clsx('page', { current: pathname === '/neighbourhoods' })} href="/neighbourhoods">
              <div>Neighbourhoods</div>
              <div className="underline" />
            </Link>
            <Link className={clsx('page', { current: pathname === '/stories' })} href="/stories">
              <div>Stories</div>
              <div className="underline" />
            </Link>
            <Link className={clsx('page', { current: pathname === '/churches' })} href="/churches">
              <div>Churches</div>
              <div className="underline" />
            </Link>
          </Nav>
        </Navbar.Collapse>
        {user && (
          <div className="login-container">
            <a href="/api/auth/signout" className="blue">
              Logout
            </a>
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
    </Navbar>
    // <div className="header-container">
    //   <Link className="logo-container" href="/">
    //     <Image className="logo" src={Logo} width={40} alt="Logo" />
    //     <div className="logo-text">Milton.church</div>
    //   </Link>
    //   <div className="pages-container">
    //     <Link className={clsx('page', { current: pathname === '/' })} href="/">
    //       <div>About</div>
    //       <div className="underline" />
    //     </Link>
    //     <Link className={clsx('page', { current: pathname === '/map' })} href="/map">
    //       <div>Map</div>
    //       <div className="underline" />
    //     </Link>
    //     <Link className={clsx('page', { current: pathname === '/ideas' })} href="/ideas">
    //       <div>Ideas</div>
    //       <div className="underline" />
    //     </Link>
    //   </div>
    //   {user && (
    //     <div className="login-container">
    //       <Link href="/api/auth/signout" className="button link">
    //         Logout
    //       </Link>
    //       <img src={user.image || '/user.png'} alt={user.name || user.email!} width={50} height={50} />
    //     </div>
    //   )}
    //   {!user && (
    //     <div className="login-container">
    //       <Link href="/api/auth/signin" className="button">
    //         Sign in
    //       </Link>
    //     </div>
    //   )}
    // </div>
  );
};
