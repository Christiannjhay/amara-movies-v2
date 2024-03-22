
interface MovieDetails {
  backdrop_path: string;
  title: string;
}

interface MovieTitleProps {
  movieDetails: MovieDetails | null;
}

export default function MovieTitle({ movieDetails }: MovieTitleProps) {
  return (
    <div className="h-fit bg-green-500">
        <h1 className="text-white text-4xl font-bold">{movieDetails?.title}</h1>
    </div>
  );
}
