import { useState } from "react";
import MoviePlayer from "../ViewMovie/MoviePlayer";
import MovieTitle from "../ViewMovie/MovieTitle";
import MovieOverview from "../ViewMovie/MovieOverview";
import MovieDetails from "../ViewMovie/MovieDetails";

interface MovieDetails {
  backdrop_path: string;
  title: string;
  overview: string;
  id: number;
  poster_path: string;
}

export default function ViewMovie() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  return (
    <div className="">
      <div className="h-[100%] bg-[#181818]">
        <div>
          <MoviePlayer setMovieDetails={setMovieDetails} />
        </div>
        <div className="w-100% flex justify-center h-fit">
          <div className=" rounded-2xl mt-4 mb-4 w-[1300px] h-fit grid grid-cols-12">
            <div className="hidden col-span-3 sm:block ">
              <div className="mr-4]">
                {movieDetails?.poster_path ? (
                  <img
                    className="mb-4 rounded-2xl"
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    alt="Movie Poster"
                  />
                ) : (
                  <p>PICTURE (Placeholder if needed)</p>
                )}
              </div>
            </div>
            <div className="col-span-9 flex flex-col">
              <div className="flex justify-start m-2">
                <MovieTitle movieDetails={movieDetails} />
              </div>
              <div className="flex justify-center m-2">
                <MovieOverview movieDetails={movieDetails} />
              </div>
              <div className="flex-grow justify-center grid grid-cols-12">
                <div className="col-span-2 ml-2">
                  <div className="mt-1">
                    <p className="text-red-500 text-xs sm:text-base">Counrty:</p>
                  </div>
                  <div className="mt-1">
                    <p className="text-red-500 text-xs sm:text-base">Genre:</p>
                  </div>
                  <div className="mt-1">
                    <p className="text-red-500 text-xs sm:text-base">Release:</p>
                  </div>
                  <div className="mt-1">
                    <p className="text-red-500 text-xs sm:text-base">Director:</p>
                  </div>
                  <div className="mt-1">
                    <p className="text-red-500 text-xs sm:text-base">Production:</p>
                  </div>
                  <div className="mt-1">
                    <p className="text-red-500 text-xs sm:text-base">Cast:</p>
                  </div>
                </div>
                <div className="col-span-10">
                  <MovieDetails movieDetails={movieDetails} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
