import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useGetUserRecipes } from "../hooks/useGetUserRecipes";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: userData, isLoading: userIsLoading } = useUser();
  const { data: recipeData, isLoading: recipeIsLoading } = useGetUserRecipes(
    userData?.id
  );
  const [recipeCount, setRecipeCount] = useState(0);

  useEffect(() => {
    if (recipeData) {
      setRecipeCount(recipeData.length);
    }
  }, [recipeData]);

  if (userIsLoading || recipeIsLoading) {
    return <div>Loading...</div>;
  }

  if (!queryClient.getQueryData(["user"])) navigate("/login");
  // useEffect(
  //   function () {
  //   },
  //   [navigate, queryClient]
  // );

  return (
    <div className="pt-16 md:pt-[72px] dark:bg-bgDark flex flex-col items-center justify-center text-black dark:text-white h-screen">
      <h1 className="text-3xl font-semibold">Moje konto</h1>
      <p>
        Witaj {userData?.imie} {userData?.nazwisko}
      </p>
      <p>Opublikowałeś {recipeCount} przepisów.</p>
    </div>
  );
}
