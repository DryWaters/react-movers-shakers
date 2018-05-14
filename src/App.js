import React, { Component } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Map from './components/Map';
import getAllQuakes from './components/EarthquakesAPI';

class App extends Component {
  constructor() {
    super();
    this.state = {
      earthquakes: [],
    };
  }

  componentWillMount() {
    getAllQuakes().then((data) => {
      this.setState({ earthquakes: data.features });
    });
  }


  render() {
    return (
      <div>
        <Header />
        <Search earthquakes={this.state.earthquakes} />
        <Map earthquakes={this.state.earthquakes} />
      </div>
    );
  }
}

export default App;
