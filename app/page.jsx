
'use client'
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { Button, Input } from '@/components/components'
import AuthService from "@/services/authService";
import { redirect, useRouter } from 'next/navigation';

const LandingPage = () => {

  // Intializing New AuthService
  const authService = useMemo(() => new AuthService(), []);
  const currentUser = authService.getCurrentUser()

  // User Ready Status
  const [loggedStatus, setLoggedStatus] = useState(null);

  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })



  // Login Handle
  const handleSubmit = (e) => {
    e.preventDefault()
    authService
      .login(formData)
      .then((response) => {
        if (response) {
          const currentUser = authService.getCurrentUser().roles[0]
          if (currentUser.includes('ROLE_USER')) {
            router.push("/user")
          } else if (currentUser.includes('ROLE_ADMIN')) {
            router.push('/admin')
          }
        }
      })
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,

    }))
  }


  // On Page Load It Checks The Login Status And Redirects User If LoggedIn
  useLayoutEffect(() => {
    setLoggedStatus(false);
    const currentUser = authService.getCurrentUser()?.roles[0];
    if (!currentUser) {
      setLoggedStatus(true);
    }
    if (currentUser === "ROLE_USER") {
      router.push('./user')
      setLoggedStatus(false);
      router.refresh()
    }
    if (currentUser === "ROLE_ADMIN") {
      router.push('./admin')
      setLoggedStatus(false);
      router.refresh()
    }
  }, [currentUser, authService, setLoggedStatus, router]);



  return (
    <>
    {
      (loggedStatus !== null && loggedStatus !== false) &&
        <div className='min-h-svh w-svw bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center'>
          <form onSubmit={handleSubmit} className='max-w-lg w-full px-6 py-4 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white flex flex-col gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800'>
            <label htmlFor='email'>Enter Email</label>
            <Input onChange={handleInputChange} name='email' className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' type='email' placeholder='jhondoe@example.com' />
            <label htmlFor='password'>Enter Password</label>
            <Input onChange={handleInputChange} name='password' className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' type='password' placeholder='*****' />
            <Button type='submit'>Login</Button>
          </form>
        </div>
      
        }
    </>
  );
};

export default LandingPage;