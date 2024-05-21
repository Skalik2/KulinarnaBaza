import { useQueryClient } from "@tanstack/react-query";
import RecipeCard from "../ui/recipes/RecipeCard";
import { useGetRecipes } from "../hooks/useGetRecipes";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";

export default function Recipes() {
  const queryClient = useQueryClient();
  const userAuth = queryClient.getQueryData(["user"]) !== undefined;
  const { data, isLoading } = useGetRecipes();

  console.log(data);
  return (
    <div className="flex flex-wrap py-16 md:pt-[72px] justify-center gap-4 dark:bg-bgDark mt-10">
      {userAuth && (
        <div className="w-full flex justify-center items-center flex-col gap-6 md:gap-10 p-4 my-10 md:my-20">
          <p className="text-xl md:text-3xl dark:text-bgWhite">
            Masz doskonały przepis godny polecenia?
          </p>
          <p className="text-lg dark:text-bgWhite">
            Podziel się nim z innymi użytkownikami!!!
          </p>
          <Link
            to="/recipes/add-new"
            className="px-5 py-2 bg-main hover:bg-mainHover  rounded-full text-bgWhite tracking-wider font-medium transition-colors duration-300 text-[15px]"
          >
            Dodaj przepis
          </Link>
        </div>
      )}
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {/* w linku powinno być id przepisu!!! */}
          <RecipeCard
            link="/recipes/kanapka"
            imageSrc="../../images/hero.jpg"
            title="Przepis"
          />
          <RecipeCard
            link="/recipes/chleb"
            imageSrc="../../images/hero.jpg"
            title="Dłuższy przepis"
          />
          <RecipeCard
            link="/recipes/mleko"
            imageSrc="../../images/hero.jpg"
            title="Jeszcze dłuższa nazwa"
          />
        </>
      )}
    </div>
  );
}
