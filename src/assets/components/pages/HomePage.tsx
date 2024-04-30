import TrendingLabel from "../HomePage/TrendingLabel";
import TrendingMoviesCard from "../HomePage/TrendingMoviesCard";

export default function () {
  return (
    <div className="w-full h-fit ">
      <div className="flex justify-center items-center">
          <TrendingLabel />
      </div>
      <div className="flex">
        <TrendingMoviesCard />
      </div>
    </div>
  );
}
