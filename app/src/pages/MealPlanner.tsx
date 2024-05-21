import { useEffect, useState } from "react";
import Days from "../ui/mealPlanner/days";
import RecipeCard from "../ui/recipes/RecipeCard";
import axios from "axios";

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
        // Dodawanie kart przepisów do listy
      });
    });  
  }, [planner]);
  
  console.log("recipes",recipes);
  

  return (
    <div className="bg-bgWhite text-bgDark dark:bg-bgDark dark:text-bgWhite">
      <div className="flex justify-center">
        <Days />
      </div>
      <div className="flex justify-center">
        {/* karty przepisów */}
      </div>
    </div>
  );
}
