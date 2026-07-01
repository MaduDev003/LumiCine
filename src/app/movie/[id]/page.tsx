import MovieDetail from "@/src/features/movieDetail/movieDetail";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: "comingSoon" | "nowPlaying" }>;
};

export default async function MovieDetailPage({ params, searchParams}: Props) {
  const { id } = await params;
  const { type } = await searchParams;

 /*  const movie = await getMovieById(
    Number(id),
    type
  ); */
  
    return (<MovieDetail  />);
}