import React, { Component } from 'react';
import moment from 'moment';
import Header from './components/Header';
import Filter from './components/Filter';
import Map from './components/Map';
import getAllQuakes from './components/EarthquakesAPI';
import './styles/styles.css';
import '../node_modules/normalize.css/normalize.css';

// Sort by Key function from
// https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
// reversed and modified to be an arrow function
function sortByKey(array, key) {
  return array.sort((a, b) => {
    const x = a[key]; const y = b[key];
    return ((x > y) ? -1 : ((x < y) ? 1 : 0)); // eslint-disable-line
  });
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      allQuakes: [],
      filteredQuakes: [],
      selection: null,
    };
    this.handleToggleSelection = this.handleToggleSelection.bind(this);
    this.handleDateFilter = this.handleDateFilter.bind(this);
  }

  componentWillMount() {
    getAllQuakes().then(data => (
      data.features.map(quake => (
        {
          id: quake.id,
          time: quake.properties.time,
          mag: quake.properties.mag,
          url: quake.properties.url,
          lat: quake.geometry.coordinates[1],
          lng: quake.geometry.coordinates[0],
        }
      ))
    )).then(quakes => (
      sortByKey(quakes, 'time')
    )).then((quakes) => {
      this.setState({
        allQuakes: quakes,
        filteredQuakes: quakes,
      });
    });
  }

  handleDateFilter({ start, end }) {
    if (start === '' || end === '') return;
    const unixStartTime = moment(start).format('x');
    const unixEndTime = moment(end).format('x');
    const filteredQuakes = this.state.allQuakes.filter(quake => (
      quake.time > unixStartTime && quake.time < unixEndTime
    ));
    this.setState({ filteredQuakes });
  }

  handleToggleSelection(id) {
    const selection = this.state.allQuakes.filter(quake => quake.id === id)[0];
    if (selection && selection.id !== this.state.selection) {
      this.setState({ selection: selection.id });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Filter
          quakes={this.state.filteredQuakes}
          selection={this.state.selection}
          toggleSelection={this.handleToggleSelection}
          filterQuakes={this.handleDateFilter}
        />
        <Map
          quakes={this.state.filteredQuakes}
          selection={this.state.selection}
          toggleSelection={this.handleToggleSelection}
        />
      </div>
    );
  }
}

export default App;
