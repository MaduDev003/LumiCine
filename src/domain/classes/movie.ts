import { MoviePeriodType } from "@/src/types/moviePeriodType";

export class Movie {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly posterUrl: string,
    public readonly overview: string,
    public readonly genres: string[],
    public readonly ageRating: string,
    public readonly duration: string,
    public readonly type: string,
    public readonly showPeriod: MoviePeriodType,
    public readonly releaseDate: string,
    public readonly backdropPath?: string,
    public readonly preSale?: boolean

  ) {}
}