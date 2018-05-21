import React from 'react';

const Filter = props => (
  <div className="filter">
    <input id="startDate" onChange={e => props.filterQuakes({ start: e.target.value, end: document.getElementById('endDate').value })} type="date" />
    <input id="endDate" onChange={e => props.filterQuakes({ start: document.getElementById('startDate').value, end: e.target.value })} type="date" />
  </div>
);

export default Filter;
