import React from 'react'
import '@/css/embla.css';
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from "@/components/EmblaCarousel"

import {TAR_DATA} from "@/constants/index";

const OPTIONS: EmblaOptionsType = { align: 'start',
loop: true,
slidesToScroll: 'auto' }

const SLIDES_1 = TAR_DATA.map(item => ({
  id: item.id,
  src: item.src,
  destination: item.destination,
  date: item.date,
  duration: item.duration,
  size: item.size,
  reqpep: item.reqpep
}));

function Hero() {
  return (
    <div className='mt-2 px-2 lg:px-20 3xl:px-0'><EmblaCarousel slides={SLIDES_1} options={OPTIONS} /></div>
  )
}

export default Hero