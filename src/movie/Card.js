import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Card.scss';
import { MovieShape } from './MovieShape';

export function MovieCard(props) {
  const { movie, onDeleteClick, onDetailsClick } = props;
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleConfirmDelete = () => {
    onDeleteClick(movie);
    setIsDeleteModalVisible(false);
  };

  const handleDetailsClick = () => {
    onDetailsClick(movie);
  };

  return (
    <>
      <div className="movie-card">
        <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            className="overflow-menu-circle text-white"
            id="dropdown-basic"
          >
            ...
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={'/movie/' + movie.id}>
              EDIT
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDetailsClick}>VIEW DETAILS</Dropdown.Item>
            <Dropdown.Item onClick={() => setIsDeleteModalVisible(true)}>
              DELETE
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <img
          className="movie-card-img"
          role="button"
          title="View movie details"
          src={movie.poster_path}
          alt="Poster"
          onClick={handleDetailsClick}
        />
        <div className="movie-card-body text-dim-white">
          <div className="flex">
            <h5 className="movie-card-title extra-spacer">{movie.title}</h5>
            <span className="movie-year">{movie.release_date.split('-')[0]}</span>
          </div>
          <p className="movie-card-sub-title">{movie.genres.join(' , ')}</p>
        </div>
      </div>
      <Modal
        size="md"
        show={isDeleteModalVisible}
        onHide={() => setIsDeleteModalVisible(false)}
        centered
        dialogClassName="modal-black modal-no-divider"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">DELETE MOVIE</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this movie?</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={handleConfirmDelete}
          >
            CONFIRM
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

MovieCard.propTypes = {
  movie: MovieShape,
  onDeleteClick: PropTypes.func,
  onDetailsClick: PropTypes.func,
};
