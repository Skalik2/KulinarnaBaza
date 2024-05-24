/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetRecipe } from "../hooks/useGetRecipe";
import Spinner from "../ui/Spinner";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"; // to sie przyda
import { CiCalendar, CiStopwatch } from "react-icons/ci";
import { SlEye } from "react-icons/sl";
import { IoPricetagOutline } from "react-icons/io5";
import { useGetBy } from "../hooks/useGetBy";
import RecipeCard from "../ui/recipes/RecipeCard";

interface recipeInterface {
  autor: number;
  cena: string;
  czas_przygotowania: string;
  data_publikacji: string;
  id_przepisu: number;
  opis: string;
  tytul: string;
  wyswietlenia: number;
}

interface ingInterface {
  id_skladnik: number;
  ilosc: string;
  nazwa: string;
}

interface tagInterface {
  id_tagu: number;
  nazwa: string;
}

interface dataInterface {
  przepis: recipeInterface[];
  skladniki: ingInterface[];
  tagi: tagInterface[];
}

export default function Recipe() {
  const params = useParams();
  const { mutate: getByFn, data: dataBy, isSuccess } = useGetBy();
  const { data, isLoading } = useGetRecipe(params.id!);
  const recipeData = data as dataInterface;
  console.log(params.id);
  console.log(data);

  useEffect(() => {
    if (recipeData && recipeData.tagi.length > 0) {
      getByFn({ ing: undefined, tag: recipeData.tagi[0].id_tagu });
    }
  }, [recipeData, getByFn]);

  const sortedRecipes = useMemo(() => {
    if (dataBy && isSuccess) {
      return dataBy
        .sort((a: any, b: any) => {
          const idA = parseFloat(a.wyswietlenia);
          const idB = parseFloat(b.wyswietlenia);

          return idB - idA;
        })
        .filter(
          (item: any) => item.id_przepisu !== recipeData.przepis[0].id_przepisu
        )
        .slice(0, 3);
    }

    return [];
  }, [dataBy, isSuccess, recipeData.przepis]);

  const descriptionWithLineBreaks = recipeData?.przepis[0].opis
    .split("\n")
    .map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  return (
    <div className=" py-16 md:pt-[72px] bg-bgWhite dark:bg-bgDark">
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col max-w-6xl w-full mx-auto justify-center items-center">
          <div className="rounded-lg overflow-hidden mt-7 w-full">
            <img
              className="w-full"
              src={`http://localhost:5000/api/recipes/image/${recipeData.przepis[0].id_przepisu}`}
              alt={`${recipeData.przepis[0].id_przepisu}`}
            />
          </div>
          <div className="flex justify-between w-full items-center p-4 sm:px-10 mt-5">
            <div className="w-full flex justify-between items-center">
              <h3 className="font-semibold text-3xl md:text-4xl text-bgDark dark:text-bgWhite">
                {recipeData.przepis[0].tytul}
              </h3>
              <button className="text-3xl text-red-500 p-3 hover:text-mainHover transition-colors duration-300">
                <FaRegHeart />
              </button>
            </div>
          </div>
          <div className="p-4 sm:px-10 w-full flex justify-start items-center flex-wrap gap-6 text-slate-400 dark:text-zinc-500">
            <div>
              <p className="flex justify-center items-center gap-2 mr-5">
                <span className="text-3xl">
                  <CiStopwatch />
                </span>
                {recipeData.przepis[0].czas_przygotowania} min.
              </p>
            </div>
            <div>
              <p className="flex justify-center items-center gap-3 mr-5">
                <span className="text-2xl">
                  <SlEye />
                </span>
                {recipeData.przepis[0].wyswietlenia}
              </p>
            </div>

            <div>
              <p className="flex justify-center items-center gap-3 mr-5">
                <span className="text-2xl">
                  <IoPricetagOutline />
                </span>
                {recipeData.przepis[0].cena} zł
              </p>
            </div>
            <div>
              <p className="flex justify-center items-center gap-3">
                <span className="text-2xl">
                  <CiCalendar />
                </span>
                {new Date(
                  recipeData.przepis[0].data_publikacji
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex justify-start w-full items-center gap-5 flex-wrap p-4 sm:px-10 my-10">
            {recipeData.tagi.map((item, i) => (
              <div
                key={i}
                className="px-3 py-2 rounded-lg bg-bgWhiteHover dark:bg-bgDarkHover text-bgDark dark:text-bgWhite "
              >
                <p>{item.nazwa}</p>
              </div>
            ))}
          </div>
          <div className=" w-full p-4 sm:px-10 bg-bgWhiteHover dark:bg-bgDarkHover rounded-lg py-14">
            <p className="text-lg md:text-2xl text-bgDark dark:text-bgWhite font-semibold">
              Składniki:
            </p>
            {recipeData.skladniki.map((item, i) => (
              <div
                className="flex gap-5 justify-start items-center my-2 py-2 ml-5"
                key={i}
              >
                <div className="w-2 h-2 rounded-full bg-main"></div>
                <p className="text-bgDark dark:text-bgWhite">
                  {item.nazwa} - {item.ilosc}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center w-full items-start p-4 sm:px-10">
            <h3 className="text-lg md:text-2xl text-bgDark dark:text-bgWhite font-semibold my-6">
              Opis przepisu
            </h3>
            <p className="text-bgDark dark:text-bgWhite text-[15px] ">
              {descriptionWithLineBreaks}
            </p>
          </div>
          <div className="p-4 my-14 flex flex-col justify-center items-center gap-10">
            <p className="text-lg md:text-2xl text-bgDark dark:text-bgWhite">
              Polecane <span className="text-main">przepisy</span>
            </p>
            <div className=" flex flex-wrap justify-center gap-4 mx-auto max-w-7xl">
              {sortedRecipes.map((item: any) => (
                <RecipeCard
                  link={`/recipes/${item.id_przepisu}/${item.tytul.replace(
                    /\s+/g,
                    "-"
                  )}`}
                  imageSrc={`http://localhost:5000/api/recipes/image/${item.id_przepisu}`}
                  title={item.tytul}
                  key={item.id_przepisu}
                  price={item.cena}
                  time={item.czas_przygotowania}
                  views={item.wyswietlenia}
                />
              ))}
            </div>
          </div>

          <div className="p-4 my-14 flex flex-col justify-center items-center gap-10">
            <p className="text-lg md:text-2xl text-bgDark dark:text-bgWhite">
              Komentarze <span className="text-main">do przepisu</span>
            </p>
            <p>dupa</p>
          </div>
        </div>
      )}
    </div>
  );
}
