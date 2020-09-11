import React, { useReducer, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { movieList, genres } from './Const';

import './Edit.scss';

export function EditMovie() {
  const [formErrorShow, setFormErrorShow] = useState(false);
  const [submitSuccessShow, setSubmitSuccessShow] = useState(false);
  const history = useHistory();

  let { id } = useParams();
  id = Number(id) || 0;
  const isAddMovie = !id;
  const movieDetails = isAddMovie ? {} : movieList.find((movie) => movie.id === id);

  const formReducer = (movieFormState, newMovieFormState) => ({
    ...movieFormState,
    ...newMovieFormState,
  });
  const [movieFormState, dispatchInputChange] = useReducer(
    formReducer,
    movieDetails
  );

  const getMultiSelectValue = (element) => {
    const selectedOptions = Array.prototype.slice.call(element.selectedOptions);
    return selectedOptions.map((option) => option.value);
  };

  const handleInputChange = (event) => {
    const value =
      event.target.type === 'select-multiple' // switch to switch-case if condition increases
        ? getMultiSelectValue(event.target)
        : event.target.value;
    dispatchInputChange({ [event.target.name]: value });
  };

  const resetForm = () => {
    setFormErrorShow(false);
    dispatchInputChange(movieDetails);
  };

  const validateForm = () => {
    if (!movieFormState.title || !movieFormState.release_date) {
      setFormErrorShow(true);
      throw new Error('Missing form fields!');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();
    setSubmitSuccessShow(true);
    setTimeout(() => history.push('/'), 3000);
  };

  return (
    <div className="router-page router-page-common edit-movie-page content-container text-white">
      <Link to="/" className="btn header-cross-icon text-white">
        &times;
      </Link>
      <h3 className="form-title">{isAddMovie ? 'ADD' : 'EDIT'} MOVIE</h3>
      <form className="black-theme-form" autoComplete="off" onSubmit={handleSubmit}>
        {!id ? (
          ''
        ) : (
          <div className="form-group">
            <label htmlFor="id">MOVIE ID</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="id"
              defaultValue={movieFormState.id}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            className="form-control form-control-lg"
            name="title"
            value={movieFormState.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="release_date">PRELEASE DATE</label>
          <input
            type="date"
            className="form-control form-control-lg"
            name="release_date"
            value={movieFormState.release_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="movieUrl">MOVIE URL</label>
          <input
            type="text"
            className="form-control form-control-lg"
            name="movieUrl"
            value={movieFormState.movieUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genres">GENRE</label>
          <select
            multiple={true}
            className="form-control form-control-lg"
            name="genres"
            value={movieFormState.genres}
            onChange={handleInputChange}
          >
            {genres.map((genre) => (
              <option value={genre} key={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="overview">OVERVIEW</label>
          <textarea
            rows="3"
            className="form-control form-control-lg"
            name="overview"
            value={movieFormState.overview}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="runtime">RUNTIME</label>
          <input
            type="number"
            className="form-control form-control-lg"
            name="runtime"
            value={movieFormState.runtime}
            onChange={handleInputChange}
          />
        </div>
        {formErrorShow && (
          <Alert
            variant="danger"
            className="edit-movie-alert"
            onClose={() => setFormErrorShow(false)}
            dismissible
          >
            <Alert.Heading>Missing Required Fields!</Alert.Heading>
            <p>Title and Release Date is required.</p>
          </Alert>
        )}
        {submitSuccessShow && (
          <Alert
            variant="success"
            className="edit-movie-alert"
            onClose={() => setSubmitSuccessShow(false)}
            dismissible
          >
            <Alert.Heading>Success</Alert.Heading>
            <p>Your changes saved successfully. Redirecting to home page...</p>
          </Alert>
        )}
        <div className="form-footer">
          <button
            onClick={resetForm}
            type="reset"
            className="btn btn-outline-danger btn-lg"
          >
            RESET
          </button>
          <button type="submit" className="btn btn-danger btn-lg">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
