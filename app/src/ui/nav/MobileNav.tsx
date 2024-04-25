import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface MobileNavProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export default function MobileNav({ open, setOpen }: MobileNavProps) {
  const portalContainer = document.getElementById("app");

  const variants = {
    open: {
      x: 0,
    },
    hidden: {
      x: "100%",
    },
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open, portalContainer]);

  if (!portalContainer) {
    return null;
  }

  return (
    <>
      {createPortal(
        <motion.div
          animate={open ? "open" : "hidden"}
          initial="hidden"
          variants={variants}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="absolute  top-0 left-0 pt-16 bg-red-300 dark:bg-bgDark shadow-2xl w-full h-full"
        >
          nav
        </motion.div>,
        portalContainer
      )}
    </>
  );
}
