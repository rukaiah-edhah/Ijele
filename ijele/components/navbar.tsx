"use client";
import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow mb-4">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Container */}
        <div className="flex-shrink-0">
          <img src="/Images/logo.png" alt="Logo" className="h-16 w-16" />
        </div>

        {/* Navigation Links Container */}
        <div className={`hidden md:flex flex-grow justify-end space-x-6 ${styles.navLinks}`}>
          <a href="/" className={styles.navbarLink}>Home</a>
          <a href="/Flight" className={styles.navbarLink}>Flight</a>
          <a href="/Hotel" className={styles.navbarLink}>Hotel</a>
          <a href="/Payment" className={styles.navbarLink}>Payments</a>
          <a href="/Login" className={styles.navbarLink}>Login</a>
        </div>

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
  );
};

export default Navbar;
