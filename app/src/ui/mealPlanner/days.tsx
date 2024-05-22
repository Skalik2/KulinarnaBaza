import { useState, useEffect } from 'react';

interface Day {
  day: string;
  initial: string;
  dateThisWeek: Date;
}

const useWeek = () => {
  const getWeek = (offset: number = 0): number => {
    const date: Date = new Date();
    const firstDay: any = new Date(date.getFullYear(), 0, 1);
    const today: any = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayOfYear: number = ((today - firstDay as unknown as number) / 86400000) + 1;
    return Math.ceil((dayOfYear + (offset * 7)) / 7);
  };

  const getDayInWeek = (day: number, weekOffset: number): Date => {
    const date: Date = new Date();
    const firstDay: Date = new Date(date.getFullYear(), 0, 1);
    const daysToAdd: number = (getWeek(weekOffset) * 7) + day - firstDay.getDay();
    firstDay.setDate(firstDay.getDate() + daysToAdd);
    return firstDay;
  };

  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [week, setWeek] = useState<Day[]>([]);

  useEffect(() => {
    setWeek([
      { day: 'Poniedziałek', initial: 'P', dateThisWeek: getDayInWeek(1, weekOffset) },
      { day: 'Wtorek', initial: 'W', dateThisWeek: getDayInWeek(2, weekOffset) },
      { day: 'Środa', initial: 'Ś', dateThisWeek: getDayInWeek(3, weekOffset) },
      { day: 'Czwartek', initial: 'C', dateThisWeek: getDayInWeek(4, weekOffset) },
      { day: 'Piątek', initial: 'P', dateThisWeek: getDayInWeek(5, weekOffset) },
      { day: 'Sobota', initial: 'S', dateThisWeek: getDayInWeek(6, weekOffset) },
      { day: 'Niedziela', initial: 'N', dateThisWeek: getDayInWeek(7, weekOffset) },
    ]);
  }, [weekOffset]);

  return { week, setWeekOffset };
};

export default function Days() {
  const { week, setWeekOffset } = useWeek();
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
