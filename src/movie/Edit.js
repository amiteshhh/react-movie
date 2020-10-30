import React, { useReducer, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { MOVIE_LIST, GENRES, EMPTY_MOVIE_FORM_DATA } from '../consts/MovieConst';
import { saveMovie } from '../redux/actions';
import { getMovieById } from '../redux/selectors';

import './Edit.scss';

const mapDispatchToProps = { saveMovie };

const EditMovie = ({ saveMovie }) => {
  const [dirtyControls, setDirtyControls] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const [isFormErrorVisible, setIsFormErrorVisible] = useState(false);
  const [isSubmitSuccessVisible, setIsSubmitSuccessVisible] = useState(false);

  let { id } = useParams();
  const isAddMovie = id === 'add';
  id = Number(id); // string to numeric convrsion to match the data type with mock record
  const movieDetails = isAddMovie ? EMPTY_MOVIE_FORM_DATA : getMovieById(id);

  const getMultiSelectValue = (target) =>
    [...target.selectedOptions].map((option) => option.value);

  const handleInputChange = (event) => {
    const { target } = event;
    const value =
      target.type === 'select-multiple' // switch to switch-case if condition increases
        ? getMultiSelectValue(target)
        : target.value;

    const { id } = target;
    setDirtyControls({ ...dirtyControls, ...{ [id]: true } });
    const fieldObj = { [id]: value };
    const newState = { ...movieFormState, ...fieldObj };
    validateForm(newState);
    dispatchInputChange(fieldObj);
  };

  const resetForm = () => {
    setIsFormErrorVisible(false);
    dispatchInputChange(movieDetails);
  };

  const validateForm = (movieFormState) => {
    /// TODO: can be more generic to support different kind of validation error for a field
    /// we can create a map like `fieldConfig` for a field which can store label, error message etc.
    const errors = {};
    let isFormInvalid = false;
    const requiredFieldIds = [
      'title',
      'release_date',
      'movieUrl',
      'overview',
      'runtime',
    ];
    requiredFieldIds.forEach((id) => {
      const isFieldInvalid = !movieFormState[id];
      if (isFieldInvalid) {
        isFormInvalid = true;
        errors[id] = 'This field is required'; // a map can be createad for more specific message
      } else {
        errors[id] = isFieldInvalid;
      }
    });
    setIsFormInvalid(isFormInvalid);
    setErrors(errors);
    return isFormInvalid;
  };

  const formReducer = (movieFormState, newMovieFormState) => ({
    ...movieFormState,
    ...newMovieFormState,
  });

  const [movieFormState, dispatchInputChange] = useReducer(
    formReducer,
    movieDetails
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormInvalid) {
      setIsFormErrorVisible(true);
      return;
    }
    saveMovie(movieDetails);
    setIsSubmitSuccessVisible(true);
  };

  return (
    <div className="router-page router-page-common edit-movie-page content-container text-white">
      <Link to="/" className="btn header-cross-icon text-white">
        &times;
      </Link>
      <h3 className="form-title">{isAddMovie ? 'ADD' : 'EDIT'} MOVIE</h3>
      <form className="black-theme-form" autoComplete="off" onSubmit={handleSubmit}>
        {!isAddMovie && (
          <div className="form-group">
            <label htmlFor="id">MOVIE ID</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="id"
              defaultValue={movieFormState.id}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            autoFocus
            className="form-control form-control-lg"
            id="title"
            value={movieFormState.title}
            onChange={handleInputChange}
          />
          {dirtyControls.title && errors.title && (
            <div className="field-error-message">{errors.title}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="release_date">PRELEASE DATE</label>
          <input
            type="date"
            className="form-control form-control-lg"
            id="release_date"
            value={movieFormState.release_date}
            onChange={handleInputChange}
          />
          {dirtyControls.release_date && errors.release_date && (
            <div className="field-error-message">{errors.release_date}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="movieUrl">MOVIE URL</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="movieUrl"
            value={movieFormState.movieUrl || ''}
            onChange={handleInputChange}
          />
          {dirtyControls.movieUrl && errors.movieUrl && (
            <div className="field-error-message">{errors.movieUrl}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="genres">GENRE</label>
          <select
            multiple={true}
            className="form-control form-control-lg"
            id="genres"
            value={movieFormState.genres}
            onChange={handleInputChange}
          >
            {GENRES.map((genre) => (
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
            id="overview"
            value={movieFormState.overview}
            onChange={handleInputChange}
          />
          {dirtyControls.overview && errors.overview && (
            <div className="field-error-message">{errors.overview}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="runtime">RUNTIME</label>
          <input
            type="number"
            className="form-control form-control-lg"
            id="runtime"
            value={movieFormState.runtime}
            onChange={handleInputChange}
          />
          {dirtyControls.runtime && errors.runtime && (
            <div className="field-error-message">{errors.runtime}</div>
          )}
        </div>
        {isFormErrorVisible && (
          <Alert
            variant="danger"
            className="edit-movie-alert"
            onClose={() => setIsFormErrorVisible(false)}
            dismissible
          >
            <Alert.Heading>Invalid Form</Alert.Heading>
            <p>Kindly check the fields and fix the error.</p>
          </Alert>
        )}
        {isSubmitSuccessVisible && (
          <Alert
            variant="success"
            className="edit-movie-alert"
            onClose={() => setIsSubmitSuccessVisible(false)}
            dismissible
          >
            <Alert.Heading>Success</Alert.Heading>
            <p>Your changes saved successfully. Redirecting to home page...</p>
            <Link className="btn btn-success" to={'/'}>
              OK
            </Link>
            {/* why this as={Link} not working here even with `a` tag
            but its working fine in Card.js (Edit Details link on triple dot) */}
            {/* <button className="btn btn-success" as={Link} to={'/'}>
              OK
            </button> */}
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
          <button
            type="submit"
            className="btn btn-danger btn-lg"
            disabled={isFormInvalid}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(EditMovie);
