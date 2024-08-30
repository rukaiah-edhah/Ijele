"use client"

import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Image from 'next/image'
import { NewTripForm } from './tripForm'
import { expatImages } from '../ImageMapping'



// User - ...[schema]
//          userTrips: Trip[]
//      
// Trip - 
//      trip_id: 
//      transport: Flights[]
//      accom: Hotels[]
//      people: User[]
//      location: string
//      description: string
//      tripTitle: string
//      tripImg: string (path)

//      peopleImgs: img[]

const cards: JSX.Element[] = [];

function groupMates(travelers: number ) {
    const avatars: JSX.Element[] = [];
    for (let i = 0; i < travelers; i++) {
        i < expatImages.length? avatars.push(
            <div className="avatar">
                <div className="w-12">
                    <Image src={expatImages[i]} width={100} height={100} alt={'travler'} />
                </div>
            </div>)
            : null
    }

    let remainder = travelers - 4
    if (remainder > 0) {
        avatars.push(
            <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12">
                    <span>+{remainder}</span>
                </div>
            </div>
        )
    }
    return <div className="avatar-group -space-x-6 rtl:space-x-reverse">{avatars}</div>

    // return (
    //     <div className="avatar-group -space-x-6 rtl:space-x-reverse">
    //         <div className="avatar">
    //             <div className="w-12">
    //                 <Image src="/Images/home/Cynthia.jpg" width={100} height={100} alt={'travler'} />
    //             </div>
    //         </div>
    //         <div className="avatar">
    //             <div className="w-12">
    //                 <Image src="/Images/home/Tywayah.jpg" width={100} height={100} alt={'travler'} />
    //             </div>
    //         </div>
    //         <div className="avatar">
    //             <div className="w-12">
    //                 <Image src="/Images/home/Rukaiah.jpg" width={100} height={100} alt={'travler'} />
    //             </div>
    //         </div>
    //         <div className="avatar">
    //             <div className="w-12">
    //                 <Image src="/Images/home/Jennifer.jpg" width={100} height={100} alt={'travler'} />
    //             </div>
    //         </div>
    //         <div className="avatar placeholder">
    //             <div className="bg-neutral text-neutral-content w-12">
    //                 <span>+2</span>
    //             </div>
    //         </div>
    //     </div>
    // )
}

