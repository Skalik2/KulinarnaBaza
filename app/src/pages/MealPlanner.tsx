import { useEffect, useState } from "react";
import Days from "../ui/mealPlanner/days";
import axios from "axios";
import MealPlannerCard from "../ui/mealPlanner/mealPlannerCard";

export default function MealPlanner() {
  const [planner, setPlanner] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const userId = 34;

  useEffect(function () {
    axios.get(`http://localhost:5000/api/mealplanner/${userId}`).then((res) => {
      setPlanner(res.data.response);
    });
  }, []);

  useEffect(function () {
    planner.forEach(element => {
      axios.get(`http://localhost:5000/api/recipes/${element.id_przepisu}`).then((res) => {
        console.log(res.data)
        // Dodawanie kart przepisów do listy [ moze react querry bedzie lepszy]
      });
    });  
  }, [planner]);
  
  console.log("recipes",recipes);
  

  return (
    <div className="bg-bgWhite text-bgDark dark:bg-bgDark dark:text-bgWhite min-h-screen">
      <div className="flex justify-center py-4 md:py-10">
        <Days />
      </div>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {/* Wypisywanie zmapowanych przepisów z bazy*/}
        <MealPlannerCard
              link="/recipes/kanapka"
              imageSrc="../../images/hero.jpg"
              title="Kurczak z ryżem"
              data="25.05.2024"
            />
        <MealPlannerCard
          link="/recipes/kanapka"
          imageSrc="../../images/hero.jpg"
          title="Pierogi z mięsem"
          data="25.05.2024"
        />
        <MealPlannerCard
          link="/recipes/kanapka"
          imageSrc="../../images/hero.jpg"
          title="Kanapka z serem"
          data="25.05.2024"
        />
      </div>
    </div>
  );
}
