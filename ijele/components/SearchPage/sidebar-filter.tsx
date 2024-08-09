"use client";
import { title } from 'process';
import { useState } from 'react';


// Define the types for the section states
// type ExpandedSection = 'time' | 'property' | 'brand' | null;

// export default function FilterSection() {
//     // State to track the currently expanded section
//     const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

//     // Function to toggle the expansion of a specific section
//     const toggleExpansion = (section: ExpandedSection) => {
//         setExpandedSection(expandedSection === section ? null : section);
//     };





// interface CheckBoxPropsSB {
//     title: string,
//     selections: {
//         label: string[],
//         name: string,
//         id: string[],
//     }
// }

// interface pleaseWork {
//     choices: CheckBoxPropsSB[]
// }
// const testData: CheckBoxPropsSB = {
//     title: "Time",
//     selections: {
//         label: ["morning", 'afternoon', 'night'],
//         name: 'flightTimes',
//         id: ["morning", 'afternoon', 'night'],
//     }
// }


// const FilterSection: React.FC<CheckBoxPropsSB> = ({ title, selections }) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const toggleExpansion = () => {
//         setIsExpanded(!isExpanded);
//     };

//     return (
//         <div className="bg-ijele_cream/50 pl-6 pt-4">
//             <p>Filters</p>
//             <div className="p-2">
//                 <h4 className='border-none'>Dates</h4>
//                 <div className="flex items-center text-sm">
//                     <input type="date" name="startDate" id="departure" className="sidebar-inputfield w-1/3" />
//                     ---
//                     <input type="date" name="endDate" id="return" className="sidebar-inputfield w-1/3" />
//                 </div>

//                 <h4 className='border-none'>Price</h4>
//                 <div className="flex justify-center">
//                     <div className='relative rounded-md'>
//                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                             <span className="text-gray-500 sm:text-sm">$</span>
//                         </div>
//                         <input type="number" name="startDate" id="departure" className="sidebar-inputfield pl-4 text-xs text-center" />
//                     </div>
//                     <div className='relative rounded-md'>
//                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                             <span className="text-gray-500 sm:text-sm">$</span>
//                         </div>
//                         <input type="number" name="startDate" id="departure" className="sidebar-inputfield pl-4 text-xs text-center" />
//                     </div>
//                 </div>





//                 {/* Time Sort flight Sidbar */}

//                 <div className='flex items-center'>
//                     <h4 onClick={toggleExpansion} className=''> {testData.title}
//                         <span className='text-xxs text-ijele_cream'>{isExpanded ? '▲' : '▼'}</span> </h4>
//                 </div>
//                 {/* time filter CHOICES */}
//                 {isExpanded && (
//                     {testData.map((selections, index)) => (

//                     <div className=''>
//                         <div>
//                             <label>
//                                 Morning
//                             </label>
//                             <input type="checkbox" name="flightTimes" id="morning" />
//                         </div>
//                     </div>
//                 )}
//             )}
//                 </div>


//             <div>
//                 <label>
//                     <input type="checkbox" name="flightTimes" id="afternoon" />
//                     Afternoon
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     <input type="checkbox" name="flightTimes" id="evening" />
//                     Evening
//                 </label>
//             </div>
//         </div>

















//             {/* Property Types dropdown */ }
//             <div className='flex items-center'>
//                 <h4 onClick={toggleExpansion} className=''> Property Type
//                     <span className='text-xxs text-ijele_cream'>{isExpanded ? '▲' : '▼'}</span> </h4>
//             </div>

//             <div className={isExpanded ? 'visible' : 'hidden'}>
//                 <div>
//                     <label>
//                         <input type="checkbox" name="accomType" id="hotelAccom" />
//                         Hotel
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         <input type="checkbox" name="accomType" id="hostelAccom" />
//                         Resort
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         <input type="checkbox" name="accomType" id="rentalHomeAccom" />
//                         Cabin
//                     </label>
//                 </div>
//             </div>

//     {/* Hotel Brand dropdown */ }
//             <div className='flex items-center'>
//                 <h4 onClick={toggleExpansion} className=''> Brand Names
//                     <span className='text-xxs text-ijele_cream'>{isExpanded ? '▲' : '▼'}</span> </h4>
//             </div>

//             <div className={isExpanded ? 'visible' : 'hidden'}>
//                 <div>
//                     <label>
//                         <input type="checkbox" name="accomType" id="hotelAccom" />
//                         Comfort Inn
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         <input type="checkbox" name="accomType" id="hostelAccom" />
//                         Westin
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         <input type="checkbox" name="accomType" id="rentalHomeAccom" />
//                         La Quinta
//                     </label>
//                 </div>
//             </div>


//         </div >
//         </div >
//     );
// }

// export default FilterSection;