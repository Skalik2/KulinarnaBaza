import React, { useState } from "react";
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
    <div className="relative z-[100] bg-bgWhite  w-full h-16 dark:bg-bgDark flex justify-between items-center px-6 shadow-md">
      <Link
        to="/"
        className="text-bgDark dark:text-bgWhite font-fancy text-2xl py-1"
      >
        KulinarnaBaza
      </Link>
      <div className="flex gap-3 justify-center items-center">
        <DarkModeButton />
        <BurgerButton setOpen={setOpen} open={open} />
        <MobileNav
          setOpen={setOpen}
          open={open}
          navigationOptions={navigationOptions}
        />
      </div>
    </div>
  );
}
