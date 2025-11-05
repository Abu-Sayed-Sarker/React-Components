import { Outlet } from "react-router-dom";
import CarouselPage from "../Pages/Carousel/CarouselPage";
import Selectors from "../Pages/Selector/Selectors";
import Main from "../Pages/Calender/Main";

export default function Dashboard() {
  return (
    <div>
      <CarouselPage />
      <Selectors />
      <Main />
      <Outlet />
    </div>
  );
}
