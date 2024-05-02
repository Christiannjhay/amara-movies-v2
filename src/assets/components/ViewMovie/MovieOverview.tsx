
interface MovieDetails {
    backdrop_path: string;
    title: string;
    overview: string;
  }
  
  interface MovieOverviewProps {
    movieDetails: MovieDetails | null;
  }
  
  export default function MovieOverview({ movieDetails }: MovieOverviewProps) {
    return (
      <div className="h-fit flex justify-center">
          <h1 className="text-white text-xs sm:text-base font-light">{movieDetails?.overview}</h1>
      </div>
    );
  }
  