'use client'
import React, { useEffect, useState } from 'react';
import useAuthCheck from '@/components/Auth/authCheck'
import { useRouter } from 'next/navigation';


const Layout = ({ children }) => {
    const { isAdmin, isUser } = useAuthCheck();

    // User Ready Status
    const [loggedStatus, setLoggedStatus] = useState(false);
    useEffect(() => {
        if (isAdmin()) {
            setLoggedStatus(true)
        }

    }, [setLoggedStatus, isAdmin]);

    const router = useRouter()

    return (
        <>
            {
                loggedStatus &&
                (isAdmin ?
                    <div className='overflow-x-hidden'>
                        {children}
                    </div>
                    : isUser() ?
                        router.push('/user')
                        : router.push('/')
                )
            }
        </>
    );
};

export default Layout;