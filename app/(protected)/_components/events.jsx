// remove images and fetch from backend

'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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

} from '@/app/(protected)/_assets/Images'
import axios from 'axios'

const Event = () => {

  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    setLoading(true)
    const fetchEvents = async () => {
      try {
        await axios
          .get("http://localhost:8000/api/getUserEvents")
          .then((response) => {
            setEventData(response.data)
            setLoading(false)
          })
          .catch(error => {
            setMessage(error.response.data.message)
            setLoading(false)
          })
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchEvents()

  }, [])

  console.log(eventData)


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



  const pastEvents = [
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
      <>
        {
          (loading) ?
            <h1 className='w-full text-2xl text-center '>
              Loading Please Wait...
            </h1>
            :
            (!loading && (message === null))
              ?
              (
                <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center items-center'>
                  {eventData.map((data,) => (
                    <div key={data._id}>
                      <div className='w-52 h-72 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl relative popularClubsAndEvents'>
                        <Image width={200} height={300} src={`data:${data.contentType};base64,${Buffer.from(data.potraitPoster.data).toString('base64')}`} alt='image' className='h-full w-full rounded-[inherit] object-cover' />
                        <div className='w-full h-full bg-gradient-to-b from-transparent via-transparent to-black  absolute top-0 left-0 rounded-[inherit]'></div>
                        <div onClick={() => handlePopularModal(data._id)} className='px-4 py-2 cursor-pointer focus-visible:scale-90 focus:scale-90 active:scale-90 duration-300 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 absolute bottom-4 left-4'>
                          <button >{data.clubName}</button>
                        </div>
                      </div>
                      <Modal isOpen={isModalOpen && selectedModalIndex === data._id} onOpenChange={onOpenChange}>
                        <ModalContent>
                          {(onClose) => (
                            <>

                              <ModalHeader className="flex flex-col gap-1">Details</ModalHeader>
                              <ModalBody >
                                <div>
                                  <h1 className='font-bold text-center text-3xl'>{data.clubName}&apos;s </h1>
                                  <h2 className='font-semibold text-center text-lg capitalize'>{data.eventName}</h2>
                                </div>
                                <div className='flex flex-row items-center justify-center'>
                                  <div className="hidden sm:flex items-center justify-center w-1/2 aspect-square">
                                    {/* <Image width={500} height={500} alt='image' src={`data:${data.contentType};base64,${Buffer.from(data.potraitPoster.data).toString('base64')}`} className='bg-blue-500 w-full h-full object-cover rounded-xl drop-shadow-xl' /> */}
                                    <Image width={500} height={500} alt='image' src={`data:${data.contentType};base64,${Buffer.from(data.qrCode.data).toString('base64')}`} className='bg-blue-500 w-full object-cover rounded-xl drop-shadow-xl' />
                                  </div>
                                  <div className="sm:w-1/2 aspect-square flex flex-col items-center justify-between gap-2 px-2 text-justify">
                                    <small className='overflow-scroll scrollbar-hide w-full h-full'>{data.discription}</small>
                                  </div>
                                </div>
                                <div className='w-full flex justify-end'>
                                <button className='bg-black px-6 w-1/2 font-semibold text-xs py-2.5 rounded-full text-white active:scale-90 duration-300'> <a href={data.registrationLink} target='about:blank'>Register {data.registrationFees} </a> </button>

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
              )
              :
              (message) &&
              (
                <h1>
                  {message}
                </h1>
              )
        }
      </>





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


    </div>
  );
};

export default Event;