'use client';
import Link from 'next/link';
import './header.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Logo from '@/public/logo.svg';
import Image from 'next/image';
import { User } from 'next-auth';
import { useContext, useState } from 'react';
import { useModal } from '@/app/contexts/modal-context/modal-context';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { MiltonChurchLabel } from '../milton-church/milton-church';

export const Header = ({ user }: { user?: User }) => {
  const pathname = usePathname();
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const toggleExpanded = () => {
    if (window.innerWidth <= 600) {
      setTimeout(() => {
        setExpanded(!isExpanded);
      }, 500);
    }
  };
  return (
    <Navbar expand="lg" expanded={isExpanded} className="bg-body-tertiary header-navbar" sticky="top">
      {/* <div className="header-inner-container"> */}
      <Navbar.Brand className="ps-3 ps-md-4">
        <Link className="logo-container" href="/" onClick={() => toggleExpanded()}>
          <Image className="logo" src={Logo} width={40} alt="Logo" />
          <span className="logo-text">
            <MiltonChurchLabel />
          </span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle
        className="me-3 navbar-toggle"
        aria-controls="basic-navbar-nav"
        onClick={() => toggleExpanded()}
      ></Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="pages-container">
          <Link
            className={clsx('page', { current: pathname === '/about' })}
            href="/about"
            onClick={() => toggleExpanded()}
          >
            <div>About</div>
            <div className="underline" />
          </Link>

          <Link
            className={clsx('page', { current: pathname === '/neighbourhoods' })}
            href="/neighbourhoods"
            onClick={() => toggleExpanded()}
          >
            <div>Neighbourhoods</div>
            <div className="underline" />
          </Link>
          <Link
            className={clsx('page', { current: pathname === '/stories' })}
            href="/stories"
            onClick={() => toggleExpanded()}
          >
            <div>Stories</div>
            <div className="underline" />
          </Link>
          <Link
            className={clsx('page', { current: pathname === '/team' })}
            href="/team"
            onClick={() => toggleExpanded()}
          >
            <div>Team</div>
            <div className="underline" />
          </Link>
        </Nav>
        <Nav className="me-3 me-md-4">
          {user && (
            <div className="login-container">
              <a href="/api/auth/signout" className="blue" onClick={() => toggleExpanded()}>
                Logout
              </a>
              <img src={user.image || '/user.png'} alt={user.name || user.email!} width={50} height={50} />
            </div>
          )}
          {!user && (
            <div className="login-container">
              <a href="/api/auth/signin" className="blue" onClick={() => toggleExpanded()}>
                Sign in
              </a>
              <a href="/api/auth/signin" className="button btn btn-primary btn-sm" onClick={() => toggleExpanded()}>
                Sign up
              </a>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
      {/* </div> */}
    </Navbar>
  );
};
