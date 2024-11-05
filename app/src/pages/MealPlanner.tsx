import { useEffect, useState, useCallback } from "react";
import Days from "../ui/mealPlanner/days";
import MealPlannerCard from "../ui/mealPlanner/mealPlannerCard";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPlannerMeals } from "../hooks/useGetPlannerMeals";
import Spinner from "../ui/Spinner";

export default function MealPlanner() {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<{ id_uzytkownika: string }>(["user"]);
  const userId: any = user?.id_uzytkownika || null;
  let today = new Date();
  today.setDate(today.getDate());
  let todayAfterWeek = new Date();
  todayAfterWeek.setDate(today.getDate() + 7);
  let tempDateFromStringToday = today.getFullYear() + "-" + ((today.getMonth()+1 <= 9) ? "0" : "" ) + (today.getMonth()+1) + "-" + ((today.getDate() <= 9) ? "0" : "" ) + today.getDate();
  let tempDateToStringToday = todayAfterWeek.getFullYear() + "-" + ((todayAfterWeek.getMonth()+1 <= 9) ? "0" : "" ) + (todayAfterWeek.getMonth()+1) + "-" + ((todayAfterWeek.getDate() <= 9) ? "0" : "" ) + todayAfterWeek.getDate();

  const [dayFrom, setdayFrom] = useState(tempDateFromStringToday);
  const [dayTo, setdayTo] = useState(tempDateToStringToday);
  const { data: recipeData, isLoading, refetch, isRefetching, isRefetchError } = useGetPlannerMeals(userId, dayFrom, dayTo);

  const handleWeekChange = useCallback((weekData: any) => {
    let tempDateFrom = new Date(weekData[0]?.dateThisWeek?.toISOString().split('T')[0]);
    let tempDateTo = new Date(weekData[6]?.dateThisWeek?.toISOString().split('T')[0]);
    tempDateFrom.setDate(tempDateFrom.getDate() + 1);
    tempDateTo.setDate(tempDateTo.getDate() + 1);
    let tempDateFromString = tempDateFrom.getFullYear() + "-" + ((tempDateFrom.getMonth()+1 <= 9) ? "0" : "" ) + (tempDateFrom.getMonth()+1) + "-" + ((tempDateFrom.getDate() <= 9) ? "0" : "" ) + tempDateFrom.getDate();
    let tempDateToString = tempDateTo.getFullYear() + "-" + ((tempDateTo.getMonth()+1 <= 9) ? "0" : "" ) + (tempDateTo.getMonth()+1) + "-" + ((tempDateTo.getDate() <= 9) ? "0" : "" ) + tempDateTo.getDate();
    setdayFrom(tempDateFromString);
    setdayTo(tempDateToString);
    queryClient.invalidateQueries({ queryKey: ["mealplanner", userId] });
  }, [queryClient, userId]);

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
        <Days onWeekChange={handleWeekChange} />
      </div>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {isLoading && !data && userId ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        data?.map((item: any) => {
          return <MealPlannerCard
            key={item.id_przepisu}
            userId={userId}
            meal={item}
            data={item.data.substring(0, 10)}
          />
        })
      )}
      </div>
    </div>
  );
}
