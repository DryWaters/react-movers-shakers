import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const Map = (props) => {
  const WrappedGoogleMap = withGoogleMap(() => (
    <GoogleMap
      defaultCenter={{ lat: 37.4800726, lng: -122.0811401 }}
      defaultZoom={9}
    >
      {props.quakes.map(quake => (
        <Marker
          key={quake.id}
          position={{ lat: quake.lat, lng: quake.lng }}
          onClick={() => props.toggleSelection(quake.id)}
        >
          {props.selection && quake.id === props.selection.id &&
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
      containerElement={<div style={{ height: '500px', width: '500px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
};

export default Map;

Map.propTypes = {
  quakes: PropTypes.arrayOf(PropTypes.shape({

  })),
};

Map.defaultProps = {
  quakes: [],
};
