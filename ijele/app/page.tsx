import Navbar from "@/components/navbar";
import SearchNav from "@/components/SearchPage/search-nav";
import React from 'react';
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
                rightImageUrl="/Images/home/hotel1.jpg"
                leftButtonText="Search Flights"
                rightButtonText="Search Hotels"
                leftPage="/Flight"
                rightPage="/Hotel"
            />
        </>
    );
};

export default Home;

