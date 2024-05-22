import axios from "axios";

const URL = "http://localhost:5000";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendRecipe({ obj, userId }: { obj: any; userId: string }) {
  axios
    .post(URL + "/api/recipes/" + userId, obj, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.response);
    });
}
