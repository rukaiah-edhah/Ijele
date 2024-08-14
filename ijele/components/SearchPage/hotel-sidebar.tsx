"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import FilterSection from "./sidebarTEST";

interface HotelReview{
    rating: number
}

const hotel_data: HotelReview = {
    rating: 4
}

const star_open = <i className="fa-solid fa-star text-ijele_cream text-xl"></i>
const star_filled = <i className="fa-solid fa-star text-ijele_gold text-xl"></i>
const star_half = <i className="fa-light fa-star-half-stroke text-ijele_gold text-xl"></i>

function applyStars(rating: number) {
    const stars: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
        i < rating ? stars.push(star_filled) : stars.push(star_open)
    }

    return stars
}


export const HotelSideBar= ()=>{
    return (
        <>
            <div className=''>
                {/* <p className='mt-2 flex justify-center'>- Accommodation -</p> */}

                {/* search bar section */}
                {/* <div className='flex justify-center items-center mt-1 mb-2 pl-3'>
                    
      Search icon--->    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF6EE"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>                    
      Search bar --->    <input className="sidebar-inputfield w-40 h-8 m-2 pl-2 focus:outline-none" type="text" placeholder='Search City...' />
                    
                    
                    <div className='flex items-center bg-ijele_cream rounded-lg'>
                        <input className='sidebar-inputfield w-12 h-4 rounded-md m-2 p-2 focus:outline-none' type="number" />
                        <i className="fa-solid fa-user fa-sm pr-2 text-[#DDCCBD]" />
                    </div>
                </div> */}

                {/* img of destination htmlFor flights */}
                <div> <img src="" alt="" /></div>

                {/* Description on hover  */}
                <div className="pl-6 mb-6">
                    <div className='flex space-x-4 pt-4 pb-2'>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm-43 59 45-192-149-129 196-17 77-181 77 181 196 17-149 129 45 192-169-102-169 102Zm169-242Z"/></svg> */}
                        {applyStars(hotel_data.rating)}
                        <p className="ml-1">300 reviews</p>
                    </div>
                    <div>
                        <h2>Hotel Name</h2>
                        <q className="mt-2">simple quote about how great the hotel is</q>
                        <div className='flex items-center space-x-4 mt-2'>
                            {/* '@' is a placeholder htmlFor the 'dot' symbols */}
                            <span className="text-ijele_cream"> | </span> <p> $197</p>
                            <i className="fa-solid fa-circle text-[3px] text-ijele_cream"></i>
                             <p>town, USA</p>
                            <i className="fa-solid fa-circle text-[3px] text-ijele_cream"></i>
                             <p>###</p>
                        </div>
                    </div>
                </div>

                {/* filters section */}
                <FilterSection />
            </div>  {/* End sidebar container */}

        </>
    )
}