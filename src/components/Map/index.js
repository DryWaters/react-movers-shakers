import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const Map = (props) => {
  const defaultMapOptions = {
    disableDefaultUI: true,
  };

  const WrappedGoogleMap = withGoogleMap(() => (
    <GoogleMap
      defaultCenter={{ lat: 37.4800726, lng: -122.0811401 }}
      defaultZoom={9}
      defaultOptions={defaultMapOptions}
    >
      {props.quakes.map(quake => (
        <Marker
          key={quake.id}
          position={{ lat: quake.lat, lng: quake.lng }}
          onClick={() => props.toggleSelection(quake.id)}
        >
          {props.selection && quake.id === props.selection &&
            <InfoWindow >
              <div>
                <div>Date: {moment(quake.time).format('MM-DD-YYYY')}</div>
                <div>Magnitude: {quake.mag}</div>
                <div><a href={quake.url} target="#">More Information</a></div>
              </div>
            </InfoWindow>}
        </Marker>
      ))}
    </GoogleMap>
  ));

  return (
    <WrappedGoogleMap
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
