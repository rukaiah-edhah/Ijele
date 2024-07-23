"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function SearchNav() {
    return (
      <>
      <nav className="w-full flex items-center justify-start">
        <div className="flex">
            <p className="font-junge">Search |</p>
            <Link href="/Flight"  aria-current="page" className="font-junge rounded-md px-3 py-2 text-sm font-small text-yellow-300 hover:text-yellow">Flights</Link>
            <Link href="/Hotel" className="font-junge rounded-md px-3 py-2 text-sm font-small text-black-300 hover:bg-yellow-700 hover:text-white">Hotels</Link>
            <a href="#" className="font-junge rounded-md px-3 py-2 text-sm font-medium text-black-300 hover:bg-yellow-700 hover:text-white">Excursions</a>
        </div>
      </nav>
      
      </>
    );
}