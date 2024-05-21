import React from "react";
import { useParams } from "react-router-dom";

export default function Recipe() {
  const params = useParams();
  console.log(params);
  //tu trzeba wykonac requesta na to id przepisu, a pozniej po prostu to wyswitlić, powodzenia
  return <div className=" py-16 md:pt-[72px]">Recipe {params.id}</div>;
}
