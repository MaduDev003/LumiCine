import MovieDetailPage from "@/src/features/movieDetail/movieDetailPage";
import {getMovieById} from "../../../services/movie/movieDetailService";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: "comingSoon" | "nowPlaying" }>;
};

export default async function MovieDetail({ params, searchParams}: Props) {
  const { id } = await params;
  const { type } = await searchParams;

  const movie = await getMovieById(
    Number(id),
    type
  ); 
  
    return (<MovieDetailPage  movie={movie}/>);
}