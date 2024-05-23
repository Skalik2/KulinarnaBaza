import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useGetBy() {
  const { mutate, data, isSuccess } = useMutation({
    mutationFn: async (tag: string, ing: string) => {
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });
  return { mutate, data, isSuccess };
}
