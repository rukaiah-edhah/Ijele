"use client";
import { useState } from 'react';

interface FilterSecProps {
    label: string;
    inputName: string;
}

export default function FilterSection() {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="bg-ijele_cream/50 pl-6 pt-4">
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
                <div className='flex items-center'>
                    <h4 onClick={toggleExpansion} className='pr-2'> Time</h4>
                    <span className='text-xs text-ijele_cream'>{isExpanded ? '▲' : '▼'}</span>
                </div>
                
                <div className={isExpanded ? 'visible' : 'hidden'}>
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
        </div>
    )
}