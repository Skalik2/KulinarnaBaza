import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetPlannerMeals(id: string, dayFrom: string, dayTo: string) {
  const { data, isLoading, refetch, isRefetching, isRefetchError } = useQuery({
    queryKey: ["mealplanner", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/mealplanner/${id}/${dayFrom}/${dayTo}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  return { data, isLoading, refetch, isRefetching, isRefetchError};
}
