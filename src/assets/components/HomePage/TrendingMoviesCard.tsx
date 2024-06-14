import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import HomeHeader from "./HomeHeader";
import { Button } from "@/components/ui/button";
import PlayIcon from "@/icons/PlayIcon";
import StarIcon from "@/icons/StarIcon";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  duration: number;
  genres: { id: number; name: string }[];
}

export default function TrendingMoviesCard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      const popularMoviesUrl =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      const apiKey = import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN;

      try {
        // Fetch list of popular movies
        const response = await fetch(popularMoviesUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const data = await response.json();
        const popularMovies: Movie[] = data.results;

        // Fetch detailed information for each movie
        const detailedMoviesPromises = popularMovies.map(async (movie) => {
          const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=credits&language=en-US`;

          const response = await fetch(movieDetailsUrl, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          });
          const movieDetailsData = await response.json();

          // Example: Assign additional fields like duration from detailed data
          movie.duration = movieDetailsData.runtime;
          movie.genres = movieDetailsData.genres.slice(0, 3);

          return movie;
        });
        // Wait for all detailed movie fetches to complete
        const detailedMovies = await Promise.all(detailedMoviesPromises);
        setMovies(detailedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const getYearFromDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  const formatVoteAverage = (voteAverage: number): string => {
    return voteAverage.toFixed(1);
  };

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center relative">
        <div className="w-full absolute mt-24 z-10">
          <HomeHeader />
        </div>
      </div>
      <div className="flex">
        <Carousel className="w-full h-screen z-0">
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.id}>
                <div className="w-full h-[350px] sm:h-full relative">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50">
                  </div>
                  <div className="absolute bottom-2 md:bottom-10 lg:bottom-56 left-24 text-white w-[70%]">
                    <h1 className=" text-[#FFD1DC] font-extrabold text-sm md:text-4xl">
                      {movie.title}
                    </h1>
                    <div className="flex flex-row mt-2">
                        <h1 className="text-slate-300 text-sm md:text-base">{getYearFromDate(movie.release_date)}</h1>
                        <h1 className="ml-2 text-slate-300 text-sm md:text-base">{movie.duration}</h1>
                        <h1 className="ml-1 text-slate-300 text-sm md:text-base">min</h1>
                        <div className="ml-3 text-slate-300 text-sm md:text-base"><StarIcon/></div>
                        <h1 className="ml-1 text-slate-300 text-sm md:text-base">{formatVoteAverage(movie.vote_average)}</h1>
                        <div className="ml-3 flex flex-row">{movie.genres.map((genre) => (
                        <div key={genre.id} className="mr-2 text-sm md:text-base hidden md:block">
                          <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">
                            {genre.name}
                          </span>
                        </div>
                      ))}</div>
                    </div>
                    <h2 className="text-xl text-white font-light mt-2 line-clamp-3 hidden md:block">
                      {movie.overview}
                    </h2>
                    <Button 
                     onClick={() => {
                      console.log("Clicked movie ID:", movie.id);
                      navigate(`/view-movie/${movie.id}`);
                    }}
                    className="bg-[#FFD1DC] hover:bg-[#ddb8c1] text-black py-3 px-4 md:px-6 md:py-6 md:mt-4 rounded-full mt-1 flex items-center">
                      <PlayIcon />
                      <h1 className="ml-2 font-normal text-xs md:text-base">Watch Now</h1>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
