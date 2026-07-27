"use client"

import { createContext, useContext, useState } from "react";
import type { Movie } from "@/src/types/MovieType";

type MovieContextType = {
  nowPlayingMoviesData: Movie[];
  setNowPlayingMoviesData: React.Dispatch<React.SetStateAction<Movie[]>>;

  comingSoonMoviesData: Movie[];
  setComingSoonMoviesData: React.Dispatch<React.SetStateAction<Movie[]>>;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState<Movie[]>([]);
  const [comingSoonMoviesData, setComingSoonMoviesData] = useState<Movie[]>([]);

  const value: MovieContextType = {
    nowPlayingMoviesData,
    setNowPlayingMoviesData,
    comingSoonMoviesData,
    setComingSoonMoviesData,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }

  return context;
}