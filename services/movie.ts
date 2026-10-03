export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  tagline: string;
  genres: { id: number; name: string }[];
}

export interface Paginated<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
export interface GenreCard {
  id: number;
  name: string;
  image: string | null;
}
