import hero from '../../../images/hero.jpg'

function getWeek(): any{
  let date = new Date();
  let firstDay:any = new Date(date.getFullYear(), 0, 1);
  let today:any = new Date(date.getFullYear(),date.getMonth(), date.getDay());
  let dayOfYear = ((today - firstDay + 1) / 86400000);
  let week = Math.ceil(dayOfYear / 7);
  return week;
}

function getDayInWeek(day: number): any{
  let date = new Date();
  let firstDay:any = new Date(date.getFullYear(), 0, 1);
  let daysToAdd = (getWeek() * 7) + day - firstDay.getDay();
  firstDay.setDate(firstDay.getDate() + daysToAdd);
  return firstDay.getDate();
}

const week = [
  {
    day: "Poniedziałek",
    initial: "P",
    dateThisWeek: getDayInWeek(1)
  },
  {
    day: "Wtorek",
    initial: "W",
    dateThisWeek: getDayInWeek(2)
  },
  {
    day: "Środa",
    initial: "Ś",
    dateThisWeek: getDayInWeek(3)
  },
  {
    day: "Czwartek",
    initial: "C",
    dateThisWeek: getDayInWeek(4)
  },
  {
    day: "Piątek",
    initial: "P",
    dateThisWeek: getDayInWeek(5)
  },
  {
    day: "Sobota",
    initial: "S",
    dateThisWeek: getDayInWeek(6)
  },
  {
    day: "Niedziela",
    initial: "N",
    dateThisWeek: getDayInWeek(7)
  },
]

export default function Days() {
  return (
    <div className='text-white h-screen flex justify-center items-center w-1/3'>
      {week.map((day) => (
        <div className=' bg-main rounded-full aspect-square p-1 m-1 w-full flex justify-center items-center flex-row'>
          <p>{day.initial}</p>
          <p>{day.dateThisWeek}</p>
        </div>
      ))}
    </div>
  )
}