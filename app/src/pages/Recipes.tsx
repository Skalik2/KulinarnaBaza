/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";
import RecipeCard from "../ui/recipes/RecipeCard";
import { useGetRecipes } from "../hooks/useGetRecipes";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import AddNewTagModal from "../ui/recipes/AddNewTagModal";
import { ingredientInterface, recipeIng, tagInterface } from "./AddNewRecipe";
import axios from "axios";
import AddNewIngModal from "../ui/recipes/AddNewIngModal";
import { useGetBy } from "../hooks/useGetBy";
import Footer from "../ui/footer/Footer";

export default function Recipes() {
  const queryClient = useQueryClient();
  const userAuth = queryClient.getQueryData(["user"]) !== undefined;
  const { data: recipesData, isLoading } = useGetRecipes();
  const { mutate: getByFn, data: dataBy, isSuccess } = useGetBy();
  const [data, setData] = useState(recipesData);

  const { isDarkMode } = useDarkMode();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_ON_PAGE = 6;

  const [label, setLabel] = useState("");
  const [selectedTag, setSelectedTag] = useState<tagInterface[]>([]);
  const [selectedIng, setSelectedIng] = useState<recipeIng[]>([]);

  const [tags, setTags] = useState<tagInterface[]>();
  const [ingredients, setIngredients] = useState<ingredientInterface[]>();

  useEffect(
    function () {
      if (selectedIng.length > 0 && selectedTag.length === 0) {
        getByFn({ ing: selectedIng[0].ingredient.id_skladnik, tag: undefined });
      } else if (selectedIng.length === 0 && selectedTag.length > 0) {
        getByFn({ ing: undefined, tag: selectedTag[0].id_tagu });
      } else if (selectedIng.length > 0 && selectedTag.length > 0) {
        getByFn({
          ing: selectedIng[0].ingredient.id_skladnik,
          tag: selectedTag[0].id_tagu,
        });
      }
    },
    [selectedIng, selectedTag, getByFn]
  );

  useEffect(() => {
    let recipes = recipesData;

    if (dataBy && (selectedIng.length > 0 || selectedTag.length > 0)) {
      recipes = dataBy;
    }

    if (label) {
      recipes = recipes?.filter((item: any) =>
        item.tytul.toUpperCase().includes(label.toUpperCase())
      );
    }

    recipes = recipes?.sort((a: any, b: any) => {
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

    setData(recipes);
    setTotalPages(Math.ceil(data?.length / ITEMS_ON_PAGE));
  }, [
    label,
    recipesData,
    setData,
    data?.length,
    dataBy,
    selectedIng.length,
    selectedTag.length,
  ]);

  useEffect(function () {
    axios.get("http://localhost:5000/api/ingredients").then((res) => {
      setIngredients(res.data.response);
    });

    axios.get("http://localhost:5000/api/tags").then((res) => {
      setTags(res.data.response);
    });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [label]);

  const handleChangePage = (_e: any, newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 550);
  };

  console.log(data);
  console.log(dataBy);

  return (
    <>
      <div className=" bg-bgWhite dark:bg-bgDark mt-10 py-16 min-h-screen">
        {userAuth ? (
          <div className="w-full flex justify-center items-center flex-col gap-6 md:gap-10 p-4 my-10 md:my-20">
            <p className="text-xl md:text-3xl dark:text-bgWhite">
              Masz doskonały przepis godny polecenia?
            </p>
            <p className="text-lg dark:text-bgWhite">
              Podziel się nim z innymi użytkownikami!
            </p>
            <Link
              to="/recipes/add-new"
              className="px-5 py-2 bg-main hover:bg-mainHover  rounded-full text-bgWhite tracking-wider font-medium transition-colors duration-300 text-[15px]"
            >
              Dodaj przepis
            </Link>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center flex-col gap-6 md:gap-10 p-4 my-10 md:my-20">
            <p className="text-xl md:text-3xl dark:text-bgWhite">
              Chcesz dodać swój doskonały przepis?
            </p>
            <p className="text-lg dark:text-bgWhite">
              Stwórz konto i dziel się przepisami z innymi!
            </p>
            <Link
              to="/signup"
              className="px-5 py-2 bg-main hover:bg-mainHover  rounded-full text-bgWhite tracking-wider font-medium transition-colors duration-300 text-[15px]"
            >
              Zarejestruj
            </Link>
          </div>
        )}
        <div className="py-10 bg-bgWhiteHover dark:bg-bgDarkHover">
          <div className="max-w-7xl flex flex-col lg:flex-row justify-between items-center gap-5 px-20 mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
              <div className="flex justify-center items-center gap-1">
                <p className="text-bgDark dark:text-bgWhite">Zawiera tag: </p>
                <Modal>
                  <Modal.Open opens="tag">
                    <button className="px-2 py-2 text-main uppercase transition-all duration-300 hover:text-mainHover ">
                      {selectedTag[0] ? selectedTag[0].nazwa : "tag"}
                    </button>
                  </Modal.Open>
                  <Modal.Window name="tag">
                    <AddNewTagModal
                      onCloseModal={undefined as never}
                      setRecipeTags={setSelectedTag}
                      tags={tags}
                      filter={true}
                    />
                  </Modal.Window>
                </Modal>
              </div>
              <div className="flex justify-center items-center gap-1">
                <p className="text-bgDark dark:text-bgWhite">
                  Zawiera składnik:{" "}
                </p>
                <Modal>
                  <Modal.Open opens="ing">
                    <button className="px-2 py-2 text-main uppercase transition-all duration-300 hover:text-mainHover ">
                      {selectedIng[0]
                        ? selectedIng[0].ingredient.nazwa
                        : "składnik"}
                    </button>
                  </Modal.Open>
                  <Modal.Window name="ing">
                    <AddNewIngModal
                      ingredients={ingredients}
                      onCloseModal={undefined as never}
                      setRecipeIngredients={setSelectedIng}
                      filter={true}
                    />
                  </Modal.Window>
                </Modal>
              </div>
              <div>
                <button
                  className="px-2 py-2 text-main uppercase transition-all duration-300 hover:text-mainHover "
                  onClick={() => {
                    setSelectedIng([]);
                    setSelectedTag([]);
                    setLabel("");
                    setData(recipesData);
                  }}
                >
                  Wyczyść filtry
                </button>
              </div>
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
        </div>
        {isSuccess && isLoading && !data ? (
          <div className="h-screen w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className=" flex flex-wrap  md:pt-[72px] justify-center gap-4 mx-auto max-w-7xl">
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
                        backgroundColor: `${
                          isDarkMode ? "#2b2d35" : "#f1f5f9"
                        }`,
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
      <Footer />
    </>
  );
}
