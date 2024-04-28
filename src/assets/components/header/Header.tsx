import Logo from "./logo";
import SearchBar from "./SearchBar";
import Profile from "./Profile";


export default function Header () {
   

    return (
        <div className="w-100% h-[100px] grid grid-cols-1 bg-black sm:grid-cols-12 sm:h-[100px] sm:opacity-75">
            <div className="flex col-span-1 justify-center items-center sm:col-span-3">
                <Logo />
            </div>
            <div className="flex items-center mb-4 justify-center col-span-6 sm:mb-0">
                <SearchBar />
            </div>
            <div className="hidden col-span-3 justify-center items-center sm:flex">
                <Profile />
            </div>
        </div>
    );
}