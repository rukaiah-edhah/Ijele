import Navbar from "@/components/navbar";
import SearchNav from "@/components/SearchPage/search-nav";
import React from 'react';
import About from "@/components/About/About"
import SlideText from "@/components/SlideText/SlideText";
import SlideImageImage from "@/components/SlideImageImage/SlideImageImage";

const Home: React.FC = () => {

    return (
        <>
            <Navbar currentPage={"Home"} />
            <SearchNav currentPage={"Home"} />
            <SlideText
                textOnLeft={true}
                text="Welcome to Ijele, what would you like to do first?"
            />
            <SlideImageImage
                imageOnLeft={true}
                leftImageUrl="/Images/home/flight3.jpg"
                rightImageUrl="/Images/home/hotel.jpg"
                leftButtonText="Go to Flight"
                rightButtonText="Go to Hotel"
                leftPage="/Flight"
                rightPage="/Hotel"
            />
            <About />
        </>
    );
};

export default Home;

