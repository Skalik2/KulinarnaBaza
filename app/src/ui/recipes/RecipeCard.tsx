interface RecipeComponent {
  imageSrc: string;
  title: string;
}

const RecipeCard = ({ imageSrc, title }: RecipeComponent) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className=" w-96 h-48 flex justify-center items-center text-white font-semibold cursor-pointer overflow-hidden"
    >
      <h1 className=" text-5xl drop-shadow-lg break-words text-center">{title}</h1>
    </div>
  );
};

export default RecipeCard;

