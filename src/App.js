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
// I reversed the order and modified to be an arrow function
function sortByKey(array, key) {
  return array.sort((a, b) => {
    const x = a[key]; const y = b[key];
    return ((x > y) ? -1 : ((x < y) ? 1 : 0)); // eslint-disable-line
  });
}

// register service worker
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    window.console.log('Service worker registered.  Scope is ', reg.scope);
  }).catch((error) => {
    window.console.log('Registration failed:', error);
  });
} else {
  window.console.log('Service workers are not supproted');
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      allQuakes: [],
      filteredQuakes: [],
      selection: null,
      showDrawer: false,
    };
    this.handleToggleSelection = this.handleToggleSelection.bind(this);
    this.handleDateFilter = this.handleDateFilter.bind(this);
    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
  }

  componentWillMount() {
    // 1.  fetch all quakes from 1900 to current that have a magnitude greater
    //     than 5 and in the Bay Area
    // 2.  If successful, it strips off the fields that are needed
    // 3.  Sorts them by date
    // 4.  Sets the state with the sorted quakes
    //         allQuakes to be used as entire list
    //         filteredQuakes that is reflects the user's selected dates
    getAllQuakes()
      .then(data => (
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
      ))
      .then(quakes => (
        sortByKey(quakes, 'time')
      ))
      .then((quakes) => {
        this.setState({
          allQuakes: quakes,
          filteredQuakes: quakes,
        });
      })
      .catch((err) => {
        window.console.log(`Unable to contact API with error ${err}`);
      });
  }

  handleToggleDrawer(drawerState) {
    this.setState({ showDrawer: drawerState });
  }

  // handler for user selected filter dates
  handleDateFilter({ start, end }) {
    // if both inputs are cleared, reset
    if (start === '' && end === '') {
      this.setState({ filteredQuakes: this.state.allQuakes });
      return;
    }

    // if either are cleared, just return because
    // no reason to filter
    if (start === '' || end === '') return;

    // convert the string to unix millisecond time to be compared with the
    // api that returns the time in millisecond epoch time
    const unixStartTime = moment(start).format('x');
    const unixEndTime = moment(end).format('x');
    const filteredQuakes = this.state.allQuakes.filter(quake => (
      quake.time > unixStartTime && quake.time < unixEndTime
    ));
    this.setState({ filteredQuakes });
  }

  // handler for when user clicks on marker or listview item
  handleToggleSelection(id) {
    // figure out which quake was selected from the ID
    const selection = this.state.allQuakes.filter(quake => quake.id === id)[0];

    // if selection was found and is different than previous selection
    // set the new selection to the one clicked
    // else clear it
    if (selection && selection.id !== this.state.selection) {
      this.setState({ selection: selection.id });
    } else {
      this.setState({ selection: null });
    }
  }

  render() {
    return (
      <div>
        <Header showDrawer={this.state.showDrawer} toggleDrawer={this.handleToggleDrawer} />
        <Filter
          quakes={this.state.filteredQuakes}
          selection={this.state.selection}
          toggleSelection={this.handleToggleSelection}
          filterQuakes={this.handleDateFilter}
          showDrawer={this.state.showDrawer}
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
