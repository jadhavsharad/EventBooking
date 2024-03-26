// todo: fetch the banner and display at top




'use client'
import React, { useState } from 'react';
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





const Banner = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )


  const topBanners = [
    {
      image: 'https://img.freepik.com/free-photo/copy-space-pink-shades-background_23-2148227045.jpg?t=st=1710957225~exp=1710960825~hmac=96f8bbba35a5fd5c15c8be0c739f93d2ece52f90781081bed1bb7aa68c01667a&w=1800',
      category: 'Tech',
      date: '14/03/2023',
      time: '09:00',
      seats: '134',
    },
    {
      image: 'https://img.freepik.com/free-vector/wavy-background-gradient-red-blue_23-2148458094.jpg?t=st=1710957546~exp=1710961146~hmac=4cc2955542923c70534d8d929beb9eb6ae85f6141f760f23e587e5ccb0f345cc&w=1800',
      category: 'Tech',
      date: '14/04/2023',
      time: '09:00',
      seats: '200',
    }
  ]


  return (
    <div className='hidden lg:block' >
      <Carousel
        plugins={[plugin.current]}
        opts={{ align: "start", loop: true, }}
        className="p-4">

        <CarouselContent>
          {topBanners.map((banners, index) => (
            <CarouselItem key={index} className='relative'>
              <Image width={1920} height={1080} src={banners.image} alt='banner' className='object-cover overflow-hidden max-h-52 w-full rounded-xl' />
              <div className='max-w-screen-lg px-6 h-12 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 absolute left-1/2 -translate-x-1/2 -bottom-1/4 -translate-y-1/2 rounded-full'>
                <nav className='h-full'>
                  <ul className='flex gap-12 items-center justify-center h-full text-xs'>
                    <li>
                      <h1 className='font-semibold'>Category</h1>
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
          ))}
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