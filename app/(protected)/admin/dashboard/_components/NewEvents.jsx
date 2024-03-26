import { Button } from '@nextui-org/react';
import React from 'react';

const AddNewEvents = ({ ...props }) => {
  return (
    <div>
      <div className='bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 p-8'>
        <div className='flex items-center justify-between'>

          <h1 className='text-3xl font-bold '>Add New Event</h1>
          <Button {...props} color='danger'>Close</Button>
        </div>
        <hr className='w-full  border border-zinc-200 dark:border-zinc-800 my-4' />
        <form className='hidden lg:block' >
          <div className='flex justify-between gap-8 w-full'>
            <ul className='w-full'>
              <li className='flex flex-col gap-2 text-xs w-full '>
                <label className='font-semibold text-sm' htmlFor='clubName'>Enter Club Name</label>
                <input className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full' type="text" name="clubName" id="clubName" />
              </li>
              <hr className='my-3 border-none' />
              <li className='flex flex-col gap-2 text-xs w-full'>
                <label className='font-semibold text-sm' htmlFor='eventName'>Enter Event Name</label>
                <input className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full' type="text" name="eventName" id="eventName" />
              </li>
              <hr className='my-3 border-none' />
              <li className='flex flex-col gap-2 text-xs w-full'>
                <label className='font-semibold text-sm' htmlFor='discription'>Enter Discription</label>
                <input id='discription' name='discription' className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full resize-none h-fit' />
              </li>
              <hr className='my-3 border-none' />
              <li className='flex flex-col gap-2 text-xs w-full'>
                <label className='font-semibold text-sm' htmlFor='category'>Enter Event Type (Category)</label>
                <input className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full' type="text" name="category" id="category" />
              </li>
              <hr className='my-3 border-none' />
              <li className='flex flex-col gap-2 text-xs w-full '>
                <label className='font-semibold text-sm' htmlFor='seats'>Enter Total Seats</label>
                <input className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full' type="number" name="seats" id="seats" />
              </li>
            </ul>

            <ul className='w-full'>
              <li className='flex flex-col gap-2 text-xs w-full'>
                <label className='font-semibold text-sm' htmlFor='registrationFees'>Enter Registration Fees</label>
                <input className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full' type="number" autoComplete='off' name="registrationFees" id="registrationFees" />
              </li>
              <hr className='my-3 border-none' />
              <li className='flex flex-col gap-2 text-xs w-full'>
                <label className='font-semibold text-sm' htmlFor='registrationLink'>Enter Registration link</label>
                <input className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full' type="url" name="registrationLink" id="registrationLink" />
              </li>
              <hr className='my-3 border-none' />
              <div className='flex gap-4'>
                <li className='flex flex-col gap-2 text-xs w-full'>
                  <label className='font-semibold text-sm' htmlFor='date'>Enter Date</label>
                  <input className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full' type="date" autoComplete='off' name="date" id="date" />
                </li>
                <li className='flex flex-col gap-2 text-xs w-full'>
                  <label className='font-semibold text-sm' htmlFor='time'>Enter Time (12 Hours)</label>
                  <input className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full' type="time" autoComplete='off' name="time" id="time" />
                </li>
              </div>
              <hr className='my-3 border-none' />
              <div className='flex gap-4'>
                <li className='flex flex-col gap-2 text-xs w-full'>
                  <label className='font-semibold text-sm' htmlFor='widescreenPoster'>Select Widescreen Poster</label>
                  <input className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full' type="file" autoComplete='off' name="widescreenPoster" id="widescreenPoster" />
                </li>
                <li className='flex flex-col gap-2 text-xs w-full'>
                  <label className='font-semibold text-sm' htmlFor='potraitPoster'>Select Potrait Poster</label>
                  <input className='bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 outline-none rounded-full' type="file" autoComplete='off' name="potraitPoster" id="potraitPoster" />
                </li>
              </div>
            </ul>
          </div>
          <Button type='reset' color='warning' className='float-right my-6 mx-2  text-zinc-50 dark:text-zinc-900'>Reset Data</Button>
          <Button {...props} type='submit' color='success' className='float-right my-6 mx-2  text-zinc-50 dark:text-zinc-900'>Submit Data</Button>
        </form>
        <div className='lg:hidden'>
          <h1 className='flex items-center justify-center w-full text-3xl font-semibold text-center'>Please Use Desktop (with min. 1024px Resolution) To Fill The Data</h1>
        </div>
      </div>
    </div>
  );
};

export default AddNewEvents;