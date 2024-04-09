'use client'
import React, { useEffect, useState } from 'react';
import useAuthCheck from '@/components/Auth/authCheck'


const Layout = ({ children }) => {
    const { isAdmin, isUser } = useAuthCheck();

    // User Ready Status
    const [loggedStatus, setLoggedStatus] = useState(false);
    useEffect(() => {
        if (isAdmin()) {
            setLoggedStatus(true)
        }

    }, [setLoggedStatus]);

    return (
        <>
            {
                loggedStatus &&
                (isAdmin ?
                    <div className='overflow-x-hidden'>
                        {children}
                    </div>
                    : isUser() ?
                        useRouter().push('/user')
                        : useRouter().push('/')
                )
            }
        </>
    );
};

export default Layout;