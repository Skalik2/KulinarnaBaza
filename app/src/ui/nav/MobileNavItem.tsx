import React from "react";
import { Link } from "react-router-dom";

interface MobileNavItemProps {
  title: string;
  link: string;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon: React.ReactNode;
  highlight?: boolean;
}

export default function MobileNavItem({
  link,
  title,
  icon,
  onOpen,
  highlight,
}: MobileNavItemProps) {
  return (
    <Link
      to={link}
      className={`w-5/6 p-2  flex justify-start items-center gap-4 pl-5  transition-colors duration-300 ${
        highlight
          ? "text-mainHover hover:text-main"
          : "hover:text-mainHover dark:hover:text-mainHover text-bgDark dark:text-bgWhite"
      }`}
      onClick={() => onOpen(false)}
    >
      <span className="text-2xl">{icon}</span>
      {title}
    </Link>
  );
}
