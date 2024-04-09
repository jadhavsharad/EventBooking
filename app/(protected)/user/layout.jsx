'use client'
import React, { useEffect, useState } from 'react';
import useAuthCheck from '@/components/Auth/authCheck'
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {

    const { isAdmin, isUser } = useAuthCheck();
    
    // User Ready Status
    const [loggedStatus, setLoggedStatus] = useState(false);

    useEffect(() => {
        if (isUser()) {
            setLoggedStatus(true)
        }
    });

    return (
        <>
            {loggedStatus &&
                (isUser() ?
                    <div className='overflow-x-hidden'>
                        {children}
                    </div>
                    : isAdmin() ?
                        useRouter().push('/admin')
                        : useRouter().push('/')
                )}
        </>
    );
};

export default Layout;