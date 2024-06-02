import React, { useEffect, useState, useContext } from "react";
import { GiCook } from "react-icons/gi";
import { useUser } from "../hooks/useUser";
import { useGetUserRecipes } from "../hooks/useGetUserRecipes";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import FormInput from "../ui/FormInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;
import Spinner from "../ui/Spinner";

export default function Account() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.newPassword === data.newRepPassword) {
      axios
        .patch(
          "http://localhost:5000/api/user/changePassword",
          {
            password: data.newPassword,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          window.location.href = "/";
        })
        .catch(() => {
          toast.error("Podaj poprawne dane");
        });
    }
    else{
      console.log("dosyc")
      toast.error("Hasła się nie zgadzają");
    }
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const { data: recipeData, isLoading } = useGetUserRecipes(
    userData?.id_uzytkownika
  );
  const [recipeCount, setRecipeCount] = useState(0);

  useEffect(() => {
    if (recipeData) {
      setRecipeCount(recipeData.length);
      console.log("aa")
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center dark:bg-bgDark">
        <Spinner />
      </div>
    );
  }

  if (!queryClient.getQueryData(["user"])) navigate("/login");

  return (
    <div className="pt-16 md:pt-[72px] bg-bgWhite dark:bg-bgDark flex flex-col items-center justify-around text-bgDark dark:text-bgWhite h-screen text-xl">
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-semibold">Moje konto</h1>
          <div className=" flex flex-col justify-around items-center [&>*]:py-1">
            <GiCook
              className=" text-main rounded-full border-4 border-main"
              size={60}
            />
            <p>
              Witaj {userData?.imie} {userData?.nazwisko}
            </p>
            <p>Opublikowałeś {recipeCount} przepisów.</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 md400:gap-6 md600:gap-8 xs:w-full xs:px-10 md500:w-[450px] "
          >
            <p className="text-center font-semibold">Zmień hasło</p>
            <div className="w-full">
              <div className="mb-4">
                <FormInput
                  id="oldPassword"
                  type="password"
                  label="Obecne hasło"
                  error={errors?.password?.message}
                  register={register}
                />
              </div>
              <div className="mb-4">
                <FormInput
                  id="newPassword"
                  type="password"
                  label="Nowe hasło"
                  error={errors?.password?.message}
                  register={register}
                />
              </div>
              <div className="mb-4">
                <FormInput
                  id="newRepPassword"
                  type="password"
                  label="Powtórz nowe hasło"
                  error={errors?.password?.message}
                  register={register}
                />
              </div>
            </div>
            <button className="w-full bg-main hover:bg-mainHover py-2 text-white uppercase tracking-widest font-light rounded-full transition-all duration-300">
              Zmień hasło
            </button>
          </form>
        </>
      )}
    </div>
  );
}
