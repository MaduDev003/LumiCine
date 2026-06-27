export const endpoints = {
  movie: {
    getMovies: "/discover/movie",
    getReleaseDates: (id: number) => `/movie/${id}/release_dates`
  },
};