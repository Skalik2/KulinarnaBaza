import { useState, useEffect } from 'react';

interface Day {
  day: string;
  initial: string;
  dateThisWeek: Date;
}

const useWeek = () => {
  const getCurrentWeekStart = (offset = 0): Date => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1) + offset * 7);
    return startOfWeek;
  };

  const getDayInWeek = (dayOffset: number, weekOffset: number): Date => {
    const startOfWeek = getCurrentWeekStart(weekOffset);
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + dayOffset);
    return day;
  };

  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [week, setWeek] = useState<Day[]>([]);

  useEffect(() => {
    setWeek([
      { day: 'Poniedziałek', initial: 'P', dateThisWeek: getDayInWeek(0, weekOffset) },
      { day: 'Wtorek', initial: 'W', dateThisWeek: getDayInWeek(1, weekOffset) },
      { day: 'Środa', initial: 'Ś', dateThisWeek: getDayInWeek(2, weekOffset) },
      { day: 'Czwartek', initial: 'C', dateThisWeek: getDayInWeek(3, weekOffset) },
      { day: 'Piątek', initial: 'P', dateThisWeek: getDayInWeek(4, weekOffset) },
      { day: 'Sobota', initial: 'S', dateThisWeek: getDayInWeek(5, weekOffset) },
      { day: 'Niedziela', initial: 'N', dateThisWeek: getDayInWeek(6, weekOffset) },
    ]);
  }, [weekOffset]);

  return { week, setWeekOffset };
};

export default function Days({ onWeekChange } : { onWeekChange: any}): JSX.Element {
  const { week, setWeekOffset } = useWeek();
  useEffect(() => {
    onWeekChange(week);
  }, [week, onWeekChange]);

  const handleWeekChange = (offset: number): void => {
    setWeekOffset((prevOffset: number) => prevOffset + offset);
  };
  return (
    <div className="text-white pt-20 flex justify-center items-center w-96 text-sm font-bold select-none">
      <button onClick={() => handleWeekChange(-1) } className=' text-2xl text-bgDark dark:text-bgWhite'>&lt;</button>
      {week.map((day) => (
        <div className=" bg-main rounded-xl aspect-square py-0.5 m-2 w-full flex justify-center items-center flex-col hover:bg-mainHover duration-300 cursor-pointer select-none">
          <p className="">{day.initial}</p>
          <p>{day.dateThisWeek.getDate()}/{day.dateThisWeek.getMonth()+1}</p>
        </div>
      ))}
      <button onClick={() => handleWeekChange(+1)} className=' text-2xl text-bgDark dark:text-bgWhite select-none'>&gt;</button>
    </div>
  );
}
