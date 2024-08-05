"use client";
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
                <div className="pl-3">
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
                <div className="bg-ijele_cream/50 pl-3">
                    <p>Filters</p>
                    <div className="p-2">
                        <h4>Dates</h4>
                        <div className="flex items-center"> {/* stateful code to become dropdown AFTER Title*/}
                            <input type="date" name="startDate" id="departure" className="sidebar-inputfield w-1/3" />
                            ---
                            <input type="date" name="endDate" id="return" className="sidebar-inputfield w-1/3" />
                        </div>

                        <h4>Price</h4>
                        <div className="flex items-center"> {/* needs to be flexed!! */} {/* stateful code to become dropdown */}
                            <div className='flex items-center'>
                                <img src="" alt="$" />
                                <input type="number" name="startDate" id="departure" className="sidebar-inputfield" />
                            </div>
                            -
                            <div className='flex items-center'>
                                <img src="" alt="$" />
                                <input type="number" name="startDate" id="departure" className="sidebar-inputfield" />
                            </div>
                        </div>

                        {/* Time Sort flight Sidbar */}
                        <h4>Time</h4>
                        <div>
                            <div>
                                <label>
                                    <input type="checkbox" name="flightTimes" id="morning" />
                                    Morning
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="flightTimes" id="afternoon" />
                                    Afternoon
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="flightTimes" id="evening" />
                                    Evening
                                </label>
                            </div>
                        </div>

                        {/* Property Types dropdown */}
                        <h4>Property Types</h4>
                        <div>
                            <div>
                                <label>
                                    <input type="checkbox" name="accomType" id="hotelAccom" />
                                    Hotel
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="accomType" id="hostelAccom" />
                                    Resort
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="accomType" id="rentalHomeAccom" />
                                    Cabin
                                </label>
                            </div>
                        </div>

                        {/* Hotel Brand dropdown */}
                        <h4>Brand Names</h4>
                        <div>
                            <div>
                                <label>
                                    <input type="checkbox" name="accomType" id="hotelAccom" />
                                    Comfort Inn
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="accomType" id="hostelAccom" />
                                    Westin
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="accomType" id="rentalHomeAccom" />
                                    La Quinta
                                </label>
                            </div>
                        </div>


                    </div>
                </div> {/* End filters container */}
            </div>  {/* End sidebar container */}

        </>
    )
}