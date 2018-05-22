# Movers and Shakers Project
Movers and Shakers project is a React application that uses the USGS earthquake [API](https://earthquake.usgs.gov/fdsnws/event/1/) to get earthquakes that range from 5.0+ in magnitude that have hit the Bay Area since 1900.  There are options to filter the earthquakes by the start and end dates using the input fields.  This project is part of the [Udacity Front-End Developer Nanoprogram](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).  

* [Instructions](#instructions)
* [Getting Started](#getting-started)
* [Prerequisites](#prerequisites)
* [Built With](#built-with)
* [Contributing](#contributing)
* [Authors](#authors)

## Instructions
The earthquake data is loaded on application start.  If you are using a mobile or smaller device, you will need to click the hamburger option in the top left to filter the listing.  Clicking on the list-view of the earthquakes will bring up more information about the quake, and you can then also click on the USGS information link for that specific earthquake.

## Getting Started
All needed NPM packages are included in the package.json file.  To install to your machine locally:

* Clone or unzip the zip file from this repository to your computer
* To install the required packages use ``` npm install ```
* Then to run use ```npm start```

## Prerequisites
All needed NPM packages are included in the package.json file.

## Built With
Uses the USGS Earthquake API, and a few 3rd party React components including:
* [react-google-maps](https://github.com/tomchentw/react-google-maps)
* [moment](https://www.npmjs.com/package/react-moment)

## Contributing
Since this is a personal project for a web development course, pull requests would probably be denied.  Feel free to fork into your own repo to add additional features.

## Authors
[Daniel Waters](https://www.watersjournal.com)
