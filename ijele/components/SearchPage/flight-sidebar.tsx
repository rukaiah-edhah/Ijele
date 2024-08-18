"use client";
import { useState } from 'react';

// Define the types for the section states
type ExpandedSection = 'time' | 'aircraft' | 'airline' | null;
const testData = {
    title: "Brans",
    selections: {
        label: ["morning", 'afternoon', 'night'],
        name: 'flightTimes',
        id: ["morning", 'afternoon', 'night'],
    }
}

const buildSelections = (name: string, id: string, choice: string) => {
    return (
        <div>
            <label>
                <input type="checkbox" name={name} id={id} />
                {choice}
            </label>
        </div>
    )
}

const airlinNames = ["American", "Delta", "United", "Southwest", "Frontier", "Spirit", "Alaskan"]
const airbusTypes = ["Boeing 737", "Airbus 12", "Boeing 580"]

export default function FlightFilterSection() {
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
                        onClick={() => toggleExpansion('aircraft')}
                        className='cursor-pointer'
                    >
                        Aircraft
                        <span className='text-xxs text-ijele_cream'>{expandedSection === 'aircraft' ? '▲' : '▼'}</span>
                    </h4>
                </div>
                {expandedSection === 'aircraft' && (
                    <div className="p-2">
                        {airbusTypes.map((type) => buildSelections("craftType", "flightCraft", type))}
                    </div>
                )}

                {/* Brand Names Dropdown */}
                <div className='flex items-center'>
                    <h4
                        onClick={() => toggleExpansion('airline')}
                        className='cursor-pointer'
                    >
                        Airline
                        <span className='text-xxs text-ijele_cream'>{expandedSection === 'airline' ? '▲' : '▼'}</span>
                    </h4>
                </div>
                {expandedSection === 'airline' && (
                    <div className="p-2">
                    {airlinNames.map((type) => buildSelections("airlineName", "airlineName", type))}
                </div>
                )}
            </div>
        </div>
    );
}
