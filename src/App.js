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
    };
  }

  componentWillMount() {
    getAllQuakes().then(data => (
      data.features.map(quake => (
        {
          ...quake,
          displayInfo: false,
        }
      ))
    )).then((quakes) => {
      this.setState({
        allQuakes: quakes,
        filteredQuakes: quakes,
      });
    })
  }

  handleToggleInfoWindow(id) {
    console.log('You clicked on ' + id);
  }

  render() {
    return (
      <div>
        <Header />
        <Search quakes={this.state.filteredQuakes} />
        <Map quakes={this.state.filteredQuakes} toggleInfo={this.handleToggleInfoWindow} />
      </div>
    );
  }
}

export default App;
