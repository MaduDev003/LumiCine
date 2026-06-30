export const endpoints = {
  movie: {
    getMovies: "/discover/movie",
    getById: (id: number) => `/movie/${id}`,
    getReleaseDates: (id: number) => `/movie/${id}/release_dates`,
    getCast: (id: number) => `/movie/${id}/credits`,
  },
};