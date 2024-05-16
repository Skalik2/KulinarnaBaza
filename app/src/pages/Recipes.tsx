import RecipeCard from "../ui/recipes/RecipeCard";

export default function Recipes() {
  return (
    <div className="flex flex-wrap p-16 justify-center gap-4 dark:bg-bgDark">
      <RecipeCard imageSrc="../../images/hero.jpg" title="Przepis" />
      <RecipeCard imageSrc="../../images/hero.jpg" title="Dłuższy przepis" />
      <RecipeCard imageSrc="../../images/hero.jpg" title="Jeszcze dłuższa nazwa" />
      <RecipeCard imageSrc="../../images/hero.jpg" title="Chyba za długa nazwa tego przepisu do testu isPies 1 2 3" />
      <RecipeCard imageSrc="../../images/hero.jpg" title="Dodać wyszarzanie innych przepisów" />
      <RecipeCard imageSrc="../../images/hero.jpg" title="Gdy najedziesz na jakiś przepis" />
      <RecipeCard imageSrc="../../images/hero.jpg" title="PrzepisPrzepisPrzepis" />
      <RecipeCard imageSrc="../../images/hero.jpg" title="Polędwica wieprzowa nadziewana łososiem w otoczce z farszu z cielęciny" />
      <RecipeCard imageSrc="../../images/hero.jpg" title="btw buguje sie navbar" />
      <RecipeCard imageSrc="../../images/hero.jpg" title="Przepis" />
      <RecipeCard imageSrc="../../images/hero.jpg" title="Przepis" />

    </div>
  );
}
