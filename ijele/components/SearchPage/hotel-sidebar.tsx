"use client";
import FilterSection from "./sidebar-filter";
import searchIcon from "/Images/searchIcon.svg";
import vercel from "/public/vercel.svg"
import { useState } from 'react';


export default function HotelSideBar() {
    return (
        <>
            <div className=' max-h-screen overflow-auto sidebar-container place-content-center no-scrollbar'>
                {/* <p className='mt-2 flex justify-center'>- Accommodation -</p> */}

                {/* search bar section */}
                <div className='flex justify-center items-center mt-1 mb-2 pl-3'>
                    {/* <img src={searchIcon} alt="icon"/> */}
                    <img src="/Images/search.png" alt="icon" className="max-w-[24px]" />
                    <input className="sidebar-inputfield w-40 h-8 m-2 pl-2" type="text" placeholder='Search City...' />
                    <div className='flex peopleInput items-center'>
                        <input className='sidebar-inputfield w-12 h-8 rounded-md m-2 p-2' type="number" />
                        <img src="" alt="icon" />
                    </div>
                </div>

                {/* img of destination htmlFor flights */}
                <div> <img src="" alt="" /></div>

                {/* Description on hover  */}
                <div className="pl-6 mb-6">
                    <div className='flex items-end'>
                        <span className="ml-1">stars</span>
                        <p className="ml-1">300 reviews</p>
                    </div>
                    <div>
                        <h2>Hotel Name</h2>
                        <q>simple quote about how great the hotel is</q>
                        <div className='flex'>
                            {/* '@' is a placeholder htmlFor the 'dot' symbols */}
                            | <p> $197</p>
                            @ <p>town, USA</p>
                            @ <p>###</p>
                        </div>
                    </div>
                </div>

                {/* filters section */}
                <FilterSection/>
            </div>  {/* End sidebar container */}

        </>
    )
}