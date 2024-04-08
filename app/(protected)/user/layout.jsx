'use client'
import React, { useLayoutEffect, useMemo, useState } from 'react';
import AuthService from '@/services/authService';
import Auth from '@/components/Auth/auth'
import { useRouter } from 'next/navigation';
const Layout = ({ children }) => {

  const authService = useMemo(() => new AuthService(), []);
  const currentUser = authService.getCurrentUser()
  const redirect = useRouter()

  const [userStatus, setUserStatus] = useState(false)

  useLayoutEffect(() => {
    setUserStatus(false)
    if (currentUser?.roles[0] !== 'ROLE_USER') {
      setUserStatus(false)
    }
    if (currentUser?.roles[0] === 'ROLE_USER') {
      setUserStatus(true)
    }
  }, [currentUser, redirect])
  return (
    <>
      {
        userStatus &&
        <div className='overflow-x-hidden'>
          {children}
        </div>
      }
    </>
  );
};

export default Auth(Layout);