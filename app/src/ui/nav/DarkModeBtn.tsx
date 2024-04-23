import { MdOutlineWbSunny } from "react-icons/md";
import useDarkMode from "../../hooks/useDarkMode";
import { IoMoonOutline } from "react-icons/io5";

export default function DarkModeButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? <MdOutlineWbSunny /> : <IoMoonOutline />}
    </button>
  );
}
