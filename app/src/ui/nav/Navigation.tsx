import { useEffect, useState } from "react";
import DarkModeButton from "./DarkModeBtn";
import BurgerButton from "./BurgerButton";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { LiaNewspaper } from "react-icons/lia";
import { TbArticle } from "react-icons/tb";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../../hooks/useUser";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
  const { data, isLoading } = useUser();

  useEffect(
    function () {
      // console.log(data);
      if (data) {
        setUserAuth(true);
      }
    },
    [data, isLoading]
  );

  const navigationOptions = [
    { title: "Przepisy", link: "recipes", icon: <LiaNewspaper /> },
    { title: "Artykuły", link: "articles", icon: <TbArticle /> },
    { title: "Meal Planner", link: "planner", icon: <MdOutlineEditCalendar /> },
    { title: "Ranking", link: "rank", icon: <FaRankingStar /> },
  ];

  return (
    <div className="fixed z-[100] bg-bgWhite  w-full h-16 md:h-[72px] dark:bg-bgDark flex justify-between items-center px-6 shadow-md">
      <div className="flex justify-center items-center gap-10">
        <Link
          to="/"
          className="text-bgDark dark:text-bgWhite font-fancy text-2xl md:text-3xl py-1"
        >
          KulinarnaBaza
        </Link>
        <div className="hidden lg:flex h-full justify-center items-center gap-8">
          {navigationOptions.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className="font-medium text-[15px] dark:text-bgWhite text-bgDark dark:hover:text-mainHover hover:text-mainHover transition-colors duration-300 "
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex gap-3 sm:gap-5 justify-center items-center">
        <DarkModeButton />
        <BurgerButton setOpen={setOpen} open={open} />
        <MobileNav
          setOpen={setOpen}
          open={open}
          navigationOptions={navigationOptions}
        />
        {userAuth ? (
          <div className="hidden lg:flex justify-center items-center gap-5">
            <div className="relative p-2 group">
              <p className="hover:cursor-pointer text-[15px] text-bgDark dark:text-bgWhite hover:text-mainHover dark:hover:text-mainHover transition-colors duration-300">
                {data?.imie} {data?.nazwisko}
              </p>
              <div className="absolute top-[100%] w-[170px] p-4 right-0 hidden group-hover:flex flex-col bg-bgWhite dark:bg-bgDark gap-1 shadow-lg">
                <Link
                  to="account"
                  className="text-[15px] text-bgDark dark:text-bgWhite hover:text-mainHover dark:hover:text-mainHover transition-colors duration-300 font-medium p-2"
                >
                  Konto
                </Link>
                <Link
                  to="my-recipes"
                  className="text-[15px] text-bgDark dark:text-bgWhite hover:text-mainHover dark:hover:text-mainHover transition-colors duration-300 font-medium p-2"
                >
                  Moje Przepisy
                </Link>
                <Link
                  to="favorite"
                  className="text-[15px] text-bgDark dark:text-bgWhite hover:text-mainHover dark:hover:text-mainHover transition-colors duration-300 font-medium p-2"
                >
                  Ulubione
                </Link>
                <button
                  onClick={() => {
                    axios.get("http://localhost:5000/api/logout").then(() => {
                      toast.success("Wylogowano");
                      window.location.href = "/";
                    });
                  }}
                  className="text-left text-[15px] text-red-500 hover:text-mainHover transition-colors duration-300 font-medium p-2"
                >
                  Wyloguj
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex justify-center items-center gap-5">
            <Link
              to="login"
              className="pl-3 pr-5 py-2 hover:text-mainHover dark:hover:text-mainHover dark:text-bgWhite text-bgDark tracking-wider font-medium transition-colors duration-300 text-[15px]"
            >
              Zaloguj
            </Link>
            <Link
              to="signup"
              className="px-5 py-2 bg-main hover:bg-mainHover  rounded-full text-bgWhite tracking-wider font-medium transition-colors duration-300 text-[15px]"
            >
              Zarejestruj
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
