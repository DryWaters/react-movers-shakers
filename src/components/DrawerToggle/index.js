import React from 'react';

const DrawerToggle = (props) => {

  return (
    <div className={props.showDrawer ? 'drawer-toggle change' : 'drawer-toggle'} onClick={() => props.toggleDrawer(!props.showDrawer)}>
      <div className="bar1" />
      <div className="bar2" />
      <div className="bar3" />
    </div>
  );
};

export default DrawerToggle;
