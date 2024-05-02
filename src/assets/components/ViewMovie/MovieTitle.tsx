
interface MovieDetails {
  title: string;
}

interface MovieTitleProps {
  movieDetails: MovieDetails | null;
}

export default function MovieTitle({ movieDetails }: MovieTitleProps) {
  return (
    <div className="h-fit">
        <h1 className="text-[#FFD1DC] text-md sm:text-4xl font-bold ml-5">{movieDetails?.title}</h1>
    </div>
  );
}
