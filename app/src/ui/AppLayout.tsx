import Navigation from "./nav/Navigation";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="relative overflow-x-hidden w-full h-full" id="app">
      <Navigation />
      <div className="pt-16 md:pt-[72px]">
        <Outlet />
      </div>
    </div>
  );
}
