
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function TrendingMoviesCard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results as Movie[]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-1 mx-10">
      {movies.map((movie: Movie) => (
        <button
          key={movie.id}
          className="text-white bg-transparent rounded-lg p-2 hover:transform hover:text-red-500 hover:scale-105 transition duration-300"
          onClick={() => {
            console.log("Clicked movie ID:", movie.id);
            navigate(`/view-movie/${movie.id}`);
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-md mb-2"
          />
          <h2 className="text-sm font-bold font-sans mb-1">{movie.title}</h2>
        </button>
      ))}
    </div>
  );
}
