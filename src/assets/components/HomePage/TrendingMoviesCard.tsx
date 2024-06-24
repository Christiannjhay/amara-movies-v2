import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HomeHeader from "./HomeHeader";
import { Button } from "@/components/ui/button";
import PlayIcon from "@/icons/PlayIcon";
import StarIcon from "@/icons/StarIcon";
import { Card, CardContent } from "@/components/ui/card";

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

interface TopMovies {
  id: number;
  title: string;
  poster_path: string;
  genres: { id: number; name: string }[];
}

export default function TrendingMoviesCard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<TopMovies[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      const popularMoviesUrl =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      const apiKey = import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN;

      try {
        const response = await fetch(popularMoviesUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const data = await response.json();
        const popularMovies: Movie[] = data.results;

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

          movie.duration = movieDetailsData.runtime;
          movie.genres = movieDetailsData.genres.slice(0, 3);

          return movie;
        });

        const detailedMovies = await Promise.all(detailedMoviesPromises);
        setMovies(detailedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();

    const fetchTopRatedMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN;
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch top rated movies");
        }

        const data = await response.json();
        const topRatedMovies: TopMovies[] = data.results.map(
          async (movie: any) => {
            // Fetch detailed movie information to get genres
            const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`;
            const detailsResponse = await fetch(movieDetailsUrl, {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
            });

            if (!detailsResponse.ok) {
              throw new Error(`Failed to fetch details for movie ${movie.id}`);
            }

            const detailsData = await detailsResponse.json();
            const genres = detailsData.genres.slice(0, 3); // Get top 3 genres

            return {
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              backdrop_path: movie.backdrop_path,
              genres: genres,
            };
          }
        );

        const resolvedTopRatedMovies = await Promise.all(topRatedMovies);
        setTopRatedMovies(resolvedTopRatedMovies);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchTopRatedMovies();
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
        <div className="w-full absolute mt-24 z-20">
          <HomeHeader />
        </div>
      </div>
      <div className="relative ">
        <Carousel className="w-full min-h-screen z-10">
          <div className="absolute xl:top-[60%] md:top-[64%] lg:top-[66%] w-full h-[30%] z-30 ">
            <div className="relative top-7 mr-[15%]">
              <CarouselNext />
            </div>
            <div className="relative top-7 ml-[84%]">
              <CarouselPrevious />
            </div>
            <div className="mt-[1%]">
              <div>
                <h1 className="flex justify-center font-bold text-white">
                  Trending Movies
                </h1>
              </div>
              <div className="mt-2 ml-2">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-[95%]"
                >
                  <CarouselContent>
                    {topRatedMovies.map((movie) => (
                      <CarouselItem
                        key={movie.id}
                        className="md:basis-1/2 lg:basis-1/5 relative"
                      >
                        <div className="absolute inset-0 bg-black opacity-55"></div>

                        <div className="">
                          <Card
                          onClick={() => {
                            console.log("Clicked movie:", movie);
                            navigate(`/view-movie/${movie.id}`);
                            
                          }}
                            style={{
                              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              border: "none",
                              boxShadow: "none",
                              borderRadius: "20px"
                            }}
                          >
                            <CardContent className="flex justify-start items-end p-3 py-2 h-72 relative">
                              <div className="flex flex-col">
                                <span className="text-md text-white font-bold z-10 relative">
                                  {movie.title}
                                </span>
                                <h1 className="z-10 relative flex">
                                  {movie.genres.map((genre) => (
                                    <div
                                      key={genre.id}
                                      className="mr-2 text-sm md:text-base"
                                    >
                                      <span className=" text-[#ff3131]  py-1 text-sm font-bold">
                                        {genre.name}
                                      </span>
                                    </div>
                                  ))}
                                </h1>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNext className="h-20 top-[60%] left-[101%]" />
                  <CarouselPrevious className="h-20 left-[101%] top-[30%]" />
                </Carousel>
              </div>
            </div>
          </div>

          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.id}>
                <div className="w-full h-[350px] sm:h-full relative">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full max-h-screen"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="absolute bottom-2 md:bottom-2 bottom lg:bottom-18 xl:bottom-[39%] left-24 text-white w-[70%]">
                    <h1 className="text-white font-extrabold text-sm md:text-3xl lg:text-4xl">
                      {movie.title}
                    </h1>
                    <div className="flex flex-row mt-2">
                      <h1 className="text-slate-300 text-sm md:text-base">
                        {getYearFromDate(movie.release_date)}
                      </h1>
                      <h1 className="ml-2 text-slate-300 text-sm md:text-base">
                        {movie.duration}
                      </h1>
                      <h1 className="ml-1 text-slate-300 text-sm md:text-base">
                        min
                      </h1>
                      <div className="ml-3 text-sm md:text-base text-yellow-400">
                        <StarIcon />
                      </div>
                      <h1 className="ml-1 text-slate-300 text-sm md:text-base">
                        {formatVoteAverage(movie.vote_average)}
                      </h1>
                      <div className="ml-3 flex flex-row">
                        {movie.genres.map((genre) => (
                          <div
                            key={genre.id}
                            className="mr-2 text-sm md:text-base hidden md:block"
                          >
                            <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">
                              {genre.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <h2 className="lg:text-lg xl:text-xl text-white font-light mt-2 line-clamp-3 hidden md:block">
                      {movie.overview}
                    </h2>
                    <Button
                      onClick={() => {
                        console.log("Clicked movie ID:", movie.id);
                        navigate(`/view-movie/${movie.id}`);
                      }}
                      className="bg-[#FF3131] hover:bg-red-600 text-white py-3 px-4 md:px-6 md:py-6 md:mt-4 rounded-full mt-1 flex items-center"
                    >
                      <PlayIcon />
                      <h1 className="ml-2 font-normal text-xs text-white md:text-base">
                        Watch Now
                      </h1>
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
