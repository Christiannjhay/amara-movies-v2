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
    <div className="h-full w-full bg-slate-600">
      <div className="h-full">
        <div>
          <MoviePlayer setMovieDetails={setMovieDetails} />
        </div>
        <div className="w-100% flex justify-center h-fit relative">
          <div className="w-full">
            {movieDetails?.poster_path ? (
              <img
                className="mb-4 rounded-2xl w-full opacity-10 sm:hidden"
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt="Movie Poster"
              />
            ) : (
              <p>PICTURE (Placeholder if needed)</p>
            )}
          </div>
          <div className="absolute max-w-full flex flex-wrap">
            <div className=" rounded-2xl mt-4 mb-4 w-[1300px] h-fit grid grid-cols-12">
              <div className="hidden col-span-3 sm:block m-2">
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
              <div className="col-span-9 flex flex-col ">
                <div className="flex justify-start m-2 ">
                  <MovieTitle movieDetails={movieDetails} />
                </div>
                <div className="flex justify-center m-2">
                  <MovieOverview movieDetails={movieDetails} />
                </div>
                <div className="flex m-2 ">
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
