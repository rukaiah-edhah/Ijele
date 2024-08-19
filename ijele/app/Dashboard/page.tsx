"use client";

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Navbar from '@/components/navbar';
import TravelerDetailForm from '@/components/Flight/TravelerDetailForm';
import Image from 'next/image';

const Dashboard = () => {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();
  const kindeIssuerUrl = process.env.KINDE_ISSUER_URL;
  const [travelerDetails, setTravelerDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    deviceType: "",
    countryCallingCode: "",
    number: "",
    dateOfBirth: "",
    documentType: "",
    birthPlace: "",
    issuanceLocation: "",
    issuanceDate: "",
    passportNumber: "",
    passportExpiryDate: "",
    passportIssuanceCountry: "",
    validityCountry: "",
    nationality: "",
    holder: true,
  });

  useEffect(() => {
    const checkUser = async () => {
      if (!isLoading) {
        if (isAuthenticated && user?.email) {
          const response = await fetch('/api/get-user-by-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email }),
          });

          const existingUser = await response.json();
          if (!existingUser) {
            router.push('/Onboarding');
          }
        } else {
          router.push(`${kindeIssuerUrl}/auth/cx/_:nav&m:login`);
        }
      }
    };

    checkUser();
  }, [isAuthenticated, user, isLoading, router, kindeIssuerUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  return (
    <div >
      <Navbar currentPage="Dashboard" />
      <div className='max-w-full items-center mt-[5%] space-y-6 text-center'>
        <div className='flex grid-col-2'
        >
          <div className='w-1/3 h-60 rounded-lg flex justify-center pb-10 pt-10'>
            <div>
              <Image src="/Images/hotel/results/the-maybourne-beverly-hills-exterior.jpg" alt="user profile img" className='w-24 h-24 mb-3 rounded-full shadow-lg' width={100} height={100} />
              <h5 className='text-sm text-gray-400 dark:text-ijele_teal'>{user?.given_name}</h5>
            </div>
            <div className='mt-4 md:mt-6 text-start items-center ml-[5%] pl-[5%] border-l-2 border-ijele_cream'>
              <div className='flex-col flex  space-y-4 text-inter text-ijele_navy '>
                <button className='text-ijele_teal'>Profile</button>
                <button className='text-grey-200'>My Trips</button>
                <button className='text-grey-200'>Saved</button>
                <button className='text-grey-200'>Chats</button>
              </div>
            </div>
          </div>

          <div className='w-full justify-center bg-ijele_cream rounded-lg'>
            <div className='justify-center'>
              <h1 className='mt-4 mb-4'>Welcome to your Dashboard</h1>
              <TravelerDetailForm
                travelerDetails={travelerDetails}
                handleInputChange={handleInputChange} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
