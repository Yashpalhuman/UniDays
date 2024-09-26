import React from 'react'
import Link from "next/link"
import '@/css/embla3.css'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel3 from "@/components/EmblaCarousel3"

import {RA_DATA} from "@/constants/index";

const OPTIONS: EmblaOptionsType = { align: 'start',
loop: true,
slidesToScroll: 'auto' }

const SLIDES_3 = RA_DATA.slice(0, 9).map(item => ({
  id: item.id,
  src: item.src,
  destination: item.destination,
  date: item.date,
  reqpep: item.reqpep,
  size: item.size,
  description: item.description
}));

const Ridealong = () => {
    return (
      <section className='max-container padding-container mt-12'>
      <div className='flex justify-between mb-8'>
          <h1 className='font-bold text-2xl lg:text-3xl text-gray-700'>Ride Together</h1>
          <Link href="/rides" className='text-gray-600 flexCenter 
                cursor-pointer pt-2 transition-all hover:font-bold underline'>View all</Link>
      </div>
      <div><EmblaCarousel3 slides={SLIDES_3} options={OPTIONS} /></div>
      </section>
    )
  }
  
  export default Ridealong