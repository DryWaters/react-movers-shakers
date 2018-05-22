import React from 'react';
import PropTypes from 'prop-types';

const DrawerToggle = props => (
  <div
    tabIndex="0"
    role="button"
    className={props.showDrawer ? 'drawer-toggle change' : 'drawer-toggle'}
    onClick={() => props.toggleDrawer(!props.showDrawer)}
    onKeyPress={() => props.toggleDrawer(!props.showDrawer)}
  >
    <div className="bar1" />
    <div className="bar2" />
    <div className="bar3" />
  </div>
);

export default DrawerToggle;

DrawerToggle.propTypes = {
  showDrawer: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};
