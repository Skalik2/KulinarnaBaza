import Days from "../ui/mealPlanner/days";

export default function MealPlanner() {
  return (
    <div className=" bg-bgWhite text-bgDark dark:bg-bgDark dark:text-bgWhite flex flex-row justify-center">
      <Days />
    </div>
  );
}
