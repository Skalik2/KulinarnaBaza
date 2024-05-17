import { FaRegUser, FaRegCommentDots } from "react-icons/fa";

interface ArticleProps {
  imageSrc: string;
  title: string;
  author: string;
  date: string;
}

const Article = ({ imageSrc, title, author, date }: ArticleProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" sm:w-[800px] aspect-[5/3] flex justify-end flex-col flex-wrap text-white cursor-pointer px-32 py-4 m-2 rounded-md drop-shadow-lg"
    >
      <h1 className=" text-5xl drop-shadow-lg break-words text-center font-semibold">
        {title}
      </h1>
      <div className="flex justify-between items-center m-2">
        <div className=" flex items-center justify-center">
          <FaRegUser size={30} className=""/>
          <div className=" w-72 mx-4">
            <h1>Autor: <span className=" hover:underline">{author}</span></h1>
            <h2>Opublikowano: {date}</h2>
          </div>
        </div>
        <FaRegCommentDots size={30}/>
      </div>
    </div>
  );
};

export default Article;
