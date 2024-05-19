import React, { useContext } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../ui/FormInput";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const { isDarkMode } = useContext(DarkModeContext);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    axios
      .post(
        "http://localhost:5000/api/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res: any) => {
        console.log(res);
        window.location.href = "/";
      });
  };
  return (
    <div className="w-full h-screen">
      <div className="h-full w-full bg-bgWhite dark:bg-bgDark p-6 flex justify-center items-center pt-[64px]">
        <div className="flex justify-center items-center  w-full h-full xl:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.4)] xl:w-[1100px] xl:h-[600px] my-auto mx-auto">
          <div className="flex flex-col justify-center items-center  h-full w-full xl:w-1/2 ">
            <div className="flex flex-col justify-center items-center gap-4 mb-10 dark:text-bgWhite text-bgDark">
              <h3 className="font-semibold text-3xl sm:text-4xl">
                Zacznij gotować!
              </h3>
              <p className="text-lg">Zaloguj się na swoje konto</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 md400:gap-6 md600:gap-8 xs:w-full xs:px-10 md500:w-[450px] "
            >
              <div className="w-full">
                <FormInput
                  id="email"
                  type="email"
                  label="Email"
                  error={errors?.email?.message}
                  register={register}
                />
              </div>
              <div className="mb-6">
                <FormInput
                  id="password"
                  type="password"
                  label="Hasło"
                  error={errors?.password?.message}
                  register={register}
                />
              </div>
              <button className="w-full bg-main hover:bg-mainHover py-2 text-white uppercase tracking-widest font-light rounded-full transition-all duration-300">
                Zaloguj
              </button>
            </form>
            <p className="text-sm mt-4 text-bgDark dark:text-bgWhite">
              Nie masz jeszcze konta?
              <br className="xs:hidden" />
              <span className="xs:ml-2">
                <Link
                  to="/signup"
                  className="hover:text-mainHover dark:hover:text-mainHover text-main transition-colors duration-300"
                >
                  Zarejestruj
                </Link>
              </span>
            </p>
          </div>
          <div className="hidden xl:block w-1/2 h-full ">
            {isDarkMode ? (
              <div className="bg-cockingBgDark w-full h-full bg-cover bg-center" />
            ) : (
              <div className="bg-cockingBgWhite w-full h-full bg-cover bg-center" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
