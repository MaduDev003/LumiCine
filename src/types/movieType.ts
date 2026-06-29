import { MoviePeriodType } from "./moviePeriodType";

export type MovieType = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  genre_ids: number[];
  age_rating: string;
  duration: string;
  showPeriod: MoviePeriodType;
  pre_sale: boolean;
}