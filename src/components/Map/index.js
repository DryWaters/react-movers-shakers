/* global google */ // eslint-ignore

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const Map = (props) => {
  const defaultMapOptions = {
    disableDefaultUI: true,
    draggable: false,
    disableAutoPan: true,
  };

  const WrappedGoogleMap = withScriptjs(withGoogleMap(() => (
    <GoogleMap
      defaultCenter={{ lat: 37.4800726, lng: -122.211401 }}
      defaultZoom={window.screen.width > 400 ? 9 : 8}
      defaultOptions={defaultMapOptions}
    >
      {props.quakes.map(quake => (
        <Marker
          key={quake.id}
          position={{ lat: quake.lat, lng: quake.lng }}
          onClick={() => props.toggleSelection(quake.id)}
          animation={quake.id === props.selection ? google.maps.Animation.BOUNCE : ''}
        >
          {props.selection && quake.id === props.selection &&
            <InfoWindow>
              <div>
                <div>Date: {moment(quake.time).format('MM-DD-YYYY')}</div>
                <div>Magnitude: {quake.mag}</div>
                <div><a href={quake.url} target="#">More Information</a></div>
              </div>
            </InfoWindow>}
        </Marker>
      ))}
    </GoogleMap>
  )));

  return (
    <WrappedGoogleMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDdOc88zhd6KHz-i0UCxt8MJGFNWZRLpf0"
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div id="map" style={{ height: '100vh', width: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
};

export default Map;

Map.propTypes = {
  quakes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    mag: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  })),
};

Map.defaultProps = {
  quakes: [],
};
