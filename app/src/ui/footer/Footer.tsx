import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-col flex-wrap bg-black">
      <div className=" flex flex-col flex-wrap  mx-auto text-bgWhite justify-center items-center text-center p-10 w-full">
        <h3 className=" text-3xl mx-auto">KulinarnaBaza</h3>
        <div className="p-2">
          <p>Zarządzana przez:</p>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            <p>Oliwia Dubiel</p>
            <p>Aleksandra Bucior</p>
          </div>
        </div>
        <div className="p-2">
          <p>Stworzona przez:</p>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            <p>Karol Michoński</p>
            <p>Łukasz Michnik</p>
            <p>Mateusz Skali</p>
            <p>Szymon Jabłoński</p>
            <p>Jakub Misina</p>
            <p>Paweł Najdecki</p>
            <p>Maciej Nabożny</p>
          </div>
        </div>
        <p className="mt-4">© 2024 KulinarnaBaza - wszelkie prawa zastrzeżone</p>
      </div>
    </div>
  );
}
