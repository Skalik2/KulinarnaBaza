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
    <div className=" bg-bgWhite dark:bg-bgDark mt-10 py-16">
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
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className=" flex flex-wrap  md:pt-[72px] justify-center gap-4 mx-auto max-w-7xl">
          {data.map((item) => (
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
  );
}
