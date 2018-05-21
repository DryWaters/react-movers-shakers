import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Earthquake = ({ quake, toggleSelection, selection }) => (
  <div className={selection ? "quake-detail selected" : "quake-detail"} onClick={() => toggleSelection(quake.id)} >
    <div>Latitude: {quake.lat}  Longitude: {quake.lng}</div>
    <div>Date: {moment(quake.time).format('MM-DD-YYYY')}</div>
    <div>Magnitude: {quake.mag}</div>
    <div><a href={quake.url} target="#">More Information</a></div>
  </div>
);

export default Earthquake;

Earthquake.propTypes = {
  quake: PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    mag: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  selection: PropTypes.bool,
  toggleSelection: PropTypes.func.isRequired,
};

Earthquake.defaultProps = {
  quake: {},
  selection: null,
};
