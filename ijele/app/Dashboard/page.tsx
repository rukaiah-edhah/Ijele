"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Navbar from '@/components/navbar';

const Dashboard = () => {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();
  const kindeIssuerUrl = process.env.KINDE_ISSUER_URL;

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

  return (
    <div>
      <Navbar currentPage="Dashboard"/>
      <h1>Welcome to your Dashboard</h1>
      {/* we can add the dashboard content later :)  */}
    </div>
  );
};

export default Dashboard;
