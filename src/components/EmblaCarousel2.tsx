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

type slide = {
    id: number,
    src: string,
    destination: string,
    date: string,
    duration: number,
    size: number,
    reqpep: number
}
type PropType = {
  slides: slide[];
  options?: EmblaOptionsType;
}

const autosettings = {
  delay: 4600,
  stopOnInteraction: true, 
};

const EmblaCarousel2: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autosettings)]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay as AutoplayOptionsType;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    if (resetOrStop) {
      resetOrStop();
    }
  }, []);

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
    <section className="embla2">
      <div className="embla2__viewport" ref={emblaRef}>
    <div className="embla2__container">
      {slides.map((slide) => (
        <div className="embla2__slide" key={slide.id}>
        {/* Image */}
        <img
          src={slide.src}
          alt={slide.destination}
          className="w-full h-64 object-cover rounded-2xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
        />
      
        {/* Content */}
        <div className="ml-1 mt-4 flex flex-col gap-2 text-gray-800">
          {/* Destination Title */}
          <div className="text-2xl font-serif font-bold text-stroke">{slide.destination}</div>
      
          {/* Trip Info */}
          <div className="grid grid-cols-2 text-sm md:text-base gap-y-1">
            <p className="col-span-2">
              <span className="font-medium text-gray-700">Date:</span>{" "}
              <span className="italic opacity-80">{slide.date}</span>
            </p>
            <p>
              <span className="font-medium text-gray-700">Duration:</span>{" "}
              <span className="font-semibold">{slide.duration} days</span>
            </p>
            <p>
              <span className="font-medium text-gray-700">Group size:</span>{" "}
              {slide.size}
            </p>
            <p>
              <span className="font-medium text-gray-700">Required:</span>{" "}
              {slide.reqpep}
            </p>
          </div>
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

export default EmblaCarousel2
