import TrendingMoviesCard from "../HomePage/TrendingMoviesCard";

export default function () {
  return (
    <div className="w-full h-fit">
      <div className="flex justify-center items-center relative"></div>
      <div className="flex">
        <TrendingMoviesCard />
      </div>
    </div>
  );
}
