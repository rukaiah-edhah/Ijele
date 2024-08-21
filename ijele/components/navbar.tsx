"use client";
import { useState } from 'react';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from 'next/image';

type NavbarProps = {
  currentPage: string,
}

const navlist = ["Home", "Search", "Cart", "Dashboard", "About"]


const Navbar = (props: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // State to track the currently expanded section
  const [expandedSection, setExpandedSection] = useState<boolean>(false);
  // Function to toggle the expansion of a specific section
  const toggleExpansion = (section: boolean) => {
    setExpandedSection(section)
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  // Toggle user menu visibility
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const buildSearchDrpDwn = (currentPage: string) => {
    return (
      <div className="dropdown dropdown-hover" onMouseOver={() => toggleExpansion(true)} onMouseLeave={() => toggleExpansion(false)}>
        <div className="navbarLink">Search</div>
        {expandedSection ?
          <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <div>
              {currentPage === "Flight" ? <div>
                <li><a href='/Flight' className='navbarLink text-ijele_teal border-b-2'>Flight</a></li>
                <li><a href='/Hotel' className='navbarLink'>Hotel</a></li>
              </div>
                : <div>
                  <li><a href='/Flight' className='navbarLink'>Flight</a></li>
                  <li><a href='/Hotel' className='navbarLink text-ijele_teal border-b-2'>Hotel</a></li>
                </div>}
            </div>
          </ul>
          : null
        }
      </div>
    )
  }
  function buildNavLinks(currentPage: string) {
    const links: JSX.Element[] = [];
    for (let i = 0; i < navlist.length; i++) {
      if (navlist[i] === "Search") {
        links.push(buildSearchDrpDwn(currentPage))
      }
      else {
        const path = navlist[i] === "Home" ? "/" : `/${navlist[i]}`;
        const className = currentPage === navlist[i]
          ? 'navbarLink text-ijele_deepGold border-b-2'
          : 'navbarLink';

        links.push(<a href={path} className={className}>{navlist[i]}</a>);
      }
    }

    return links;
  }



  return (
    <>
      <nav className="pb-6">
        <div className="mx-auto max-w-10xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen ? 'true' : 'false'}
                onClick={toggleMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className={isOpen ? 'hidden h-6 w-6' : 'block h-6 w-6'}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg
                  className={isOpen ? 'block h-6 w-6' : 'hidden h-6 w-6'}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* logo container */}
            <div className="relative logo-container flex-shrink-0 flex justify-center items-center h-full w-1/2">
              <Image className="logo object-contained" src="/Images/logo.png" alt="ijele logo" width={100} height={100} />
              <div className='absolute inset-x-0 top-24 flex items-center' >
                <svg viewBox="20 3 300 12" xmlns="http://www.w3.org/2000/svg">
                  <line x1="10" y1="3" x2="700" y2="3" stroke-dasharray="4" stroke='#CF903F' /></svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width='3%'><path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z" /></svg>*/}            
                </div> 
            </div>
            {/* navigation (desktop) */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
              <div className="flex flex-shrink-0 items-center"></div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex justify-evenly space-x-4">
                  {buildNavLinks(props.currentPage)}
                  <LoginLink className="navbarLink">Login </LoginLink>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
              </div>
              <div
                className={`${userMenuOpen ? 'block' : 'hidden'} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Sign out</a>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-blue-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-md`}>
          <a href="/" className='navbarLink'>Home</a>
          <a href="/Flight" className='navbarLink'>Flight</a>
          <a href="/Hotel" className='navbarLink'>Hotel</a>
          <a href="/Cart" className='navbarLink'>Cart</a>
          <a href="/Dashboard" className='navbarLink'>Dashboard</a>
          <a href="/About" className='navbarLink'>About</a>
          <a href="/Login" className='navbarLink'>Login</a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;