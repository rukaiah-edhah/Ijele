"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function SearchNav() {
    return (
      <>
      <nav className="w-full flex items-center justify-start">
        <div className="flex items-center">
            <p className="font-work_sans">Search |</p>
            <Link href="/Flight"  aria-current="page" className=" search-nav-links text-yellow-300">Flights</Link>
            <Link href="/Hotel" className="search-nav-links ">Hotels</Link>
            <a href="#" className="search-nav-links">Excursions</a>
        </div>
      </nav>
      
      </>
    );
}