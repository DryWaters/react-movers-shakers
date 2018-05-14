import React, { Component } from 'react';
import Header from './components/Header';
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
      <Header />
    );
  }
}

export default App;
