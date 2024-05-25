import { FaRegUser, FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ArticleProps {
  imageSrc: string;
  title: string;
  author: string;
  date: string;
  link: string;
}

const Article = ({ imageSrc, title, author, date, link }: ArticleProps) => {
  return (
    <Link
      to={link}
      className=" w-full h-80 sm:h-[450px] md:h-[550px] md900:w-[800px] md900:h-[600px] flex flex-col justify-center items-center text-bgDark dark:text-bgWhite border border-solid border-slate-200 overflow-hidden dark:border-stone-800 rounded-lg group shadow-lg"
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
      <div className="p-3 sm:px-10 w-full flex justify-between items-center text-slate-400 dark:text-zinc-500">
        <div className="flex justify-center sm:justify-between items-center w-full">
          <div className=" flex items-center justify-start w-full gap-3">
            <span className="text-3xl">
              <FaRegUser className="" />
            </span>
            <div className="text-[15px]">
              <p>
                Autor: <span className="font-semibold">{author}</span>
              </p>
              <p>Opublikowano: {date}</p>
            </div>
          </div>
          <span className="text-3xl">
            <FaRegCommentDots />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Article;
