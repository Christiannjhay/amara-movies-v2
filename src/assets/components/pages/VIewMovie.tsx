import { useState } from "react";
import MoviePlayer from "../ViewMovie/MoviePlayer";
import MovieTitle from "../ViewMovie/MovieTitle";
import MovieOverview from "../ViewMovie/MovieOverview";

interface MovieDetails {
  backdrop_path: string;
  title: string;
  overview: string;
}

export default function ViewMovie() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  return (
    <div>
      <div>
        <MoviePlayer setMovieDetails={setMovieDetails} />
      </div>
      <div className="w-100% flex justify-center ">
        <div className="bg-black rounded-2xl mt-4 mb-4 w-[1300px] h-[450px] grid grid-cols-12">
          <div className="col-span-3 bg-red-500"></div>
          <div className="col-span-9 bg-red-700 flex flex-col">
            <div className="flex justify-start bg-slate-300 m-2">
              <MovieTitle movieDetails={movieDetails} />
            </div>
            <div className="flex justify-center bg-fuchsia-300 m-2">
              <MovieOverview movieDetails={movieDetails}/>
            </div>
            <div className="flex-grow justify-center bg-orange-500 grid grid-cols-12">
              <div className="col-span-4 bg-blue-500">

              </div>
              <div className="col-span-8 bg-yellow-200">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
