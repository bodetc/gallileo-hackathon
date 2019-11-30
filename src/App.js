/*
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React, {Component} from 'react'
import Globe from 'worldwind-react-globe'
import {Container} from 'reactstrap'
import {Tools} from 'worldwind-react-globe-bs4'

import './App.css'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 60.203889,
      lon: 24.794444,
      alt: 500,
      globe: null
    };

    this.globeRef = React.createRef();
    this.markersRef = React.createRef();

    this.getLocation=this.getLocation.bind(this);
    this.showPosition=this.showPosition.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude);

    this.setState({
      lat: position.coords.latitude,
      lon:position.coords.longitude
    })
  }

  componentDidMount() {
    // Get the component with the WorldWindow after mounting
    this.setState({globe: this.globeRef.current});

    this.getLocation()
  }

  render() {
    const globe = this.globeRef.current;

    const layers = [
      {layer: 'eox-openstreetmap', options: {category: 'base', enabled: true}},
      {layer: 'renderables', options: {category: 'data', enabled: true, displayName: 'Markers'}},
      {layer: 'compass', options: {category: 'setting', enabled: true}},
      {layer: 'coordinates', options: {category: 'setting', enabled: true}},
    ];

    return (
      <div>
        <Container fluid className='p-0'>
          <div className='globe'>
            <Globe
                ref={this.globeRef}
                layers={layers}
                latitude={this.state.lat}
                longitude={this.state.lon}
                altitude={this.state.alt}
            />
          </div>
          <div className='overlayTools noninteractive'>
            <Tools
                globe={globe}
                markers={this.markersRef.current}
                markersLayerName='Markers'/>
          </div>
        </Container>
      </div>
    )
  }
}
