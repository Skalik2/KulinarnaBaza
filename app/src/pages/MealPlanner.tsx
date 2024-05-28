import { useEffect, useState } from "react";
import Days from "../ui/mealPlanner/days";
import axios from "axios";
import MealPlannerCard from "../ui/mealPlanner/mealPlannerCard";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPlannerMeals } from "../hooks/useGetPlannerMeals";
import { useGetRecipe } from "../hooks/useGetRecipe";
import Spinner from "../ui/Spinner";

export default function MealPlanner() {
  const params = useParams();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<{ id_uzytkownika: string }>(["user"]);
  const userId = user?.id_uzytkownika || null;
  const { data: recipeData, isLoading } = useGetPlannerMeals(userId);
  
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isLoading && recipeData) {
      if (recipeData.response) {
        setData(recipeData.response);
      } else {
        console.error('Response not found in recipeData');
      }
    }
  }, [isLoading, recipeData]);

  return (
    <div className="bg-bgWhite text-bgDark dark:bg-bgDark dark:text-bgWhite min-h-screen">
      <div className="flex justify-center py-4 md:py-10">
        <Days />
      </div>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {isLoading && !data && userId ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        data?.map((item: any) => (
          <MealPlannerCard
            key={userId}
            userId={userId}
            meal={item}
            data={item.data.substring(0, 10)}
          />
        ))
      )}
      </div>
    </div>
  );
}
