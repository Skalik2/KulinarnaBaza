import RecipeCard from "../recipes/RecipeCard";

interface RecipeComponent {
  imageSrc: string;
  title: string;
  link: string;
  data: string;
}

const MealPlannerCard = ({ imageSrc, title, link, data }: RecipeComponent) => {
  function handleClick() {
    console.log("Usuń ", title);
  }

  return (
    <div className="border-2 border-[rgb(255,48,0)]">
      <div className="filter hover:saturate-150">
        <RecipeCard
          link={link}
          imageSrc={imageSrc}
          title={title}
        />
      </div>
      <div className="px-4 flex flex-row justify-between items-center">
        <p className="text-lg">{data}</p>
        <button onClick={handleClick} key={title} className="bg-main my-4 text-bgWhite rounded-full px-5 py-2 hover:bg-mainHover transition-colors duration-300">Usuń</button>
      </div>
    </div>
  );  
};

export default MealPlannerCard;