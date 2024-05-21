import { PulseLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <PulseLoader color="#ff3000" />
    </div>
  );
}
