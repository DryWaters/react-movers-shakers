import React from 'react';
import moment from 'moment';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

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
          onClick={() => props.toggleSelection(quake.id)}
        >
          {props.selection && quake.id === props.selection.id &&
            <InfoWindow >
              <div>
                <div>Date: {moment(quake.properties.time).format('MM-DD-YYYY')}</div>
                <div>Magnitude: {quake.properties.mag}</div>
                <div><a href={quake.properties.url} target="#">More Information</a></div>
              </div>
            </InfoWindow>}
        </Marker>
      ))}
    </GoogleMap>
  ));

  return (
    <GoogleMapExample
      containerElement={<div style={{ height: '500px', width: '500px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
};

export default Map;
