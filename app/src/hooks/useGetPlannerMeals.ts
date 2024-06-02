import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetPlannerMeals(id: string, dayFrom: string | undefined, dayTo: string | undefined) {
  const { data, isLoading } = useQuery({
    queryKey: ["mealplanner", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/mealplanner/${id}`, {
        params: {
          dateFrom: dayFrom,
          dateTo: dayTo,
        },
        withCredentials: true,
      });
      return res.data;
    },
  });

  return { data, isLoading };
}
