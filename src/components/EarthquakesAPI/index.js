const api = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';

const getAllQuakes = () =>
  fetch(`${api}&starttime=1900-01-01&latitude=37.4800726&longitude=-122.0811401&maxradiuskm=60&minmagnitude=5`)
    .then(res => res.json())
    .catch((error) => {
      window.alert(`Unable to contact the earthquake API with error: ${error}`); // eslint-disable-line
    });

export default getAllQuakes;

