"use client";
import { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  // Toggle user menu visibility
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  /*
    // <nav className="bg-white shadow mb-4">
    //   <div className="container mx-auto px-4 py-3 flex items-center justify-between">
    //     {/* Logo Container */


  //     {/* Navigation Links Container */}
  // <div className={`hidden md:flex flex-grow justify-end space-x-6 ${styles.navLinks}`}>

  return (
    <>
      <nav className="">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* logo container */}
            <div className="flex-shrink-0 flex justify-center items-center h-full w-1/2 border-dashed border-b-2 border-blue-900">
              <img className="object-contained h-16 w-16" src="/Images/logo.png" alt="ijele logo" />
            </div>
            {/* navigation (desktop) */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
              <div className="flex flex-shrink-0 items-center"></div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a href="/" className="font-junge rounded-md  bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Home</a>
                  <a href="/Flight" className={styles.navbarLink}>Flight</a>
                  <a href="/Hotel" className={styles.navbarLink}>Hotel</a>
                  <a href="/Payment" className={styles.navbarLink}>Payments</a>
                  <a href="/Login" className={styles.navbarLink}>Login</a></div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button> */}

            <div className="relative ml-3">
              <div>
                {/* <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={userMenuOpen ? 'true' : 'false'}
                  aria-haspopup="true"
                  onClick={toggleUserMenu}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </button> */}
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
          <a href="/" className={styles.navbarLink}>Home</a>
          <a href="/Flight" className={styles.navbarLink}>Flight</a>
          <a href="/Hotel" className={styles.navbarLink}>Hotel</a>
          <a href="/Payment" className={styles.navbarLink}>Payments</a>
          <a href="/Login" className={styles.navbarLink}>Login</a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;