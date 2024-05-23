import { Link } from "react-router-dom";
import { CiStopwatch } from "react-icons/ci";
import { SlEye } from "react-icons/sl";

interface RecipeComponent {
  imageSrc: string;
  title: string;
  link: string;
  time: number;
  price: number;
  views: number;
}

const RecipeCard = ({
  imageSrc,
  title,
  link,
  time,
  views,
}: RecipeComponent) => {
  return (
    <Link
      to={link}
      className=" w-96 h-80 flex flex-col justify-center items-center text-bgDark dark:text-bgWhite border border-solid border-slate-200 overflow-hidden dark:border-stone-800 rounded-lg group"
    >
      <div className="relative w-full h-full overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full h-full group-hover:scale-110 transition-transform duration-300"
        ></div>
        <div className="absolute top-0 left-0 bg-black w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
      <h3 className=" text-xl font-medium drop-shadow-lg break-words text-center py-5 px-3 ">
        {title}
      </h3>
      <div className="h-[1px] w-full bg-slate-200 dark:bg-stone-800"></div>
      <div className="p-3 w-full flex justify-between items-center text-slate-400 dark:text-zinc-500">
        <div>
          <p className="flex justify-center items-center gap-2">
            <span className="text-3xl">
              <CiStopwatch />
            </span>
            {time} min.
          </p>
        </div>
        <div>
          <p className="flex justify-center items-center gap-3">
            <span className="text-2xl">
              <SlEye />
            </span>
            {views}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
