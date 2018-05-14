import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = (props) => {
  const GoogleMapExample = withGoogleMap(() => (
    <GoogleMap
      defaultCenter={{ lat: 37.4800726, lng: -122.0811401 }}
      defaultZoom={9}
    >
      {props.quakes.map(quake => (
        <Marker
          key={quake.id}
          position={{ lat: quake.geometry.coordinates[1], lng: quake.geometry.coordinates[0] }}
        />
      ))}
    </GoogleMap>
  ));

  return (
    <GoogleMapExample
      containerElement={<div style={{ height: '500px', width: '500px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    >
    </GoogleMapExample>
  );
};

export default Map;
