import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios";
import toast from "react-hot-toast";

interface RecipeComponent {
    recipeId: number;
    userId: string | undefined;
}

export default function CalendarPlanner({recipeId, userId}: RecipeComponent) {
    const [date, setDate] = useState(new Date());

    function handleClick() {
        console.log(date);
        axios.post(`http://localhost:5000/api/mealplanner/${userId}`, {
        id_przepisu: recipeId,
        date: date
        })
        .then((res) => {
            console.log(res.data);
            toast.success("Przepis dodany do planu dnia! 🎉");
        });
        
    }
    
    return (
        <div className="bg-bgWhite text-bgDark dark:bg-bgDark dark:text-bgWhite">
        <div className="flex justify-center items-center">
            <FaCalendarAlt />
            <DatePicker
                selected={date}
                onChange={(date:any) => setDate(date)}
                className="text-center border-l-4 border-red-500 w-32 p-3 outline-none  focus:ring-0 bg-transparent bg-bgWhite dark:bg-bgDark border-none focus:outline-none text-bgDark dark:text-bgWhite px-3 py-2 rounded-md shadow-sm"
                dateFormat="dd-MM-yyyy"
            />
            <button
                className="bg-main text-bgWhite dark:text-bgWhite px-3 py-2 rounded-md shadow-sm"
                onClick={handleClick}
            >
                Dodaj
            </button>
        </div>
        </div>
    );
}
