import { ShowMoviePeriod } from "@/src/types/showMoviePeriod";

export class Movie {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly posterUrl: string,
    public readonly backdropPath: string,
    public readonly overview: string,
    public readonly genres: string[],
    public readonly ageRating: string,
    public readonly duration: string,
    public readonly showPeriod: ShowMoviePeriod,
    public readonly preSale?: boolean
  ) {}
}