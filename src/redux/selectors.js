import { MOVIE_LIST, DEFAULT_GENRE } from '../consts/MovieConst';

export const getMovieById = (id) => MOVIE_LIST.find((movie) => movie.id === id);

const filterMoviesByQuery = (movies, query) => {
  return !query
    ? movies
    : movies.filter((movie) => movie.title.toLowerCase().includes(query));
};

const filterMoviesByGenre = (movies, genre) => {
  return genre === DEFAULT_GENRE
    ? movies
    : movies.filter((movie) => movie.genres.includes(genre));
};

const sortMovies = (movies, sortKey) => {
  return movies.sort((obj1, obj2) => {
    let val1 = obj1[sortKey] || '';
    let val2 = obj2[sortKey] || '';
    if (Array.isArray(val1)) {
      val1 = val1.join();
      val2 = val2.join();
    }
    return val1.localeCompare(val2);
  });
};

export const getMoviesByFilter = (state) => {
  const { activeGenre, sortKey, query } = state;
  let movies = [...state.allMovies];
  movies = filterMoviesByQuery(movies, query);
  movies = filterMoviesByGenre(movies, activeGenre);
  movies = sortMovies(movies, sortKey);
  return movies;
};
