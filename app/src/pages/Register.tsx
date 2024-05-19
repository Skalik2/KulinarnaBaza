import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../ui/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import axios from "axios";

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>();
  const { isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data.email);
    axios
      .put("http://localhost:5000/api/register", {
        email: data.email,
        password: data.password,
        name: data.name,
        lastname: data.surname,
      })
      .then((res: any) => {
        console.log(res);
        navigate("/login");
      });
  };
  return (
    <div className="w-full h-screen">
      <div className="h-screen w-full bg-bgWhite dark:bg-bgDark p-6 flex justify-center items-center pt-[64px]">
        <div className="flex justify-center items-center w-full h-full xl:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.4)] xl:w-[1100px] xl:h-[620px] my-auto mx-auto">
          <div className="flex flex-col justify-center items-center  h-full  w-full xl:w-1/2 ">
            <div className="flex flex-col justify-center items-center mb-7">
              <h3 className="font-semibold text-2xl xs:text-3xl text-bgDark dark:text-bgWhite">
                Stwórz konto!
              </h3>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 md400:gap-6 md600:gap-6 xs:w-full xs:px-10 md500:w-[450px]"
            >
              <div>
                <FormInput
                  id="name"
                  type="text"
                  label="Imię"
                  error={errors?.name?.message}
                  register={register}
                />
              </div>
              <div>
                <FormInput
                  id="surname"
                  type="text"
                  label="Nazwisko"
                  error={errors?.surname?.message}
                  register={register}
                />
              </div>
              <div>
                <FormInput
                  id="email"
                  type="email"
                  label="Email"
                  error={errors?.email?.message}
                  register={register}
                  validateFunction={() => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(getValues().email))
                      return "Niepoprawny e-mail";
                    else return true;
                  }}
                />
              </div>
              <div>
                <FormInput
                  id="password"
                  type="password"
                  label="Hasło"
                  error={errors?.password?.message}
                  register={register}
                  validateFunction={() => {
                    const passwordRegex = /^.{8,}$/;
                    if (!passwordRegex.test(getValues().password))
                      return "Niepoprawne hasło (min. 8 znaków)";
                    else return true;
                  }}
                />
              </div>

              <div className="mb-6">
                <FormInput
                  id="passwordRep"
                  type="password"
                  label="Powtórz hasło"
                  error={errors?.passwordRep?.message}
                  register={register}
                  validateFunction={() => {
                    if (getValues().password !== getValues().passwordRep)
                      return "Hasła nie są takie same";
                    else return true;
                  }}
                />
              </div>
              <button className="w-full bg-main hover:bg-mainHover py-2 text-white uppercase tracking-widest font-light rounded-full transition-all duration-300">
                Zarejestruj
              </button>
            </form>
            <p className="text-sm mt-4 text-bgDark dark:text-bgWhite">
              Masz już konto?
              <br className="xs:hidden" />
              <span className="xs:ml-2">
                <Link
                  to="/login"
                  className="hover:text-mainHover dark:hover:text-mainHover text-main transition-colors duration-300"
                >
                  Zaloguj
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
