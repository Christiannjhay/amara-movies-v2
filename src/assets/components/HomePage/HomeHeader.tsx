import { Link } from "react-router-dom";
import Logo from "../header/logo";
import HomeSearchBar from "./HomeSearchBar";


export default function HomeHeader() {
  return (
    <div className="w-100% h-[150px] grid grid-cols-1 sm:grid-cols-12 sm:h-[100px] ">
      <div className="flex col-span-1 justify-center items-center mt-4 sm:col-span-3">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center mb-4 justify-center col-span-6 sm:mb-0">
        <HomeSearchBar />
      </div>
      <div className="hidden col-span-3 justify-center items-center sm:flex"></div>
    </div>
  );
}
