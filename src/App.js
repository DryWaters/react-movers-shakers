import React, { Component } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Map from './components/Map';
import getAllQuakes from './components/EarthquakesAPI';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allQuakes: [],
      filteredQuakes: [],
      selection: null,
    };
    this.handleToggleSelection = this.handleToggleSelection.bind(this);
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

  handleToggleSelection(id) {
    const selection = this.state.allQuakes.filter(quake => quake.id === id)[0];
    if (selection) {
      this.setState({ selection });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Search quakes={this.state.filteredQuakes} selection={this.state.selection} />
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
