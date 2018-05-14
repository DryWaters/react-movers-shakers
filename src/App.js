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
    getAllQuakes().then((data) => {
      this.setState({
        allQuakes: data.features,
        filteredQuakes: data.features,
      });
    });
  }


  render() {
    return (
      <div>
        <Header />
        <Search quakes={this.state.filteredQuakes} />
        <Map quakes={this.state.filteredQuakes} />
      </div>
    );
  }
}

export default App;
