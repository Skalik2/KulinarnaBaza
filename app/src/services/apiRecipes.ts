/* eslint-disable @typescript-eslint/no-explicit-any */
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function modifyRecipe({
  obj,
  recipeId,
}: {
  obj: any;
  recipeId: string;
}) {
  axios
    .patch(URL + "/api/recipes/" + recipeId, obj, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.response);
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendArticle({ obj, userId }: { obj: any; userId: string }) {
  axios
    .post(URL + "/api/articles/" + userId, obj, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.response);
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function modifyArticle({
  obj,
  articleId,
}: {
  obj: any;
  articleId: string;
}) {
  axios
    .patch(URL + "/api/articles/" + articleId, obj, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.response);
    });
}
