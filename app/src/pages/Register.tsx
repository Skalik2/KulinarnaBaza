import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../ui/FormInput";
import { Link } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen">
      <div className="h-screen w-full bg-bgWhite dark:bg-bgDark p-6 flex justify-center items-center pt-[64px]">
        <div className="flex justify-center items-center w-full h-full xl:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.4)] xl:w-[1100px] xl:h-[620px] my-auto mx-auto">
          <div className="flex flex-col justify-center items-center  h-full  w-full xl:w-1/2 ">
            <div className="flex flex-col justify-center items-center mb-7">
              <h3 className="font-semibold text-2xl xs:text-3xl text-bgDark dark:text-bgWhite">
                Create account!
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
                  label="Name"
                  error={errors?.name?.message}
                  register={register}
                />
              </div>
              <div>
                <FormInput
                  id="surname"
                  type="text"
                  label="Surname"
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
                      return "Incorrect e-mail";
                    else return true;
                  }}
                />
              </div>
              <div>
                <FormInput
                  id="password"
                  type="password"
                  label="Password"
                  error={errors?.password?.message}
                  register={register}
                  validateFunction={() => {
                    const passwordRegex = /^.{8,}$/;
                    if (!passwordRegex.test(getValues().password))
                      return "Incorrect password (min. 8 letters)";
                    else return true;
                  }}
                />
              </div>

              <div className="mb-6">
                <FormInput
                  id="passwordRep"
                  type="password"
                  label="Repeat Password"
                  error={errors?.passwordRep?.message}
                  register={register}
                  validateFunction={() => {
                    if (getValues().password !== getValues().passwordRep)
                      return "Passwords don't match";
                    else return true;
                  }}
                />
              </div>
              <button className="w-full bg-main hover:bg-mainHover py-2 text-white uppercase tracking-widest font-light rounded-full transition-all duration-300">
                submit
              </button>
            </form>
            <p className="text-sm mt-4 text-bgDark dark:text-bgWhite">
              Already a member?
              <br className="xs:hidden" />
              <span className="xs:ml-2">
                <Link
                  to="/login"
                  className="hover:text-mainHover dark:hover:text-mainHover text-main transition-colors duration-300"
                >
                  Sign In
                </Link>
              </span>
            </p>
          </div>
          <div className="hidden xl:block w-1/2 h-full ">
            {/* <PageCanvas /> */}
            <p>dupa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
