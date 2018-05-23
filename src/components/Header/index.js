import React from 'react';
import PropTypes from 'prop-types';
import DrawerToggle from '../DrawerToggle';

const Header = props => (
  <div className="header">
    <DrawerToggle showDrawer={props.showDrawer} toggleDrawer={props.toggleDrawer} />
    <h1 className="header__title">Movers and Shakers - Bay Area</h1>
    <p><a href="https://earthquake.usgs.gov/fdsnws/event/1/">Earthquake data supplied by USGS </a></p>
  </div>
);

export default Header;

Header.propTypes = {
  showDrawer: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};
