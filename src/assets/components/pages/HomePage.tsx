import { useEffect } from "react";
import TrendingMoviesCard from "../HomePage/TrendingMoviesCard";


export default function HomePage() {

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/hello`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response as JSON
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error); 
      });
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
