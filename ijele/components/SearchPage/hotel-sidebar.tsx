"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import FilterSection from "./hotel-filters";

interface HotelReview{
    rating: number
}

const hotel_data: HotelReview = {
    rating: 4
}

function applyStars(rating: number) {
    const stars: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
        i < rating 
            ? stars.push(<i key={i} className="fa-solid fa-star text-ijele_gold text-xl"></i>) 
            : stars.push(<i key={i} className="fa-solid fa-star text-ijele_cream text-xl"></i>);
    }
    return stars;
}

export const HotelSideBar= ()=>{
    return (
        <div className=''>
            <div className="pl-6 mb-6">
                <div className='flex space-x-4 pt-4 pb-2'>
                    {applyStars(hotel_data.rating)}
                    <p className="ml-1">300 reviews</p>
                </div>
                <div>
                    <h2>Hotel Name</h2>
                    <q className="mt-2">simple quote about how great the hotel is</q>
                    <div className='flex items-center space-x-4 mt-2'>
                        <span className="text-ijele_cream"> | </span> <p> $197</p>
                        <i className="fa-solid fa-circle text-[3px] text-ijele_cream"></i>
                        <p>town, USA</p>
                        <i className="fa-solid fa-circle text-[3px] text-ijele_cream"></i>
                        <p>###</p>
                    </div>
                </div>
            </div>

            <FilterSection />
        </div>
    );
}
