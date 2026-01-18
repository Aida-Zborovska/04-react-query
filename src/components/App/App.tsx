import toast, { Toaster } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';

const notify = () => toast.error('No movies found for your request.');
type Status = 'success' | 'empty' | 'error';

export default function App() {
  const [status, setStatus] = useState<Status>('empty');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleForm(query: string) {
    setIsLoading(true);
    try {
      const result: Movie[] = await fetchMovies(query);
      setMovies(result);
      if (result.length === 0) {
        notify();
        setStatus('empty');
      } else {
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
      setMovies([]);
      console.error(err);
    }
    setIsLoading(false);
  }
  const handleMovieClick = (movie: Movie) => setSelectedMovie(movie);
  const handleModalClose = () => setSelectedMovie(null);

  return (
    <>
      <SearchBar onSubmit={handleForm} />
      <Toaster />
      {status === 'success' && (
        <MovieGrid onSelect={handleMovieClick} movies={movies} />
      )}
      {status === 'error' && <ErrorMessage />}
      {isLoading && <Loader />}
      {selectedMovie && (
        <MovieModal onClose={handleModalClose} movie={selectedMovie} />
      )}
    </>
  );
}
