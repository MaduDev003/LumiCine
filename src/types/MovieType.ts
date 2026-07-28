import { MoviePeriod } from "./MoviePeriodType";
import { CastMember } from "./CastMemberType";

export type Movie = {
  id: number;
  title: string;
  poster_url: string;
  backdrop_url: string;
  overview: string;
  genres: string[];
  age_rating: string;
  duration: string;
  type: "comingSoon" | "nowPlaying";
  show_period: MoviePeriod;
  release_date: string;
  pre_sale: boolean | undefined;
  room: number,
  cast: Array<CastMember>
};