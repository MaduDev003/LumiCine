import { MoviePeriodType } from "./moviePeriodType";

export type MovieType = {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  overview: string;
  genres: string[];
  ageRating: string;
  duration: string;
  type: "comingSoon" | "nowPlaying";
  showPeriod: MoviePeriodType;
  releaseDate: string;
  preSale: boolean;
};