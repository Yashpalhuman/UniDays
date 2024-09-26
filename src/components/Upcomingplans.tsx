import React from 'react'
import Link from "next/link"
import '@/css/embla2.css'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel2 from "@/components/EmblaCarousel2"

import {UP_DATA} from "@/constants/index";

const OPTIONS: EmblaOptionsType = { align: 'start',
loop: true,
slidesToScroll: 'auto' }

const SLIDES_2 = UP_DATA.slice(0, 9).map(item => ({
  id: item.id,
  src: item.src,
  destination: item.destination,
  date: item.date,
  duration: item.duration,
  size: item.size,
  reqpep: item.reqpep
}));

const Upcomingplans = () => {
  return (
    <section className='max-container padding-container mt-8'>
    <div className='flex justify-between mb-8'>
        <h1 className='font-bold text-2xl lg:text-3xl text-gray-700'>Upcoming Plans</h1>
        <Link href="/plans" className='text-gray-600 flexCenter 
                cursor-pointer pt-2 transition-all hover:font-bold underline'>View all</Link>
    </div>
    <div><EmblaCarousel2 slides={SLIDES_2} options={OPTIONS} /></div>
    </section>
  )
}

export default Upcomingplans