import Hero from "../ui/home/Hero";
import Carousel from "../ui/home/Carousel";
import Footer from "../ui/footer/Footer";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-bgWhite dark:bg-bgDark text-bgDark dark:text-bgWhite">
      <Hero />
      <Carousel />
      <div className="flex flex-col justify-center items-center gap-5 sm:gap-7 px-6 py-10 sm:py-16 lg:py-24 max-w-3xl mx-auto">
        <h3 className="text-3xl text-center font-medium">
          Zarejestruj się i dziel przepisami z innymi
        </h3>
        <p className="text-lg text-center">
          Stwórz konto całkowicie <span className="text-main">za darmo</span>{" "}
        </p>
        i spraw, że twój przepis już nigdy nie zginie
        <Link
          to="/signup"
          className="px-5 py-2 bg-main hover:bg-mainHover  rounded-full text-bgWhite tracking-wider font-medium transition-colors duration-300 text-[15px]"
        >
          Zarejestruj
        </Link>
      </div>
      <Footer />
    </div>
  );
}
