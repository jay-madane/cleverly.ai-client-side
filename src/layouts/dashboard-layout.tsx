import * as React from 'react'
import { useAuth } from "@clerk/clerk-react"
import { Outlet, useNavigate } from "react-router-dom"

import Navbar from '@/components/navbar'
import SideNav from '@/components/side-nav'
import { ApiLoader } from '@/components/api-loader'
import { fetchData } from '@/lib/utils'
import { useRefresh } from '@/context/refresh-context'

export default function DashboardLayout() {
  const { userId, isLoaded, getToken } = useAuth();
  const navigate = useNavigate();
  const [apiLimitCount, setApiLimitCount] = React.useState(0);
  const [isPremium, setIsPremium] = React.useState(false);
  const { refresh, setRefresh } = useRefresh();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
    fetchData(getToken, setApiLimitCount, setIsPremium);
  }, [isLoaded, getToken, navigate, userId]);

  React.useEffect(() => {
    if (refresh) {
      fetchData(getToken, setApiLimitCount, setIsPremium);
      setRefresh(false);
    }
  }, [refresh, getToken, setRefresh]);

  if (!isLoaded) {
    return <ApiLoader />
  }

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <SideNav apiLimitCount={apiLimitCount} isPremium={isPremium} />
      </div>
      <main className="md:pl-72 pb-8">
        <Navbar apiLimitCount={apiLimitCount} isPremium={isPremium} />
        <Outlet />
      </main>
    </div>
  );
}