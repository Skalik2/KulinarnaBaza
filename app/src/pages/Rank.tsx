/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Footer from "../ui/footer/Footer";
import { useGetBestRecipes } from "../hooks/useGetBestRecipes";
import RecipeCard from "../ui/recipes/RecipeCard";
import Spinner from "../ui/Spinner";

export default function Rank() {
  const { data, isLoading } = useGetBestRecipes();
  console.log(data);
  return (
    <>
      <div className="pt-16 md:pt-[72px] bg-bgWhite dark:bg-bgDark px-6 min-h-screen">
        <div className="w-full flex justify-center items-center flex-col gap-6 md:gap-10 p-4 my-10 md:my-20 pt-16 md:pt-[72px]">
          <p className="text-xl md:text-3xl dark:text-bgWhite">
            Ranking najlepszych przepisów naszych użytkowników
          </p>
          <p className="text-lg text-main">Top 10 the best</p>
        </div>
        {isLoading ? (
          <div className="h-screen w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className=" flex flex-wrap  md:pt-[72px] justify-center gap-4 mx-auto max-w-7xl py-20">
            {data?.map((item: any) => (
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
        )}
      </div>
      <Footer />
    </>
  );
}
