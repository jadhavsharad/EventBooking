// todo: display user and username accordingly




'use client'
import { usePathname, useRouter } from "next/navigation";
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { Raleway } from "next/font/google";
import AuthService from "@/services/authService"

const raleway = Raleway({ subsets: ['latin'] })



const Header = ({ NavigationItems }) => {
    const authService = useMemo(() => new AuthService(), [])
    const currentUser = authService.getCurrentUser()

    const router = useRouter()
    const logout = () => {
        authService
            .logout()
        router.push('/')
    }

    const pathname = usePathname()

    return (
        <div className={raleway.className}>
            <header className='h-14 text-xs border-b border-b-zinc-200 dark:border-b-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white md:flex lg:flex items-center justify-between px-6 hidden'>
                <div>
                    <h1 className="text-xl">GrabASeat</h1>
                </div>
                <div className="flex gap-2 items-center">
                    <nav>
                        <ul className="flex gap-4">
                            {NavigationItems.map((NavItems, index) => (
                                <li key={index}> <a href={NavItems.url} className={`${(pathname === NavItems.url) ? 'text-orange-400 saturate-200' : 'text-black dark:text-white'}`} >{NavItems.label}</a></li>
                            ))}
                            <li onClick={logout} className="cursor-pointer">Logout</li>
                        </ul>
                    </nav>
                    <div className='w-px h-8 bg-zinc-400 dark:bg-zinc-600'></div>
                    <div>
                        {
                            pathname === '/admin' ? <h1><a href='/admin/dashboard'>{currentUser.name}</a></h1> : <h1>{currentUser.name}</h1>
                        }
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;