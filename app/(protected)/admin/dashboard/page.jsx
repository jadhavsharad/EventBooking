import React from 'react';
import Header from '@/app/(protected)/_components/header'
import Dashboard from './_components/Dashboard'

const DashboardPage = () => {

  const NavItems = [
    {
      label: 'Home',
      url: '/admin',
      icons: ''
    },
    {
      label: 'Club',
      url: '/admin/club',
      icons: ''
    },
    {
      label: 'Events',
      url: '/admin/events',
      icons: ''
    },
    {
      label: 'About Us',
      url: '/admin/about',
      icons: ''
    },
    {
      label: 'Dashboard',
      url: '/admin/dashboard',
      icons: ''
    }
  ]

  const username = { username: 'Navneet Agrawal', }

  return (
    <div>
      <Header NavigationItems={NavItems} User={username} />
      <section>
        <Dashboard />
      </section>
    </div>
  );
};

export default DashboardPage;