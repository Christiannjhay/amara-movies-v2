
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
      <div className="h-fit">
          <h1 className="text-white text-md font-light">{movieDetails?.overview}</h1>
      </div>
    );
  }
  