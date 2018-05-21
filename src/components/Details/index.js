import React from 'react';
import PropTypes from 'prop-types';
import Earthquake from '../Earthquake';

const Details = props => (
  <div className="details">
    {props.quakes && props.quakes.map(quake => (
      <Earthquake
        key={quake.id}
        quake={quake}
        toggleSelection={props.toggleSelection}
        selection={props.selection !== null && props.selection === quake.id}
      />
    ))}
  </div>
);

export default Details;

Details.propTypes = {
  quakes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    mag: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  })),
  selection: PropTypes.string,
  toggleSelection: PropTypes.func.isRequired,
};

Details.defaultProps = {
  quakes: [],
  selection: null,
};
