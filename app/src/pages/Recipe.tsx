/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRecipe } from "../hooks/useGetRecipe";
import Spinner from "../ui/Spinner";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"; // to sie przyda
import { CiCalendar, CiStopwatch } from "react-icons/ci";
import { SlEye } from "react-icons/sl";
import { IoPricetagOutline } from "react-icons/io5";
import { useGetBy } from "../hooks/useGetBy";
import RecipeCard from "../ui/recipes/RecipeCard";
import { useAddFavorite } from "../hooks/useAddFavorite";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useGetFav } from "../hooks/useGetFav";
import { useRemoveFav } from "../hooks/useRemoveFav";
import { GiCook } from "react-icons/gi";
import { useGetRecipeComments } from "../hooks/useGetRecipeComments";
import { useAddRecipeComment } from "../hooks/useAddRecipeComment";

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user: { id_uzytkownika: string } | undefined = queryClient.getQueryData(
    ["user"]
  );
  const { mutate: getByFn, data: dataBy, isSuccess } = useGetBy();
  const { addFav } = useAddFavorite();
  const { removeFav } = useRemoveFav();
  const { data, isLoading } = useGetRecipe(params.id!);
  const { data: userFav, isLoading: isLoadingFav } = useGetFav(
    user?.id_uzytkownika
  );
  const recipeData = data as dataInterface;
  const [isFav, setIsFav] = useState(
    userFav?.some(
      (item: any) => item.id_przepisu === recipeData?.przepis[0].id_przepisu
    )
  );

  const { addComment } = useAddRecipeComment();
  const { data: comments, isLoading: isLoadingComments } = useGetRecipeComments(
    recipeData?.przepis[0].id_przepisu
  );
  console.log(comments);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (
      userFav &&
      recipeData?.przepis?.[0] &&
      userFav.some(
        (item: any) => item.id_przepisu === recipeData.przepis[0].id_przepisu
      )
    ) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [userFav, recipeData]);

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
          (item: any) => item.id_przepisu !== recipeData?.przepis[0].id_przepisu
        )
        .slice(0, 3);
    }

    return [];
  }, [dataBy, isSuccess, recipeData?.przepis]);

  function handleFav() {
    if (!user) {
      navigate("/login");
      toast.error("Zaloguj się, aby dodać przepis do ulubionych");
    } else {
      if (isFav) {
        removeFav({ recipeId: recipeData.przepis[0].id_przepisu });
      } else {
        addFav({ recipeId: recipeData.przepis[0].id_przepisu });
      }
    }
  }

  function handleAddComment() {
    addComment({
      recipeID: recipeData.przepis[0].id_przepisu,
      commentBody: comment,
    });
    setComment("");
  }

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
              <button
                onClick={handleFav}
                className="text-3xl text-red-500 p-3 hover:text-mainHover transition-colors duration-300"
                disabled={isLoadingFav}
              >
                {isFav ? <FaHeart /> : <FaRegHeart />}
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

          <div className="p-4 my-14 flex flex-col justify-center items-center gap-10 w-full">
            <p className="text-lg md:text-2xl text-bgDark dark:text-bgWhite">
              Komentarze <span className="text-main">do przepisu</span>
            </p>
            <div className="flex p-4 md400:px-16 sm:px-20 md:px-32 flex-col justify-end items-end w-full gap-5">
              <div className="w-full  flex justify-center items-center gap-10">
                <span className="hidden sm:block text-2xl text-main rounded-full p-2 border border-main">
                  <GiCook />
                </span>
                <div className="relative h-[50px] w-full">
                  <input
                    id="label"
                    placeholder="Treść komentarza"
                    className="border-none focus:outline-none  px-3 py-2 w-full bg-transparent  dark:text-bgWhite text-bgDark"
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="absolute h-[1px] w-full bg-main"></div>
                </div>
              </div>
              <button
                onClick={handleAddComment}
                className="w-[300px] bg-main hover:bg-mainHover py-2 text-white uppercase tracking-wide  rounded-full transition-all duration-300 mt-3"
              >
                Dodaj komentarz
              </button>
            </div>
            <div className="flex flex-col justify-center items-center p-4 md400:px-16 sm:px-20 md:px-32 w-full">
              {isLoadingComments ? (
                <p>Wczytywanie komentarzy</p>
              ) : comments.length === 0 ? (
                <p>Ten przepis nie ma jeszcze komentarzy</p>
              ) : (
                <div className="flex flex-col justify-start items-start w-full gap-12">
                  {comments
                    .slice()
                    .reverse()
                    .slice(0, 10)
                    .map((item: any) => (
                      <>
                        <div className="flex justify-center items-center gap-5 max-w-full">
                          <span className="self-start block text-2xl text-main rounded-full  p-2 border border-main">
                            <GiCook />
                          </span>
                          <div className="flex flex-col justify-center items-start gap-5 text-bgDark dark:text-bgWhite">
                            <p className="text-sm font-medium">Użytkownik</p>
                            <p className="text-wrap break-words">{item.opis}</p>
                          </div>
                        </div>
                        <div className="h-[1px] w-full bg-slate-200 dark:bg-stone-800"></div>
                      </>
                    ))}{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
