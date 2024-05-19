import { useState } from "react";
import DarkModeButton from "./DarkModeBtn";
import BurgerButton from "./BurgerButton";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { LiaNewspaper } from "react-icons/lia";
import { TbArticle } from "react-icons/tb";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";

export default function Navigation() {
  const [open, setOpen] = useState(false);

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
      </div>
    </div>
  );
}
