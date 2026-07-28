import { CastMember } from "./CastMemberType";
import { MoviePeriod } from "./MoviePeriodType";

export type MovieResponse = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  genre_ids: number[];
  age_rating: string;
  duration: string;
  type: "comingSoon" | "nowPlaying";
  show_period: MoviePeriod;
  release_date: string;
  cast: CastMember[];
  pre_sale?: boolean;
};