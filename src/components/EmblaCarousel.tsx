"use client"
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import { AutoplayOptionsType } from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react'


type Slide = {
  id: number,
  src: string,
  destination: string,
  date: string,
  duration: number,
  size: number,
  reqpep: number
}
  
  type PropType = {
    slides: Slide[];
    options?: EmblaOptionsType;
  };

  const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
  
    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
      const autoplay = emblaApi?.plugins()?.autoplay as AutoplayOptionsType;
      if (!autoplay) return
  
      const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
      resetOrStop();
    }, []);
  
    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
    } = usePrevNextButtons(emblaApi, onNavButtonClick)
  
    return (
        <section className="embla max-container py-2 lg:py-6">
  <div className="embla__viewport" ref={emblaRef}>
    <div className="embla__container">
      {slides.map((slide) => (
        <div className="embla__slide" key={slide.id}>
          <img src={slide.src} alt={slide.destination} className="embla__slide__img" />
          <div className="embla__slide__content">
            <div className="text-5xl lg:text-7xl font-serif font-bold text-stroke">{slide.destination}</div>
            <p className="text-lg mt-4">Date :  <span className='italic text-black font-semibold opacity-65'>{slide.date}</span></p>
            <p className="text-sm mt-0">Duration : <span className='font-semibold'>{slide.duration} days</span></p>
            <p className="text-md mt-4 font-mono text-black">Group size: {slide.size}</p>  
            <p className="text-md font-mono text-black">Required people: {slide.reqpep}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
      
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </section>
      
      );
  }
  
  export default EmblaCarousel