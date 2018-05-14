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
      window.console.log(data);
    });
  }


  render() {
    return (
      <Header />
    );
  }
}

export default App;
