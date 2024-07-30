"use client";

import { useState } from 'react';


export default function FlightSideBar() {
    return (
        <>
            <div className='sidebar-container'>
                {/* search bar section */}
                sidebar
                <div className='flex'>
                    <div>img</div>
                    <input className="bg-ijele_lightTeal" type="text" placeholder='Search City...' />
                    <div className='flex peopleInput'>
                        <input type="number" />
                        <img src="" alt="icon" />
                    </div>
                </div>
                {/* img of destination htmlFor flight */}
                <div> <img src="public/Hotel_placeholderImage.png" alt="City Image" /></div>
            </div>
        </>
    )
}