import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import MobileNavItem from "./MobileNavItem";
import { FaRegUser } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { RiUserAddLine } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";

type navOption = {
  title: string;
  link: string;
  icon: React.ReactNode;
};

interface MobileNavProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  navigationOptions: navOption[];
}

export default function MobileNav({
  open,
  setOpen,
  navigationOptions,
}: MobileNavProps) {
  const portalContainer = document.getElementById("app");
  const userAuth = false; //cza to bedzei zmieniccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc

  const variants = {
    open: {
      x: 0,
    },
    hidden: {
      x: "100%",
    },
  };

  // useEffect(() => {
  //   if (open) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [open, portalContainer]);

  if (!portalContainer) {
    return null;
  }

  return (
    <>
      {createPortal(
        <>
          <motion.div
            animate={open ? "open" : "hidden"}
            initial="hidden"
            variants={variants}
            transition={{ ease: "easeInOut", duration: 0.1 }}
            className=" fixed  top-0 right-0 pt-16 w-full h-full lg:hidden "
            onClick={() => setOpen(false)}
          ></motion.div>
          <motion.div
            animate={open ? "open" : "hidden"}
            initial="hidden"
            variants={variants}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            className="fixed  top-0 right-0 pt-16 w-[280px] h-full lg:hidden"
          >
            <div className="h-full pt-10 flex flex-col justify-start items-center gap-5 bg-bgWhite dark:bg-bgDark shadow-2xl ">
              {userAuth ? (
                <>
                  <MobileNavItem
                    icon={<FaRegUser />}
                    link="account"
                    onOpen={setOpen}
                    title="Konto"
                  />
                  <MobileNavItem
                    icon={<FaPen />}
                    link="my-recipes"
                    onOpen={setOpen}
                    title="Moje Przepisy"
                  />
                  <MobileNavItem
                    icon={<MdFavoriteBorder />}
                    link="favorite"
                    onOpen={setOpen}
                    title="Ulubione"
                  />
                  <div className="w-5/6 h-[1px] bg-bgWhiteHover dark:bg-bgDarkHover"></div>
                </>
              ) : (
                <>
                  <MobileNavItem
                    icon={<RiUserAddLine />}
                    link="signup"
                    onOpen={setOpen}
                    title="Zarejestruj"
                    highlight
                  />
                  <MobileNavItem
                    icon={<CiLogin />}
                    link="login"
                    onOpen={setOpen}
                    title="Zaloguj"
                  />
                  <div className="w-5/6 h-[1px] bg-bgWhiteHover dark:bg-bgDarkHover"></div>
                </>
              )}
              {navigationOptions.map((item) => (
                <MobileNavItem
                  link={item.link}
                  title={item.title}
                  onOpen={setOpen}
                  icon={item.icon}
                />
              ))}
            </div>
          </motion.div>
        </>,
        portalContainer
      )}
    </>
  );
}
