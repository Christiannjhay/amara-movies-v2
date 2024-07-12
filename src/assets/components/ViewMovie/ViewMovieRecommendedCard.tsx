import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "../HomePage/MovieCard";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export default function ViewMovieRecommendedCard() {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      const apiKey = import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN;

      try {
        
        const recommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
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
        console.error("Error fetching recommendations:", error);
      }
    };

    if (id) {
      fetchRecommendations();
    }
  }, [id]);

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