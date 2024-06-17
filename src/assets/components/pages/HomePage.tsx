import { useEffect } from "react";
import TrendingMoviesCard from "../HomePage/TrendingMoviesCard";


export default function HomePage() {

  useEffect(() => {
    fetch('https://andra-movies.vercel.app/api/hello')
      .then(response => response.text())
      .then(data => {
        console.log(data);  // Should log "Hello, World!" from the backend
      })
      .catch(error => console.error('Error:', error));
  }, []);
  
  return (
    <div className="w-full h-fit">
      <div className="flex justify-center items-center relative"></div>
      <div className="flex">
        <TrendingMoviesCard />
      </div>
    </div>
  );
}
