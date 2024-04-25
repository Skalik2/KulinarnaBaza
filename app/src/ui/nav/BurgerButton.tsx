import React, { Dispatch } from "react";
import { motion } from "framer-motion";

interface BurgerButtonProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export default function BurgerButton({ setOpen, open }: BurgerButtonProps) {
  return (
    <button
      className="relative h-[25.5px] w-8 outline-none group p-2"
      onClick={() => setOpen((s) => !s)}
    >
      <motion.div
        animate={open ? { rotate: "-45deg" } : { rotate: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="absolute left-0 top-0 group-hover:bg-mainHover transition-colors duration-300 bg-bgDark dark:bg-bgWhite h-[3px] w-8 rounded-lg origin-right"
      ></motion.div>
      <motion.div
        animate={
          open
            ? { scaleX: 0, translateY: "-50%" }
            : { scaleX: 1, translateY: "-50%" }
        }
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="absolute left-0 top-1/2 group-hover:bg-mainHover  transition-colors duration-300 -translate-y-1/2 bg-bgDark dark:bg-bgWhite h-[3px] w-8 rounded-lg origin-right"
      ></motion.div>
      <motion.div
        animate={open ? { rotate: "45deg" } : { rotate: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="absolute left-0 bottom-0 group-hover:bg-mainHover  transition-colors duration-300 bg-bgDark dark:bg-bgWhite h-[3px] w-8 rounded-lg origin-right"
      ></motion.div>
    </button>
  );
}
