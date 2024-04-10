//todo: function to redirect according to roles




'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input } from '@/components/components'
import { useRouter } from 'next/navigation';
import useAuthCheck from '@/components/Auth/authCheck'
import AuthService from "@/services/authService"


const LandingPage = () => {

  const authService = useMemo(() => new AuthService(), [])


  // User Ready Status
  const [loggedStatus, setLoggedStatus] = useState(false);
  const [message, setMessage] = useState("")

  const { isAdmin, isUser } = useAuthCheck();

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
      .catch((error) => {
        setMessage(error.response.data.message)
      })
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,

    }))
  }

  useEffect(() => {
    setLoggedStatus(false)
    if (isAdmin()) {
      setLoggedStatus(false)
      router.push('/admin')
    }
    if (isUser()) {
      setLoggedStatus(false)
      router.push('/user')
    }

    setLoggedStatus(true)
  }, [setLoggedStatus, isAdmin, isUser, router]);

  const handleSignUp = (e) => {
    e.preventDefault()
    router.push('/signup')
  }



  return (
    <>
      {(loggedStatus && !isAdmin() || !isUser()) &&
        <div className='min-h-svh w-svw bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center'>
          <form className='max-w-lg w-full px-6 py-4 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white flex flex-col gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800'>
            <label htmlFor='email'>Enter Email</label>
            <Input onChange={handleInputChange} className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' name='email' type='email' placeholder='jhondoe@example.com' />
            <label htmlFor='password'>Enter Password</label>
            <Input onChange={handleInputChange} className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' name='password' type='password' placeholder='*****' />
            <Button onClick={handleSubmit} type='submit'>Login</Button>
            <Button onClick={handleSignUp} className='bg-teal-500' >Sign up</Button>
            <h1 className='saturate-200 text-rose-600'>{message}</h1>
          </form>
        </div>
      }
    </>
  );
};

export default LandingPage;