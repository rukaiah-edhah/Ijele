"use client";

import { useState } from 'react';

export default function HotelSideBar() {
    return (
        <>
            <div className='sidebar-container'>
                <p>sidebar</p>
                <div className='flex searchArea'>
                    <div>img</div>
                    <input className="bg-ijele_lightTeal" type="text" placeholder='Search Destination' />
                    <div className='flex peopleInput'>
                        <input type="number" />
                        <img src="" alt="Np" />
                    </div>
                </div>
            </div>

        </>
    )
}