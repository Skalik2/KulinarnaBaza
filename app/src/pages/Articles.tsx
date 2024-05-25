/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";
import Article from "../ui/article/Article";
import { Link } from "react-router-dom";
import { useGetArticles } from "../hooks/useGetArticles";
import Spinner from "../ui/Spinner";
import { Pagination } from "@mui/material";
import useDarkMode from "../hooks/useDarkMode";
import { useEffect, useState } from "react";

export default function Articles() {
  const queryClient = useQueryClient();
  const userAuth = queryClient.getQueryData(["user"]) !== undefined;
  const { data: articlesData, isLoading } = useGetArticles();
  const [data, setData] = useState([]);

  const { isDarkMode } = useDarkMode();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_ON_PAGE = 4;

  const [label, setLabel] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    let articles = articlesData;

    if (label) {
      articles = articles?.filter((item: any) =>
        item.tytul.toUpperCase().includes(label.toUpperCase())
      );
    }

    if (selectedFilter === "date-asc") {
      articles.sort(
        (a: any, b: any) =>
          new Date(a.data_publikacji).getTime() -
          new Date(b.data_publikacji).getTime()
      );
    } else if (selectedFilter === "date-desc") {
      articles.sort(
        (a: any, b: any) =>
          new Date(b.data_publikacji).getTime() -
          new Date(a.data_publikacji).getTime()
      );
    }

    setData(articles);
    setTotalPages(Math.ceil(data?.length / ITEMS_ON_PAGE));
  }, [articlesData, label, data?.length, selectedFilter]);

  useEffect(() => {
    setPage(1);
  }, [label]);

  const handleChangePage = (_e: any, newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 400);
  };

  return (
    <div className="pt-16 md:pt-[72px] dark:bg-bgDark flex flex-col items-center">
      {" "}
      {userAuth ? (
        <div className="w-full flex justify-center items-center flex-col gap-6 md:gap-10 p-4 my-10 md:my-20">
          <p className="text-xl md:text-3xl dark:text-bgWhite">
            Masz ciekawy pomysł na artykuł kulinarny?
          </p>
          <p className="text-lg dark:text-bgWhite">
            Podziel się nim z innymi użytkownikami!
          </p>
          <Link
            to="/articles/add-new"
            className="px-5 py-2 bg-main hover:bg-mainHover  rounded-full text-bgWhite tracking-wider font-medium transition-colors duration-300 text-[15px]"
          >
            Dodaj artykuł
          </Link>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center flex-col gap-6 md:gap-10 p-4 my-10 md:my-20">
          <p className="text-xl md:text-3xl dark:text-bgWhite">
            Chcesz podzielić się swoją poradą kulinarną?
          </p>
          <p className="text-lg dark:text-bgWhite">
            Może masz inny ciekawy pomysł na artykuł? Dołącz do nas!
          </p>
          <Link
            to="/signup"
            className="px-5 py-2 bg-main hover:bg-mainHover  rounded-full text-bgWhite tracking-wider font-medium transition-colors duration-300 text-[15px]"
          >
            Zarejestruj
          </Link>
        </div>
      )}
      <div className="py-10 w-full bg-bgWhiteHover dark:bg-bgDarkHover mb-5">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row justify-between items-center gap-5 px-20 mx-auto">
          <div className="flex justify-center items-center">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="outline-none cursor-pointer p-2 border bg-transparent border-main rounded text-bgDark dark:text-stone-400"
            >
              <option value="date-asc">Od najstarszego</option>
              <option value="date-desc">Od najnowszego</option>
            </select>
          </div>
          <div>
            <div className="relative h-[50px] w-full">
              <input
                id="label"
                placeholder="Wyszukaj artykuł"
                className="border-none focus:outline-none  px-3 py-2 w-full bg-transparent  dark:text-bgWhite text-bgDark"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
              <div className="absolute h-[1px] w-full bg-main"></div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap justify-center items-center gap-10 mx-auto max-w-7xl sm:p-6">
        {isLoading ? (
          <div className="h-screen w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {data
              ?.slice(
                (page - 1) * ITEMS_ON_PAGE,
                (page - 1) * ITEMS_ON_PAGE + ITEMS_ON_PAGE
              )
              .map((item: any) => (
                <Article
                  imageSrc={`http://localhost:5000/api/articles/image/${item.id_artykulu}`}
                  title={item.tytul}
                  author={item.autor}
                  date={new Date(item.data_publikacji).toLocaleDateString()}
                  link={`/articles/${item.id_artykulu}/${item.tytul.replace(
                    /\s+/g,
                    "-"
                  )}`}
                />
              ))}
          </>
        )}
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
    </div>
  );
}
