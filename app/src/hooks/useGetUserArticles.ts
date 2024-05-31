import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetUserArticles(userId?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["userArt"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/articles/${userId}`,
        {
          withCredentials: true,
        }
      );
      return res.data.response;
    },
  });

  return { data, isLoading };
}
