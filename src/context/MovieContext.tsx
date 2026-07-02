"use client"

import { createContext, useContext, useState } from "react";
import type { MovieType } from "@/src/types/movieType";

type MovieContextType = {
  nowPlayingMoviesData: MovieType[];
  setNowPlayingMoviesData: React.Dispatch<React.SetStateAction<MovieType[]>>;

  comingSoonMoviesData: MovieType[];
  setComingSoonMoviesData: React.Dispatch<React.SetStateAction<MovieType[]>>;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState<MovieType[]>([]);
  const [comingSoonMoviesData, setComingSoonMoviesData] = useState<MovieType[]>([]);

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