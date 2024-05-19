import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetRecipes() {
  const { data, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/recipes", {
        withCredentials: true,
      });
      return res.data.response;
    },
  });

  return { data, isLoading };
}
