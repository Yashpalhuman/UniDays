"use client"
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import { AutoplayOptionsType } from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react'

type TransportOption = {
    id: number;
    src: string;
    destination: string;
    date: string;
    size: number;
    reqpep?: number;
    description: string;
};

type PropType = {
  slides: TransportOption[];
  options?: EmblaOptionsType;
}

const autosettings = {
  delay: 4400,
  stopOnInteraction: true, 
};


const EmblaCarousel3: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autosettings)])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay as AutoplayOptionsType;
    if (!autoplay) return

    const resetOrStop =
      autoplay.options?.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="embla3">
      <div className="embla3__viewport" ref={emblaRef}>
    <div className="embla3__container">
      {slides.map((slide) => (
        <div className="embla3__slide " key={slide.id}>
          <img src={slide.src} alt={slide.destination} className="embla3__slide__img" />
          <div className="embla3__slide__content ml-1 mt-1">
            <div className="text-2xl font-serif font-bold text-stroke">{slide.destination}</div>
            <p className="text-lg mt-2">Date :  <span className='italic text-black font-semibold opacity-65'>{slide.date}</span></p>
            <p className="text-md mt-0"><span className='font-semibold'>{slide.description}</span></p>
            <p className="text-md mt-2 font-mono text-black">Group size: {slide.size}</p>  
            {slide.reqpep && (<p className="text-md font-mono text-black">Required people: {slide.reqpep}</p>)}

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

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel3
