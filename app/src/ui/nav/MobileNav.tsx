import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import MobileNavItem from "./MobileNavItem";
import { FaRegUser } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { RiUserAddLine } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";

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
  const [userAuth, setUserAuth] = useState(false);

  useEffect(function () {
    axios
      .get("http://localhost:5000/api/checkSession", {
        withCredentials: true,
      })
      .then((res: any) => {
        console.log(res);
        setUserAuth(res.status === 200);
      });
  }, []);

  const variants = {
    open: {
      x: 0,
    },
    hidden: {
      x: "100%",
    },
  };

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
                  key={item.link}
                  link={item.link}
                  title={item.title}
                  onOpen={setOpen}
                  icon={item.icon}
                />
              ))}
              {userAuth && (
                <>
                  <div className="w-5/6 h-[1px] bg-bgWhiteHover dark:bg-bgDarkHover"></div>
                  <button
                    onClick={() => {
                      axios.get("http://localhost:5000/api/logout").then(() => {
                        toast.success("Wylogowano");
                        window.location.href = "/";
                      });
                    }}
                    className="text-left text-[15px] text-red-500 hover:text-mainHover transition-colors duration-300 font-medium p-4"
                  >
                    Wyloguj
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>,
        portalContainer
      )}
    </>
  );
}
