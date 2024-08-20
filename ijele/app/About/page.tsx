import About from '@/components/About/About';
import Navbar from '@/components/navbar';
import SearchNav from '@/components/SearchPage/search-nav';
import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <>
        <Navbar currentPage={"About"} />
        <SearchNav currentPage={"About"} />
        <About />
    </>
    );
};

export default AboutPage;