import { useQueryClient } from "@tanstack/react-query";
import Article from "../ui/article/Article";
import { Link } from "react-router-dom";

export default function Articles() {
  const queryClient = useQueryClient();
  const userAuth = queryClient.getQueryData(["user"]) !== undefined;

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
      <div className=" flex flex-wrap justify-center items-center gap-10 mx-auto max-w-7xl sm:p-6">
        <Article
          imageSrc="../../images/hero.jpg"
          title="Pierwszy przepis duży"
          author="Karol"
          date="17-05-2024"
        />
        <Article
          imageSrc="../../images/hero.jpg"
          title="Pierwszy"
          author="Mateusz"
          date="16-05-2024"
          // link={`/articles/${item.id_artykulu}/${item.tytul.replace(
          //   /\s+/g,
          //   "-"
          // )}`}
        />
        <Article
          imageSrc="../../images/hero.jpg"
          title="Pierwszy przepis duży"
          author="Łukasz"
          date="18-05-2024"
        />
      </div>
    </div>
  );
}
