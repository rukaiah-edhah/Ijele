"use client";

import { useState } from 'react';


export default function HotelSideBar() {
    return (
        <>
            <div className=' max-h-screen overflow-auto sidebar-container place-content-center no-scrollbar'>
                <p className='mt-4 flex justify-center'>- Accommodation -</p>
                {/* search bar section */}
                <div className='flex mt-4 justify-center'>
                    <div>img</div>
                    <input className="bg-ijele_lightTeal w-1/2 border-0 " type="text" placeholder='Search City...' />
                    <div className='flex peopleInput '>
                        <input className='w-1/2 rounded-md border-0' type="number" />
                        <img src="" alt="icon" />
                    </div>
                </div>
                {/* img of destination htmlFor flight */}
                <div> <img src="" alt="City Image" /></div>

                {/* Description on hover  */}
                <div>
                    <div className='flex'>stars
                        <p>300 reviews</p>
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
                <div>
                    <h5>Filters</h5>
                    <div>
                        <h4>Dates</h4>
                        <div> {/* stateful code to become dropdown AFTER Title*/}
                            <input type="date" name="startDate" id="departure" />
                            -------
                            <input type="date" name="endDate" id="return" />
                        </div>

                        <h4>Price</h4>
                        <div className=''> {/* needs to be flexed!! */} {/* stateful code to become dropdown */}
                            <div className='flex'>
                                <img src="" alt="$" />
                                <input type="number" name="startDate" id="departure" />
                            </div>
                            -------
                            <div className='flex'>
                                <img src="" alt="$" />
                                <input type="number" name="startDate" id="departure" />
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