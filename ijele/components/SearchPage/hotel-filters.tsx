"use client";
import { useState } from 'react';

// Define the types for the section states
type ExpandedSection = 'time' | 'property' | 'brand' | null;
const testData = {
    title: "Brans",
    selections: {
        label: ["morning", 'afternoon', 'night'],
        name: 'flightTimes',
        id: ["morning", 'afternoon', 'night'],
    }
}

export default function FilterSection() {
    // State to track the currently expanded section
    const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

    // Function to toggle the expansion of a specific section
    const toggleExpansion = (section: ExpandedSection) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="bg-ijele_cream/50 pl-6 pt-4">
            <p>Filters</p>
            <div className="p-2">
                {/* <h4 className='border-none'>Dates</h4>
                <div className="flex items-center text-sm">
                    <input type="date" name="startDate" id="departure" className="sidebar-inputfield w-1/3" />
                    ---
                    <input type="date" name="endDate" id="return" className="sidebar-inputfield w-1/3" />
                </div> */}

                <h4 className='border-none'>Price</h4>
                <div className="flex justify-center">
                    <div className='relative rounded-md'>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input type="number" name="minPrice" id="minPrice" className="sidebar-inputfield pl-4 text-xs text-center" />
                    </div>
                    <div className='relative rounded-md'>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input type="number" name="maxPrice" id="maxPrice" className="sidebar-inputfield pl-4 text-xs text-center" />
                    </div>
                </div>

                {/* Time Sort Sidebar */}
                <div className='flex items-center'>
                    <h4 
                        onClick={() => toggleExpansion('time')} 
                        className='cursor-pointer'
                    >
                        Time
                        <span className='text-xxs text-ijele_cream'>{expandedSection === 'time' ? '▲' : '▼'}</span>
                    </h4>
                </div>
                {expandedSection === 'time' && (
                    <div className="p-2">
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
                )}

                {/* Property Types Dropdown */}
                <div className='flex items-center'>
                    <h4 
                        onClick={() => toggleExpansion('property')} 
                        className='cursor-pointer'
                    >
                        Property Type
                        <span className='text-xxs text-ijele_cream'>{expandedSection === 'property' ? '▲' : '▼'}</span>
                    </h4>
                </div>
                {expandedSection === 'property' && (
                    <div className="p-2">
                        <div>
                            <label>
                                <input type="checkbox" name="accomType" id="hotelAccom" />
                                Hotel
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="accomType" id="resortAccom" />
                                Resort
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="accomType" id="cabinAccom" />
                                Cabin
                            </label>
                        </div>
                    </div>
                )}

                {/* Brand Names Dropdown */}
                <div className='flex items-center'>
                    <h4 
                        onClick={() => toggleExpansion('brand')} 
                        className='cursor-pointer'
                    >
                        Brand Names
                        <span className='text-xxs text-ijele_cream'>{expandedSection === 'brand' ? '▲' : '▼'}</span>
                    </h4>
                </div>
                {expandedSection === 'brand' && (
                    <div className="p-2">
                        <div>
                            <label>
                                <input type="checkbox" name="brandNames" id="comfortInn" />
                                Comfort Inn
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="brandNames" id="westin" />
                                Westin
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="brandNames" id="laQuinta" />
                                La Quinta
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
