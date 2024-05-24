import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useAddFavorite() {
  const querClient = useQueryClient();
  const user: { id_uzytkownika: string } | undefined = querClient.getQueryData([
    "user",
  ]);
  const userId = user?.id_uzytkownika;

  const { mutate: addFav } = useMutation({
    mutationFn: async ({ recipeId }: { recipeId: number }) => {
      const res = await axios.put(
        `http://localhost:5000/api/recipes/${userId}/${recipeId}`,
        {
          withCredentials: true,
        }
      );
      return res.data.response;
    },
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ["userFav"] });
      toast.success("Przepis został dodany do ulubionych!");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Coś poszło nie tak");
    },
  });

  return { addFav };
}
