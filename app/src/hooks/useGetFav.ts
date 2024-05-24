import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetFav(userId?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["userFav"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/recipes/${userId}/getfav`,
        {
          withCredentials: true,
        }
      );
      return res.data.response;
    },
  });

  return { data, isLoading };
}
