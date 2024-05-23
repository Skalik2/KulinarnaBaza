import React from "react";
import { useParams } from "react-router-dom";
import { useGetRecipe } from "../hooks/useGetRecipe";

export default function Recipe() {
  const params = useParams();
  const { data, isLoading } = useGetRecipe(params.id!);
  console.log(params.id);
  console.log(data);
  //tu trzeba wykonac requesta na to id przepisu, a pozniej po prostu to wyswitlić, powodzenia
  return <div className=" py-16 md:pt-[72px]">Recipe {params.id}</div>;
}
