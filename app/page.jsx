//todo: function to redirect according to roles




'use client'
import React, { useLayoutEffect } from 'react';
import { Button, Input } from '@/components/components'
import { useRouter } from 'next/navigation';

const LandingPage = () => {

  const router = useRouter()

  useLayoutEffect(() => {
    router.push('./user')
    router.refresh()

  }, [router])


  return (
    <div className='min-h-svh w-svw bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center'>
      <form className='max-w-lg w-full px-6 py-4 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white flex flex-col gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800'>
        <label htmlFor='email'>Enter Email</label>
        <Input className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' type='email' placeholder='jhondoe@example.com' />
        <label htmlFor='password'>Enter Password</label>
        <Input className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' type='password' placeholder='*****' />
        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
};

export default LandingPage;