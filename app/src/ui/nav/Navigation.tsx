import React, { useState } from "react";
import DarkModeButton from "./DarkModeBtn";
import BurgerButton from "./BurgerButton";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const navigationOptions = {};

  return (
    <div className="relative z-[100] bg-bgWhite  w-full h-16 dark:bg-bgDark flex justify-between items-center px-6">
      <Link
        to="/"
        className="text-bgDark dark:text-bgWhite font-fancy text-2xl py-1"
      >
        KulinarnaBaza
      </Link>
      <div className="flex gap-3 justify-center items-center">
        <DarkModeButton />
        <BurgerButton setOpen={setOpen} open={open} />
        <MobileNav setOpen={setOpen} open={open} />
      </div>
    </div>
  );
}
