import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetArticle(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const res = await axios.post(
        `http://localhost:5000/api/articleDetails`,
        { articleID: id },
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  return { data, isLoading };
}
