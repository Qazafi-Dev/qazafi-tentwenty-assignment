import { api } from "./apiClient";
import type { GenreCard, Movie, MovieDetails, Paginated } from "./movie";

export const getMovies = (page = 1, signal?: AbortSignal) =>
  api.get<Paginated<Movie>>("/movie/popular", { page }, signal);

export const getTopRatedMovies = (page = 1, signal?: AbortSignal) =>
  api.get<Paginated<Movie>>("/movie/top_rated", { page }, signal);

export const getSearchMovies = (
  query: string,
  page = 1,
  signal?: AbortSignal,
) => api.get<Paginated<Movie>>("/search/movie", { query, page }, signal);

export const getMovieDetails = (id: number, signal?: AbortSignal) =>
  api.get<MovieDetails>(`/movie/${id}`, undefined, signal);

export const getGenres = (signal?: AbortSignal) =>
  api.get<{ genres: GenreCard[] }>("/genre/movie/list", undefined, signal);
