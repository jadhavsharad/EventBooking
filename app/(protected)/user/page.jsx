// todo: fetch and display username to header accordingly


import React from 'react';
import Header from '@/app/(protected)/_components/header'
import Banner from '@/app/(protected)/_components/carousel'
import Event from '@/app/(protected)/_components/events'

const HomePage = () => {

  const NavItems = [
    {
      label: 'Home',
      url: '/user',
      icons: ''
    },
    {
      label: 'Club',
      url: '/user/club',
      icons: ''
    },
    {
      label: 'Events',
      url: '/user/events',
      icons: ''
    },
    {
      label: 'About Us',
      url: '/user/about',
      icons: ''
    }
  ]

  return (
    <div className='bg-zinc-50 dark:bg-zinc-950'>
      <Header NavigationItems={NavItems} />
      <section className='min-h-svh bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white'>
        <Banner />
        <Event />
      </section>
    </div>
  );
};

export default HomePage;