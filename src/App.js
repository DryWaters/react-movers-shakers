import React, { Component } from 'react';
import moment from 'moment';
import Header from './components/Header';
import Filter from './components/Filter';
import Details from './components/Details';
import Map from './components/Map';
import getAllQuakes from './components/EarthquakesAPI';
import './styles/styles.css';
import '../node_modules/normalize.css/normalize.css';

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
    if (selection) {
      this.setState({ selection: selection.id });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Filter filterQuakes={this.handleDateFilter} />
        <Details
          quakes={this.state.filteredQuakes}
          selection={this.state.selection}
          toggleSelection={this.handleToggleSelection}
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
