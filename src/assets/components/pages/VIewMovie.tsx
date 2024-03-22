import { useState } from "react";
import MoviePlayer from "../ViewMovie/MoviePlayer";
import MovieTitle from "../ViewMovie/MovieTitle";

interface MovieDetails {
  backdrop_path: string;
  title: string;
}

export default function ViewMovie() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  return (
    <div>
      <div>
        <MoviePlayer setMovieDetails={setMovieDetails} />
      </div>
      <div className="w-100% flex justify-center">
        <div className="bg-black rounded-2xl mt-4 mb-4 w-[1300px] h-[400px] grid grid-cols-12">
          <div className="col-span-4 bg-red-500">

          </div>
          <div className="col-span-8 bg-red-700">
            <div className="flex justify-center bg-slate-300">
              <MovieTitle movieDetails={movieDetails} />
            </div>
            <div className="flex justify-center bg-fuchsia-300">
              <p>
                After an amazing first date, Bea and Ben's fiery attraction
                turns ice-cold--until they find themselves unexpectedly reunited
                at a wedding in Australia. So they do what any two mature adults
                would do: pretend to be a couple.
              </p>
            </div>
            <div className="flex flex-grow justify-center bg-orange-500">
              <p>asdasdaskdajhsdkj</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
