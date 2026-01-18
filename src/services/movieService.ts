import axios from 'axios';
import type { Movie } from '../types/movie';
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface fetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  };
  const response = await axios.get<fetchMoviesResponse>(url, options);

  return response.data.results;
}
