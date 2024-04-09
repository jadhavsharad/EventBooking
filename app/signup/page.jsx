'use client'
import React, { useMemo } from 'react';
import { Button, Input } from '@/components/components'
import { useState } from 'react';
import AuthService from "@/services/authService";

const Signup = () => {

    // Intializing New AuthService
    const authService = useMemo(() => new AuthService(), []);

    const [message, setMessage] = useState("")
    const [statusCode, setStatusCode] = useState()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        roles: ""
    });

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,

        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        authService
            .signup(formData)
            .then((data) => {
                const { message, statusCode } = data
                setMessage(message)
                setStatusCode(statusCode)
                console.log(data)
            })
            .catch((error) => {
                console.log('Please Refresh The Page And Try Again\n Error:', error)
            })
    }

    return (
        <div className='min-h-svh w-svw bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='max-w-lg w-full px-6 py-4 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white flex flex-col gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800'>
                <label htmlFor='name'>Enter Name</label>
                <Input onChange={handleChange} className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' id="name" name='name' type='text' placeholder='Jhon Doe' />
                <label htmlFor='email'>Enter New Email</label>
                <Input onChange={handleChange} className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' name='email' type='email' placeholder='jhondoe@example.com' />
                <label htmlFor='phoneNumber'>Enter New Phone Number</label>
                <Input onChange={handleChange} className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' name='phoneNumber' type='number' placeholder='1234567890' />
                <label htmlFor='password'>Enter New Password</label>
                <Input onChange={handleChange} className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' name='password' type='password' placeholder='*****' />
                <label htmlFor='roles'>Enter Role</label>
                <Input onChange={handleChange} className='bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0' name='roles' type='text' placeholder='user, admin' />
                <Button type='submit'>Signup</Button>
                <h1 className={(statusCode === 403) ? 'text-rose-600 saturate-200' : (statusCode === 200) ? 'text-emerald-600' : 'text-white'} >{message}</h1>
            </form>
        </div>
    );
};

export default Signup;