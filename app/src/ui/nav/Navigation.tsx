import React from "react";
import DarkModeButton from "./DarkModeBtn";

export default function Navigation() {
  return (
    <div className="bg-bgWhite  w-full">
      <p className="text-bgWhite dark:bg-bgDark bg-bgWhite">Navigation</p>
      <DarkModeButton />
    </div>
  );
}
