import { getMovieById } from "@/src/services/movie/movieDetailService";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: "comingSoon" | "nowPlaying" }>;
};

export default async function MovieDetailPage({ params, searchParams}: Props) {
  const { id } = await params;
  const { type } = await searchParams;

  const movie = await getMovieById(
    Number(id),
    type
  );
  console.log(movie, 'complete movie')
  return (
    <main className="w-full py-8">
      <div className="px-6 flex justify-center pt-8 pb-20">
        <div className="w-full max-w-275 mx-auto px-6">
          <h1>{movie.title}</h1>
        </div>
      </div>
    </main>
  );
}