function buildTripCard(tripDets: any) {
    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure>
                <Image src='/Images/hotel/results/resort1.jpg' width={300} height={300} alt={'trip image'} />
            </figure>
            <div className="card-body">
                <div className="card-actions flex">
                    <h2 className="card-title text-ijele_teal text-xl">{tripDets.title}</h2>
                    <button> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="5%" width="5%" className='fill-ijele_sand'><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" /></svg></button>
                </div>
                <div className='justify-start text-start flex'>
                    <label htmlFor="location" className='mr-3 text-gray-400'>Location</label>
                    <p className='font-kite_one'>{tripDets.location}</p>
                </div>
                <div className='justify-start text-start flex'>
                    <label htmlFor="description" className='mr-3 text-gray-400'>Description</label>
                    <p className='font-kite_one'>{tripDets.description}</p>
                </div>
                <div className='text-start items-center '>
                    <label htmlFor="Travlers" className='font-kite_one text-gray-400'>Travelers</label>
                    {groupMates(tripDets.travelers)}
                </div>
            </div>
        </div>
    )
}
export const UserTrips = () => {

    const [open, setOpen] = useState(false)
    const [objectReturned, setObjectReturned] = useState(false)
    const [newTrip, setNewTrip] = useState({
        title: "",
        location: "",
        description: "",
        travelers: 0,
        tripImage: "",
        people: "",
        accom: "",
        transport: ""
    })

    const handleTripInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTrip((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        cards.push()
        console.log(newTrip)
    };

    const newTripCard = (cardCreated: boolean) => {
        saveNewTrip()
        setObjectReturned(cardCreated)
    }

    const saveNewTrip = async () => {
        try {
            const response = await fetch('/api/add-trip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTrip), 
            });

            if (!response.ok) {
                throw new Error('Failed to save new trip');
            }

            alert('Trip saved successfully!');
            setObjectReturned(true); 
            setOpen(false); 
        } catch (error) {
            console.error('Error saving trip:', error);
            alert('Failed to save new trip');
        }
    };
    // return (
    //     <>
    //         <div className="container mx-auto p-6 bg-white bg-opacity-80 shadow-md rounded-lg">
    //             <button onClick={() => setOpen(true)} className="bg-ijele_teal text-ijele_cream text-[1.5rem] font-junge font-bold py-1 px-6 rounded-lg hover:bg-ijele_deepGold transition-colors duration-300"> + </button>
    
    //             <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
    //                 <DialogBackdrop
    //                     transition
    //                     className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    //                 />
    
    //                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    //                     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    //                         <DialogPanel
    //                             transition
    //                             className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
    //                         >
    //                             <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    //                                 <div className="sm:flex sm:items-start">
    //                                     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ijele_gold sm:mx-0 sm:h-10 sm:w-10">
    //                                         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='fill-ijele_cream'>
    //                                             <path d="M280-120q-33 0-56.5-23.5T200-200v-440q0-33 23.5-56.5T280-720h80v-80q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v80h80q33 0 56.5 23.5T760-640v440q0 33-23.5 56.5T680-120q0 17-11.5 28.5T640-80q-17 0-28.5-11.5T600-120H360q0 17-11.5 28.5T320-80q-17 0-28.5-11.5T280-120Zm0-80h400v-440H280v440Zm80-40h80v-360h-80v360Zm160 0h80v-360h-80v360Zm-80-480h80v-80h-80v80Zm40 300Z" />
    //                                         </svg>
    //                                     </div>
    //                                     <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
    //                                         <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
    //                                             Add New Trip
    //                                         </DialogTitle>
    //                                         <div className="mt-2">
    //                                             <p className="text-sm text-gray-500">
    //                                                 Please Fill the following information completely!
    //                                             </p>
    //                                             <form>
    //                                                 <NewTripForm tripDetails={newTrip} handleInputChange={handleTripInputChange} />
    //                                             </form>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
    //                                 <button
    //                                     type="button"
    //                                     onClick={saveNewTrip} // Save function called on click
    //                                     className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
    //                                 >
    //                                     Save
    //                                 </button>
    //                                 <button
    //                                     type="button"
    //                                     onClick={() => setOpen(false)}
    //                                     className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
    //                                 >
    //                                     Cancel
    //                                 </button>
    //                             </div>
    //                         </DialogPanel>
    //                     </div>
    //                 </div>
    //             </Dialog>
    
    //             {objectReturned ? (
    //                 <div className='mt-8 max-h-sm' onChange={() => setObjectReturned(false)}> {/* Directly set state here */}
    //                     {buildTripCard(newTrip)}
    //                 </div>
    //             ) : null}
    //         </div>
    //     </>
    // );
    return (
        <>
            <div className="container mx-auto p-6 bg-white bg-opacity-80 shadow-md rounded-lg">
                <button onClick={() => setOpen(true)} className="bg-ijele_teal text-ijele_cream text-[1.5rem] font-junge font-bold py-1 px-6 rounded-lg hover:bg-ijele_deepGold transition-colors duration-300"> + </button>

                <Dialog open={open} onClose={setOpen} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ijele_gold sm:mx-0 sm:h-10 sm:w-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='fill-ijele_cream'><path d="M280-120q-33 0-56.5-23.5T200-200v-440q0-33 23.5-56.5T280-720h80v-80q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v80h80q33 0 56.5 23.5T760-640v440q0 33-23.5 56.5T680-120q0 17-11.5 28.5T640-80q-17 0-28.5-11.5T600-120H360q0 17-11.5 28.5T320-80q-17 0-28.5-11.5T280-120Zm0-80h400v-440H280v440Zm80-40h80v-360h-80v360Zm160 0h80v-360h-80v360Zm-80-480h80v-80h-80v80Zm40 300Z" /></svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Add New Trip
                                            </DialogTitle>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Please Fill the following information completely!
                                                </p>
                                                <form>
                                                    <NewTripForm tripDetails={newTrip} handleInputChange={handleTripInputChange} />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={() => {
                                            newTripCard(true)
                                            setOpen(false)

                                        }}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Save
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>

                {objectReturned ?
                    <div className='mt-8 max-h-sm' onChange={() => newTripCard(false)}>
                        {buildTripCard(newTrip)}
                    </div>
                    : null}

            </div>
            {console.log("isDialogue open?: " + open)}

        </>
    )
}