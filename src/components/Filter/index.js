import React from 'react';
import PropTypes from 'prop-types';
import Details from '../Details';

const Filter = props => (
  <div className="filter">
    <input id="startDate" onChange={e => props.filterQuakes({ start: e.target.value, end: document.getElementById('endDate').value })} type="date" />
    <input id="endDate" onChange={e => props.filterQuakes({ start: document.getElementById('startDate').value, end: e.target.value })} type="date" />
    <Details
      quakes={props.quakes}
      selection={props.selection}
      toggleSelection={props.handleToggleSelection}
    />
  </div>
);

export default Filter;

Filter.propTypes = {
  filterQuakes: PropTypes.func.isRequired,
};
