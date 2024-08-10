"use client";

import Link from 'next/link';
import { useState } from 'react';


  type NavbarProps = {
    currentPage: string,
  }

  const searchNavlist = [
    "Flight","Hotel","Excursion"
  ]
  
  
  function buildSearchNavLinks(currenPage: string) {
    const links: JSX.Element[] = []
    for (let i = 0; i < 4; i++) {
      if (currenPage == searchNavlist[i]){
        links.push(<Link href={`/`+ searchNavlist[i]} className='search-nav-links text-ijele_gold'>{searchNavlist[i]}</Link>)
      } 
      else {
       links.push(<Link href={`/`+ searchNavlist[i]} className='search-nav-links'>{searchNavlist[i]}</Link>)
      }
    }
  
    return links
  
  }

export default function SearchNav(props: NavbarProps) {
  
  
    return (
      <>
      <nav className="m-6 w-full flex mt-6 items-center justify-start">
        <div className="flex items-center">
            <p className="font-work_sans">Search |</p>
            {buildSearchNavLinks(props.currentPage)}
            {/* <Link href="/Flight"  aria-current="page" className=" search-nav-links text-yellow-300">Flights</Link>
            <Link href="/Hotel" className="search-nav-links ">Hotels</Link>
            <a href="#" className="search-nav-links">Excursions</a> */}
        </div>
      </nav>
      
      </>
    );
}