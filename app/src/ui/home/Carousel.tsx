import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hero from "../../../images/hero.jpg";

const Carousel: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        slidesToScroll: 1,
        },
      },
    ],
  };

  const goToPrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className=" pt-16 pb-10 dark:bg-bgDark dark:text-bgWhite text-center">
      <h1 className=" text-5xl py-2">Nasze najlepsze dania</h1>
      <p className=" mb-10 pb-2 px-8 border-b-4 inline-block border-b-main">
        Zobacz je wszystkie
      </p>
      <div className="flex flex-col relative">
        <button
          className=" absolute z-10 top-1/2 text-white text-4xl left-4 rounded-full bg-bgDark opacity-75 font-bold p-1 w-11 h-11 dark:bg-bgWhite dark:text-bgDark"
          onClick={goToPrevious}
        >
          &lt;
        </button>
        <Slider ref={sliderRef} {...settings}>
          <div className="px-4">
            <img src={hero} alt="Photo 1" />
          </div>
          <div className="px-4">
            <img src={hero} alt="Photo 1" />
          </div>
          <div className="px-4">
            <img src={hero} alt="Photo 1" />
          </div>
          <div className="px-4">
            <img src={hero} alt="Photo 1" />
          </div>
          <div className="px-4">
            <img src={hero} alt="Photo 1" />
          </div>
        </Slider>
        <button
          className=" absolute z-10 top-1/2 text-white text-4xl right-4 rounded-full bg-bgDark opacity-75 font-bold p-1 w-11 h-11 dark:bg-bgWhite dark:text-bgDark"
          onClick={goToNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
