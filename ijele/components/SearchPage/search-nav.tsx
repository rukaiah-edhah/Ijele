"use client";

import Link from 'next/link';

type NavbarProps = {
  currentPage: string,
}

const searchNavlist = [
  "Flight", "Hotel", "Excursion"
]

function buildSearchNavLinks(currentPage: string) {
  const links: JSX.Element[] = [];
  for (let i = 0; i < searchNavlist.length; i++) {
    links.push(
      <Link
        key={searchNavlist[i]} // Adding a unique key prop
        href={`/${searchNavlist[i]}`}
        className={`search-nav-links ${currentPage === searchNavlist[i] ? 'text-ijele_gold' : ''}`}
      >
        {searchNavlist[i]}
      </Link>
    );
  }

  return links;
}

export default function SearchNav(props: NavbarProps) {
  return (
    <>
      <nav className="m-6 pl-6 w-full flex mt-6 items-center justify-start">
        <div className="flex items-center">
          <p className="font-work_sans">Search |</p>
          {buildSearchNavLinks(props.currentPage)}
        </div>
      </nav>
    </>
  );
}
