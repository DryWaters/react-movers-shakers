import React from 'react';
import PropTypes from 'prop-types';
import Details from '../Details';

const Filter = props => (
  <div>
    <div className={props.showDrawer ? 'filter--show' : 'filter'}>
      <label htmlFor="startDate">
        Start Date
        <div>
          <input
            aria-label="Start Date"
            className="filter__input"
            id="startDate"
            onChange={e => props.filterQuakes({ start: e.target.value, end: document.getElementById('endDate').value })}
            type="date"
          />
        </div>
      </label>
      <label htmlFor="endDate">
        End Date
        <div>
          <input
            className="filter__input"
            id="endDate"
            onChange={e => props.filterQuakes({ start: document.getElementById('startDate').value, end: e.target.value })}
            type="date"
          />
        </div>
      </label>
      <Details
        quakes={props.quakes}
        selection={props.selection}
        toggleSelection={props.toggleSelection}
      />
    </div>
  </div>
);

export default Filter;

Filter.propTypes = {
  filterQuakes: PropTypes.func.isRequired,
  quakes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    time: PropTypes.number,
    mag: PropTypes.number,
    url: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  })),
  selection: PropTypes.string,
  toggleSelection: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool.isRequired,
};

Filter.defaultProps = {
  quakes: [],
  selection: null,
};
