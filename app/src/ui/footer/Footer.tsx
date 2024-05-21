import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-col flex-wrap bg-bgWhite dark:bg-bgDark">
      <div className=" flex flex-col flex-wrap bg-bgWhite mx-auto text-bgDark dark:bg-bgDark dark:text-bgWhite justify-center items-center text-center p-10 w-full">
        <h1 className=" text-3xl mx-auto">KulinarnaBaza</h1>
        <div className="p-2">
          <p>Zarządzana przez:</p>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            <h1>Oliwia Dubiel</h1>
            <h1>Aleksandra Bucior</h1>
          </div>
        </div>
        <div className="p-2">
          <p >Stworzona przez:</p>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            <h1>Karol Michoński</h1>
            <h1>Łukasz Michnik</h1>
            <h1>Mateusz Skali</h1>
            <h1>Szymon Jabłoński</h1>
            <h1>Jakub Misina</h1>
            <h1>Paweł Najdecki</h1>
            <h1>Maciej Nabożny</h1>
          </div>
        </div>
      </div>
      <div className=" bg-black text-white flex justify-between p-4">
        <p>Copyright ©</p>
        <ul className="flex flex-row [&>*]:px-2">
          <Link to={"recipes"}>Przepisy</Link>
          <Link to={"articles"}>Artykuły</Link>
          <Link to={"rank"}>Ranking</Link>
        </ul>
      </div>
    </div>
  );
}
