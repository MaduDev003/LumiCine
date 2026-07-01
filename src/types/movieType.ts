import { MoviePeriodType } from "./moviePeriodType";
import { CastMemberType } from "./castMemberType";

export type MovieType = {
  id: number;
  title: string;
  poster_url: string;
  backdrop_url: string;
  overview: string;
  genres: string[];
  age_rating: string;
  duration: string;
  type: "comingSoon" | "nowPlaying";
  show_period: MoviePeriodType;
  release_date: string;
  pre_sale: boolean | undefined;
  cast: Array<CastMemberType>
};