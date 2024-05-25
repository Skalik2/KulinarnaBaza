/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetArticle } from "../hooks/useGetArticle";
import { useAddArticleComment } from "../hooks/useAddArticleComment";
import { useGetArticleComments } from "../hooks/useGetArticleComments";
import Spinner from "../ui/Spinner";
import { GiCook } from "react-icons/gi";
import { LuPencil } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import toast from "react-hot-toast";
import { useGetArticles } from "../hooks/useGetArticles";
import { default as ArticleCard } from "../ui/article/Article";

export default function Article() {
  const params = useParams();
  const queryClient = useQueryClient();
  const { data: articlesData, isLoading: isLoadingArticles } = useGetArticles();
  const user: { id_uzytkownika: string } | undefined = queryClient.getQueryData(
    ["user"]
  );
  const { data, isLoading } = useGetArticle(params.id!);
  const { addComment } = useAddArticleComment();
  const { data: comments, isLoading: isLoadingComments } =
    useGetArticleComments(+params.id!);
  console.log(data);
  const [comment, setComment] = useState("");

  const randomArticle = useMemo(() => {
    if (articlesData && !isLoadingArticles) {
      return articlesData[Math.floor(Math.random() * articlesData.length)];
    }

    return [];
  }, [articlesData, isLoadingArticles]);

  function handleAddComment() {
    if (user) {
      addComment({
        articleID: +params.id!,
        commentBody: comment,
      });
      setComment("");
    } else {
      toast.error("Zaloguj się, aby dodać komentarz");
    }
  }

  const descriptionWithLineBreaks = data?.opis
    .split("\n")
    .map((line: any, index: any) => (
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
              src={`http://localhost:5000/api/articles/image/${params.id}`}
              alt={`${params.id}`}
            />
          </div>
          <div className="flex justify-between w-full items-center p-4 sm:px-10 mt-5">
            <div className="w-full flex justify-between items-center">
              <h3 className="font-semibold text-3xl md:text-4xl text-bgDark dark:text-bgWhite">
                {data.tytul}
              </h3>
            </div>
          </div>
          <div className="p-4 sm:px-10 w-full flex justify-start items-center flex-wrap gap-6 text-slate-400 dark:text-zinc-500">
            <div>
              <p className="flex justify-center items-center gap-2 mr-5">
                <span className="text-2xl">
                  <LuPencil />
                </span>
                {data.autor}
              </p>
            </div>

            <div>
              <p className="flex justify-center items-center gap-3">
                <span className="text-2xl">
                  <CiCalendar />
                </span>
                {new Date(data.data_publikacji).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full items-start p-4 sm:px-10">
            <p className="text-bgDark dark:text-bgWhite text-[15px] ">
              {descriptionWithLineBreaks}
            </p>
          </div>
          <div className="p-4 my-14 flex flex-col justify-center items-center gap-10">
            <p className="text-lg md:text-2xl text-bgDark dark:text-bgWhite">
              Polecany <span className="text-main">artykuł</span>
            </p>
            <div className=" flex flex-wrap justify-center gap-4 mx-auto max-w-7xl">
              {isLoadingArticles ? (
                <p>Wczytywanie wybranego artykułu...</p>
              ) : (
                <ArticleCard
                  imageSrc={`http://localhost:5000/api/articles/image/${randomArticle.id_artykulu}`}
                  title={randomArticle.tytul}
                  author={randomArticle.autor}
                  date={new Date(
                    randomArticle.data_publikacji
                  ).toLocaleDateString()}
                  link={`/articles/${
                    randomArticle.id_artykulu
                  }/${randomArticle.tytul.replace(/\s+/g, "-")}`}
                />
              )}
            </div>
          </div>

          <div className="p-4 my-14 flex flex-col justify-center items-center gap-10 w-full">
            <p className="text-lg md:text-2xl text-bgDark dark:text-bgWhite">
              Komentarze <span className="text-main">do artykułu</span>
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
                <p>Ten artykuł nie ma jeszcze komentarzy</p>
              ) : (
                <div className="flex flex-col justify-start items-start w-full gap-12">
                  {comments
                    .slice()
                    .reverse()
                    .slice(0, 10)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map((item: any) => (
                      <>
                        <div className="flex justify-center items-center gap-5 max-w-full">
                          <span className="self-start block text-2xl text-main rounded-full  p-2 border border-main">
                            <GiCook />
                          </span>
                          <div className="flex flex-col justify-center items-start gap-5 text-bgDark dark:text-bgWhite">
                            <p className="text-sm font-medium">{item.imie}</p>
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
