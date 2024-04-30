import { MdOutlineWbSunny } from "react-icons/md";
import useDarkMode from "../../hooks/useDarkMode";
import { IoMoonOutline } from "react-icons/io5";

export default function DarkModeButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      className="p-2 text-2xl text-bgDark dark:text-bgWhite rounded-full transition-colors duration-300 hover:bg-bgWhiteHover dark:hover:bg-bgDarkHover"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <MdOutlineWbSunny /> : <IoMoonOutline />}
    </button>
  );
}
