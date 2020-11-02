import React, { useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GENRES, EMPTY_MOVIE_FORM_DATA } from '../consts/MovieConst';
import { saveMovie } from '../redux/actions';
import { getMovieById } from '../redux/selectors';

import './Edit.scss';

const mapDispatchToProps = { saveMovie };

const EditMovie = ({ saveMovie }) => {
  const [isFormErrorVisible, setIsFormErrorVisible] = useState(false);
  const [isSubmitSuccessVisible, setIsSubmitSuccessVisible] = useState(false);

  let { id } = useParams();
  const isAddMovie = id === 'add';
  id = Number(id); // string to numeric convrsion to match the data type with mock record
  const movieDetails = isAddMovie ? EMPTY_MOVIE_FORM_DATA : getMovieById(id);

  movieDetails.movieUrl = movieDetails.movieUrl || ''; // prop missing in response

  const getMultiSelectValue = (target) =>
    [...target.selectedOptions].map((option) => option.value);

  const handleMultiSelectValueChange = (event) => {
    const { target } = event;
    const value = getMultiSelectValue(target);
    formik.setFieldValue(target.id, value);
  };

  const resetForm = () => {
    formik.resetForm();
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .required('Required'),
    release_date: Yup.date().required('Required'),
    movieUrl: Yup.string().url('Invalid url address').required('Required'),
    runtime: Yup.number()
      .min(10, 'Must be at least 10 minutes')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: movieDetails,
    validationSchema,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formik.isValid) {
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
              defaultValue={id}
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
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="field-error-message">{formik.errors.title}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="release_date">PRELEASE DATE</label>
          <input
            type="date"
            className="form-control form-control-lg"
            id="release_date"
            {...formik.getFieldProps('release_date')}
          />
          {formik.touched.release_date && formik.errors.release_date && (
            <div className="field-error-message">{formik.errors.release_date}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="movieUrl">MOVIE URL</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="movieUrl"
            {...formik.getFieldProps('movieUrl')}
          />
          {formik.touched.movieUrl && formik.errors.movieUrl && (
            <div className="field-error-message">{formik.errors.movieUrl}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="genres">GENRE</label>
          <select
            multiple={true}
            className="form-control form-control-lg"
            id="genres"
            onChange={handleMultiSelectValueChange}
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
            {...formik.getFieldProps('overview')}
          />
          {formik.touched.overview && formik.errors.overview && (
            <div className="field-error-message">{formik.errors.overview}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="runtime">RUNTIME</label>
          <input
            type="number"
            className="form-control form-control-lg"
            id="runtime"
            {...formik.getFieldProps('runtime')}
          />
          {formik.touched.runtime && formik.errors.runtime && (
            <div className="field-error-message">{formik.errors.runtime}</div>
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
            disabled={!(formik.isValid && formik.dirty)}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(EditMovie);
