/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useGetFav } from "../hooks/useGetFav";
import RecipeCard from "../ui/recipes/RecipeCard";
import Spinner from "../ui/Spinner";
import { Pagination } from "@mui/material";
import useDarkMode from "../hooks/useDarkMode";
import { useUser } from "../hooks/useUser";

export default function Favorite() {
  const { isDarkMode } = useDarkMode();
  const { data: user } = useUser();
  const { data: userFav, isLoading } = useGetFav(user?.id_uzytkownika);
  const [data, setData] = useState(userFav);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_ON_PAGE = 3;

  const [label, setLabel] = useState("");

  useEffect(() => {
    let fav = userFav;

    if (label) {
      fav = fav?.filter((item: any) =>
        item.tytul.toUpperCase().includes(label.toUpperCase())
      );
    }

    fav = fav?.sort((a: any, b: any) => {
      const idA = parseFloat(a.id_przepisu);
      const idB = parseFloat(b.id_przepisu);

      if (idA < idB) {
        return -1;
      } else if (idA > idB) {
        return 1;
      } else {
        return 0;
      }
    });

    setData(fav);
    setTotalPages(Math.ceil(data?.length / ITEMS_ON_PAGE));
  }, [label, userFav, setData, data?.length]);

  useEffect(() => {
    setPage(1);
  }, [label]);

  const handleChangePage = (_e: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="pt-16 md:pt-[72px] dark:bg-bgDark flex flex-col items-center bg-bgWhite">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center w-full mx-auto max-w-7xl mt-16 px-4 md:px-10">
        <div>
          <h3 className="font-semibold text-2xl md:text-3xl text-bgDark dark:text-bgWhite text-center">
            Twoje ulubione <span className="text-main">przepisy</span>
          </h3>
          <p className="ml-3 mt-1 hidden md:block">
            Liczba ulubionych przepisów: {data.length}
          </p>
        </div>
        <div>
          <div className="relative h-[50px] w-full">
            <input
              id="label"
              placeholder="Wyszukaj przepis"
              className="border-none focus:outline-none  px-3 py-2 w-full bg-transparent  dark:text-bgWhite text-bgDark"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <div className="absolute h-[1px] w-full bg-main"></div>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full max-w-7xl bg-slate-200 dark:bg-stone-800 my-16"></div>

      {isLoading && !data ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className=" flex flex-wrap md:px-10  justify-center gap-4 mx-auto max-w-[1400px]">
            {data
              ?.slice(
                (page - 1) * ITEMS_ON_PAGE,
                (page - 1) * ITEMS_ON_PAGE + ITEMS_ON_PAGE
              )
              .map((item: any) => (
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
          <div className="flex justify-center items-center w-full my-16 text-main">
            {totalPages !== 1 && (
              <Pagination
                sx={{
                  "& .Mui-selected": {
                    backgroundColor: "#ff5700 !important",
                    color: "#ffffff !important",
                    "&:hover": {
                      backgroundColor: "#e84a00",
                    },
                  },
                  "& .MuiPaginationItem-root": {
                    color: `${isDarkMode ? "#ffffff" : "#333333"}`,
                    "&:hover": {
                      backgroundColor: `${isDarkMode ? "#2b2d35" : "#f1f5f9"}`,
                    },
                  },
                }}
                count={totalPages}
                onChange={handleChangePage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
