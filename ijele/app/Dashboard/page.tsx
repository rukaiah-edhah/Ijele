"use client";

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Navbar from '@/components/navbar';
import TravelerDetailForm from '@/components/Flight/TravelerDetailForm';
import Image from 'next/image';
import { ComingSoon } from '@/components/Dashboard/coming-soon';
import { UserTrips } from '@/components/Dashboard/tripTab';
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

type TabProps = 'My Trips' | 'Profile' | 'Saved' | 'Chat';

const Dashboard = () => {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();
  const kindeIssuerUrl = process.env.KINDE_ISSUER_URL || ''; 
  const [travelerDetails, setTravelerDetails] = useState({
    firstName: `${user?.given_name}`,
    lastName: `${user?.family_name}`,
    gender: "",
    email: `${user?.email}`,
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
  const [showingTab, setShowingTab] = useState<TabProps>('Profile');
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      if (!isLoading) {
        if (!isAuthenticated) {
          if (!kindeIssuerUrl) {
            setShowLoginMessage(true);
          } else {
            router.push(`${kindeIssuerUrl}/auth/cx/_:nav&m:login`);
          }
          return;
        }

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
            return;
          }
        }
      }
    };

    checkUser();
  }, [isAuthenticated, user, isLoading, router, kindeIssuerUrl]);

  if (isLoading) {
    return (
      <div className='h-screen justify-center place-items-center items-center'>
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-xs"></span>
      </div>
    );
  }

  if (showLoginMessage) {
    return (
      <>
      <Navbar currentPage={''} />
      <div className="flex items-center justify-center h-screen text-center">
        <div className="bg-ijele_teal p-10 rounded-lg text-white">
          <h1 className="text-2xl mb-4">Access Denied</h1>
          <p className="mb-6">You need to log in to access the dashboard.</p>
          <LoginLink className="bg-white text-ijele_teal px-4 py-2 rounded-lg">Log in</LoginLink>
        </div>
      </div>
      </>
    );
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const navTabs = ["My Trips", "Profile", "Saved", "Chat"];
  
  function buildNavTabs() {
    return navTabs.map((tab) => (
      <button
        key={tab}
        onClick={() => changePageContent(tab)}
        className={showingTab === tab ? 'text-ijele_teal border-b-2' : 'text-[#DDCCBD]'}
      >
        {tab}
      </button>
    ));
  }

  const changePageContent = (currentTab: string) => {
    setShowingTab(currentTab as TabProps);
  };

  return (
    <div>
      <Navbar currentPage="Dashboard" />
      <div className='max-w-full items-center mt-[5%] space-y-6 text-center'>
        <div className='flex grid-col-2'>
          <div className='w-1/3 h-60 rounded-lg flex justify-center pb-10 pt-10'>
            <div>
              <Image src="/Images/hotel/results/the-maybourne-beverly-hills-exterior.jpg" alt="user profile img" className='w-24 h-24 mb-3 rounded-full shadow-lg' width={100} height={100} />
              <h5 className='text-sm text-gray-400 dark:text-ijele_teal'> {user?.given_name}</h5>
            </div>
            <div className='mt-4 md:mt-6 text-start items-center ml-[5%] pl-[5%] border-l-2 border-ijele_cream'>
              <div className='flex-col flex  space-y-4 text-inter text-ijele_navy '>
                {buildNavTabs()}
              </div>
            </div>
          </div>

          <div className='w-full justify-center bg-ijele_cream rounded-lg'>
            <div className='justify-center'>
              <h1 className='mt-4 mb-4'>Welcome to your Dashboard</h1>
              {showingTab === "Profile" && (
                <TravelerDetailForm
                  travelerDetails={travelerDetails}
                  handleInputChange={handleInputChange}
                />
              )}
              {showingTab === "My Trips" && <UserTrips />}
              {showingTab === "Chat" && <ComingSoon />}
              {showingTab === "Saved" && <ComingSoon />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
