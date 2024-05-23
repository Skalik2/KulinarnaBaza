import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "../Spinner";
import { useGetRecipes } from "../../hooks/useGetRecipes";

const Carousel: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);

  const { data, isLoading } = useGetRecipes();
  const firstFive = data?.slice(0, 5);
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
  console.log(data)
  return (
    <div className=" pt-16 pb-10 bg-bgWhite dark:bg-bgDark dark:text-bgWhite text-center">
      <h1 className=" text-5xl py-2">Nasze najlepsze dania</h1>
      <p className=" mb-10 pb-2 px-8 border-b-4 inline-block border-b-main">
        Zobacz je wszystkie
      </p>
      <div className="flex flex-col relative">
        <button
          className="absolute z-10 top-1/3 text-white text-4xl left-4 rounded-full bg-bgDark opacity-75 font-bold p-1 w-11 h-11 dark:bg-bgWhite dark:text-bgDark"
          onClick={goToPrevious}
        >
          &lt;
        </button>
        {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {firstFive.map((recipe:any) => (
            <div className="px-4">
              {<img src={`http://localhost:5000/api/recipes/image/${recipe.id_przepisu}`} alt="Photo 1" />}
          </div>
          ))}
        </Slider>
      )}
        <button
          className=" absolute z-10 top-1/3 text-white text-4xl right-4 rounded-full bg-bgDark opacity-75 font-bold p-1 w-11 h-11 dark:bg-bgWhite dark:text-bgDark"
          onClick={goToNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
