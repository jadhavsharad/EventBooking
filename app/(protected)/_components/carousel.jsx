// todo: fetch the banner and display at top




'use client'
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"
import { ArrowRightIcon } from '@radix-ui/react-icons';
import axios from 'axios'




const Banner = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [banner, setBanner] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    setLoading(true)
    const fetchBanner = async () => {
      try {
        axios
          .get("http://localhost:8000/api/getEventBanners")
          .then((response) => {
            // console.log(response.data)
            setBanner(response.data)
            // console.log(banner)
            setLoading(false)
          })
          .catch(error => {
            setMessage(error.response.data.message)
          })
      }
      catch (error) {
        setMessage(error)
      }
    }

    fetchBanner()
  }, [])

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  // console.log(banner[0])

  return (
    <div className='hidden lg:block' >
      <Carousel
        plugins={[plugin.current]}
        opts={{ align: "start", loop: true, }}
        className="p-4">

        <CarouselContent>
          <>
            {
              (loading && message === null)
                ?
                <h1 className='text-3xl text-sky-500  w-full saturate-200 font-semibold text-center'>
                  Sit Back and Relax While We Load...
                </h1>
                :
                (!loading && message === null)
                  ?
                  (
                    banner.map((banners, index) => (
                      <CarouselItem key={index} className='relative'>
                        <Image width={1920} height={1080} src={`data:${banners.contentType};base64,${Buffer.from(banners.widescreenPoster.data).toString('base64')}`} alt='banner' className='object-cover overflow-hidden max-h-52 w-full rounded-xl' />
                        <div className='max-w-screen-lg px-6 h-12 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 absolute left-1/2 -translate-x-1/2 -bottom-1/4 -translate-y-1/2 rounded-full'>
                          <nav className='h-full'>
                            <ul className='flex gap-12 items-center justify-center h-full text-xs'>
                              <li className='capitalize'>
                                <h1 className='font-semibold '>Category</h1>
                                {banners.category}
                              </li>
                              <div className='w-px h-8 bg-zinc-400 dark:bg-zinc-600'></div>
                              <li>
                                <h1 className='font-semibold'>Date</h1>
                                {banners.date}
                              </li>
                              <div className='w-px h-8 bg-zinc-400 dark:bg-zinc-600'></div>
                              <li>
                                <h1 className='font-semibold'>Time</h1>
                                {banners.time}</li>
                              <div className='w-px h-8 bg-zinc-400 dark:bg-zinc-600'></div>
                              <li>
                                <h1 className='font-semibold'>Seats</h1>
                                {banners.seats}</li>
                              <div className='w-px h-8 bg-zinc-400 dark:bg-zinc-600'></div>
                              <button onClick={onOpen} className='bg-rose-900 rounded-full saturate-200 px-4 py-2 text-xl text-white active:scale-90 duration-300'><ArrowRightIcon /></button>
                            </ul>
                          </nav>
                        </div>
                      </CarouselItem>
                    ))
                  )
                  :
                  (message) &&
                  (
                    <h1 className='text-3xl w-full font-semibold text-center text-rose-600 saturate-200'>
                      {message}
                    </h1>
                  )
            }
          </>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>Info Panel</h1>
              </ModalHeader>
              <ModalBody className='flex flex-row'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae ullam asperiores eos dignissimos in amet, tenetur cum quos commodi accusamus laudantium ipsum, eaque odit delectus, quod consequuntur repellendus numquam! Laboriosam.
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div >
  );
};

export default Banner;