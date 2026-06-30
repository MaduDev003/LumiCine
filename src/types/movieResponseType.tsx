import { CastMemberType } from "./castMemberType";
import { MoviePeriodType } from "./moviePeriodType";

export type MovieResponseType = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  genre_ids: number[];
  age_rating: string;
  duration: string;
  type: "comingSoon" | "nowPlaying";
  show_period: MoviePeriodType;
  release_date: string;
  cast: CastMemberType[];
  pre_sale?: boolean;
};