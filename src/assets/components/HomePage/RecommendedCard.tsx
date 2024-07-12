import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export default function RecommendedCard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
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

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results);

        // Pick a random movie ID from the fetched popular movies
        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];
        const randomMovieId = randomMovie.id;

        // Fetch recommendations for the random movie ID
        const recommendationsUrl = `https://api.themoviedb.org/3/movie/${randomMovieId}/recommendations?language=en-US&page=2`;
        const recommendationsResponse = await fetch(recommendationsUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!recommendationsResponse.ok) {
          throw new Error(
            `HTTP error! Status: ${recommendationsResponse.status}`
          );
        }

        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData.results);
      } catch (error) {
        console.error("Error fetching movies or recommendations:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {recommendations.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => {
              navigate(`/view-movie/${movie.id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}
