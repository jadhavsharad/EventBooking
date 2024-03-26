'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import {
  Aadhav,
  Aahvahan,
  BattleOfWits,
  BEETech,
  BeyondBranches,
  CyberConclave,
  LuckPathi,
  RockABlast,
  Solstice,
  Vivaan23,
  CloudQuest,
  CyberNex,
  DSATussle,
  InvestAThon,
  Vivaan,
} from '@/app/(protected)/_assets/Images'

const Event = () => {
  const { isOpen: isModalOpen, onOpen: openModal, onOpenChange } = useDisclosure();
  const [selectedModalIndex, setSelectedModalIndex] = useState(null);

  const handlePopularModal = (index) => {
    setSelectedModalIndex(index);
    openModal();
  };
  const handlePastModal = (index) => {
    setSelectedModalIndex(index);
    openModal();
  };
  const handleUpcomingModal = (index) => {
    setSelectedModalIndex(index);
    openModal();
  };


  const popularClubsAndEvents = [
    {
      Image: CloudQuest,
      clubName: 'AI Club',
      eventName: 'Harmonix',
      discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.',
      registrationFees: '250',
      registrationLink: 'https://google.com'
    },
    {
      Image: CyberNex,
      clubName: 'iOS Club',
      eventName: '',
      discription: '',
      registrationFees: '',
      registrationLink: ''
    },
    {
      Image: DSATussle,
      clubName: 'DSC Club',
      eventName: '',
      discription: '',
      registrationFees: '',
      registrationLink: ''
    },
    {
      Image: InvestAThon,
      clubName: 'GDSC Club',
      eventName: '',
      discription: '',
      registrationFees: '',
      registrationLink: ''
    },
    {
      Image: Vivaan,
      clubName: 'Blockchain Club',
      eventName: 'Cryptex',
      discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.',
      registrationFees: '250'
    },
  ]

  const pastEvents =[
    {
      Image: Aadhav,
      clubName: 'AI Club',
      eventName: 'Harmonix',
      discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.',
      registrationFees: '250',
      registrationLink: 'https://google.com'
    },
    {
      Image: Aahvahan,
      clubName: 'iOS Club',
      eventName: '',
      discription: '',
      registrationFees: '',
      registrationLink: ''
    },
    {
      Image: BattleOfWits,
      clubName: 'DSC Club',
      eventName: '',
      discription: '',
      registrationFees: '',
      registrationLink: ''
    },
    {
      Image: BEETech,
      clubName: 'GDSC Club',
      eventName: '',
      discription: '',
      registrationFees: '',
      registrationLink: ''
    },
    {
      Image: Vivaan23,
      clubName: 'Blockchain Club',
      eventName: 'Cryptex',
      discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.',
      registrationFees: '250'
    },
  ]
  const upcomingEvents = [
    {
      Image: BeyondBranches,
      clubName: 'AI Club',
      eventName: 'Harmonix',
      discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.',
      registrationFees: '250',
      registrationLink: 'https://google.com'
    },
    {
      Image: CyberConclave,
      clubName: 'iOS Club',
      eventName: '',
      discription: '',
      registrationFees: '',
      registrationLink: ''
    },
    {
      Image: LuckPathi,
      clubName: 'DSC Club',
      eventName: '',
      discription: '',
      registrationFees: '',
      registrationLink: ''
    },
    {
      Image: RockABlast,
      clubName: 'GDSC Club',
      eventName: '',
      discription: '',
      registrationFees: '',
      registrationLink: ''
    },
    {
      Image: Solstice,
      clubName: 'Blockchain Club',
      eventName: 'Cryptex',
      discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minus modi impedit.',
      registrationFees: '250'
    },
  ]

  return (
    <div className='py-5 px-10 text-sm'>
      <div>
        <h1>Popular Clubs and Events</h1>
      </div>




      <hr className='my-2 border-none' />




      {/* popularClubsAndEvents */}
      <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center items-center'>
        {popularClubsAndEvents.map((data, index) => (
          <div key={index}>
            <div className='w-52 h-72 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl relative popularClubsAndEvents'>
              <Image width={200} height={300} src={data.Image} alt='image' className='h-full w-full rounded-[inherit] object-cover' />
              <div className='w-full h-full bg-gradient-to-b from-transparent via-transparent to-black  absolute top-0 left-0 rounded-[inherit]'></div>
              <div onClick={() => handlePopularModal(index)} className='px-4 py-2 cursor-pointer focus-visible:scale-90 focus:scale-90 active:scale-90 duration-300 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 absolute bottom-4 left-4'>
                <button >{data.clubName}</button>
              </div>
            </div>
            <Modal isOpen={isModalOpen && selectedModalIndex === index} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Details</ModalHeader>
                    <ModalBody className='flex flex-row'>
                      <div className="hidden sm:block w-1/2 aspect-square">
                        <Image width={500} height={500} alt='image' src={data.Image} className='bg-blue-500 max-h-72 h-full w-full object-cover rounded-xl drop-shadow-lg' />
                      </div>
                      <div className="sm:w-1/2 flex flex-col justify-between gap-2 px-2 text-justify">
                        <h1 className='font-bold text-center text-2xl'>{data.clubName}&apos;s </h1>
                        <h2 className='font-semibold text-center text-lg'>{data.eventName}</h2>
                        <small>{data.discription}</small>
                        <button className='bg-black font-semibold text-xs w-full py-2.5 rounded-full text-white active:scale-90 duration-300'> <a href={data.registrationLink} target='about:blank'>Register {data.registrationFees} </a> </button>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>





      <hr className='my-8 border' />






      {/* pastEvents */}
      <div>
        <h1>Past Events</h1>
      </div>

      <hr className='my-2 border-none' />

      <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center items-center'>
        {pastEvents.map((data, index) => (
          <div key={index} className='w-52 h-72 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl relative'>
            <Image width={200} height={300} src={data.Image} alt='image' className='h-full w-full rounded-[inherit] object-cover' />
            <div className='w-full h-full bg-gradient-to-b from-transparent via-transparent to-black  absolute top-0 left-0 rounded-[inherit]'></div>
            <div className='px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 absolute bottom-4 left-4'>
              <button onClick={() => handlePastModal(index)} >{data.clubName}</button>
            </div>
          </div>
        ))}
      </div>





      <hr className='my-8 border' />




      {/* upcomingEvents */}
      <div>
        <h1>Upcoming Events</h1>
      </div>

      <hr className='my-2 border-none' />

      <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center items-center'>
        {upcomingEvents.map((data, index) => (
          <div key={index} className='w-52 h-72 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl relative'>
            <Image width={200} height={300} src={data.Image} alt='image' className='h-full w-full rounded-[inherit] object-cover' />
            <div className='w-full h-full bg-gradient-to-b from-transparent via-transparent to-black  absolute top-0 left-0 rounded-[inherit]'></div>
            <div className='px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 absolute bottom-4 left-4'>
              <button onClick={() => handleUpcomingModal(index)} >{data.clubName}</button>
            </div>
          </div>

        ))}
      </div>


    </div>
  );
};

export default Event;