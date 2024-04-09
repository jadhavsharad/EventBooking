'use client'
import { PlusIcon } from '@radix-ui/react-icons';
import { CiSearch } from "react-icons/ci";
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import AddNewEvents from './NewEvents'
import AuthService from "@/services/authService"
import axios from 'axios';


const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            try {
                await axios
                    .get('http://localhost:8000/api/getEvents')
                    .then((response) => {
                        setEvents(response.data);
                        setLoading(false)
                    }
                    )
                    .catch(error => {
                        console.log(error)
                    }
                    )
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchEvents()

    }, [])

    console.log(!loading && (events[0]))


    const authService = useMemo(() => new AuthService(), [])
    const currentUser = authService.getCurrentUser()

    const [isModalOpen, setIsModalOpen] = useState(true)
    const [upcomingDates, setUpcomingDates] = useState([]);
    const [currentDateIndex, setCurrentDateIndex] = useState(null);

    useLayoutEffect(() => {
        const generateUpcomingDates = () => {
            const today = new Date();
            const dates = [];
            for (let i = 0; i < 6; i++) {
                const date = new Date();
                date.setDate(today.getDate() + i);
                dates.push(date);
            }
            setUpcomingDates(dates);
            const currentIndex = dates.findIndex(date => isSameDay(date, today));
            setCurrentDateIndex(currentIndex);
        };
        generateUpcomingDates();
    }, []);


    const isSameDay = (date1, date2) => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handleModalOpen = () => {
        if (!isModalOpen) {
            document.getElementById('addEventModal').classList.add('hidden')
        } else {
            document.getElementById('addEventModal').classList.remove('hidden')
        }

        setIsModalOpen(!isModalOpen)
    }



    return (
        <div className='relative bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50  flex justify-center gap-0 min-h-svh p-2 overflow-hidden select-none'>
            <div className='flex flex-col items-start justify-start w-full lg:w-2/3 border border-zinc-200 dark:border-zinc-800 py-2 px-4 rounded-3xl'>
                <form className='flex items-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 my-2 p-1 w-full'>
                    <input autoComplete='off' id='search' className='bg-inherit rounded-[inherit] py-2 px-6 outline-none text-xs  w-full' placeholder='Search Events' />
                    <label htmlFor='search' className='active:scale-90 duration-300 flex items-center justify-center cursor-pointer text-xl text-zinc-400 dark:text-zinc-600 hover:text-zinc-500 px-3 hover:bg-zinc-200 hover:dark:bg-zinc-800 h-full w-fit rounded-[inherit]'><CiSearch /></label>
                </form>
                <div className='text-zinc-950 dark:text-zinc-50 py-2 w-full flex items-center justify-between'>
                    <div>
                        <h1 className='font-medium text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>Good Morning, {currentUser.name}</h1>
                        <small>Manage Events and Venues</small>
                    </div>
                    <div onClick={handleModalOpen} className='active:scale-90 duration-300 bg-sky-200 border border-sky-400 dark:bg-sky-800 dark:border-sky-600 text-blue-900 dark:text-sky-100 px-4 py-2 rounded-full cursor-pointer'>
                        <button className='flex items-center gap-2 text-xs '>Event<PlusIcon className='rounded-full' /></button>
                    </div>
                </div>
                <hr className='border border-zinc-100  dark:border-zinc-900 w-full my-3' />
                <div>
                    <h1>My Events</h1>
                </div>
                <>
                    {
                        !loading &&
                        (
                            events.map((events) => (
                                <div key={events._id} className='w-full my-2'>
                                    <div className='w-full h-72 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden'>
                                        {!loading &&
                                            <img src={`data:${events.contentType};base64,${Buffer.from(events.widescreenPoster.data).toString('base64')}`} alt="banner" />
                                        }
                                    </div>
                                </div>
                            ))
                        )
                    }
                </>


            </div>
            <div className='w-1/3 min-h-svh rounded-3xl border border-zinc-200 dark:border-zinc-800 hidden lg:flex flex-col gap-4 p-4'>
                <h1 className='text-sm'>Upcoming Event Details</h1>
                <div className='flex items-center justify-between text-xs'>
                    {upcomingDates.map((date, index) => (
                        <div key={index} className={` flex flex-col items-center justify-center px-2 py-4 rounded-full ${(index === currentDateIndex) ? 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800' : 'transparent'}`}>
                            <span>{date.getDate()}</span>
                            <span>{daysOfWeek[date.getDay()]}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <div className='w-full flex flex-col active:scale-90 duration-500 select-none cursor-pointer hover:bg-zinc-100 hover:dark:bg-zinc-900 px-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-medium font-semibold'>AI Conclave</h1>
                            <small className='text-zinc-500'>12/04/2024</small>
                        </div>
                        <small className='overflow-hidden truncate text-xs text-zinc-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur ratione quasi quas, sapiente veniam, laborum dolore deserunt incidunt quisquam exercitationem reprehenderit ipsa hic?</small>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className='absolute inset-0 bg-zinc-50 dark:bg-zinc-950 hidden z-[999999] select-none' id='addEventModal'>
                <AddNewEvents onClick={handleModalOpen} />
            </div>
        </div>
    );
};

export default Dashboard;