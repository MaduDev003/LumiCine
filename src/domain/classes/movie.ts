import { MoviePeriodType } from "@/src/types/moviePeriodType";
import { CastMemberType } from "@/src/types/castMemberType";
export class Movie {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly poster_url: string,
    public readonly overview: string,
    public readonly genres: string[],
    public readonly age_rating: string,
    public readonly duration: string,
    public readonly type: string,
    public readonly show_period: MoviePeriodType,
    public readonly release_date: string,
    public readonly backdrop_path?: string,
    public readonly pre_sale?: boolean,
    public readonly cast?: CastMemberType[]

  ) {}
}