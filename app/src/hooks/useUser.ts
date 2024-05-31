import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUser() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/checkSession", {
        withCredentials: true,
      });
      return res.data.response;
    },
  });

  return { data, isLoading, isError };
}
