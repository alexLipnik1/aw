import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import styles from './app.scss';


const style = {
  width: '75%',
  height: '100%'
}

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  getDataLocation = d => ({
    lng: d.location.coordinates[0],          
    lat: d.location.coordinates[1],
  })

  activeMarkers = data => data.map((d, i) => (
    <Marker
      key={i}
      onClick={this.onMarkerClick}
      name={`client_id: ${d.client_id}`}
      time={`time: ${d.time}`}
      position={this.getDataLocation(d)}
      icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"      
    />
  ))

  inactiveMarkers = data => data.map((d, i) => (
    <Marker
      key={i}
      onClick={this.onMarkerClick}
      name={`client_id: ${d.client_id}`}
      time={`time: ${d.time}`}
      position={this.getDataLocation(d)}
    />
  ))

  render() {
    const { active, inactive, ...rest } = this.props;
    return (
  		<Map
        center={inactive && inactive[0] && this.getDataLocation(inactive[0])}
        style={style}
        zoom={7}
        {...rest} 
      >
        {
          inactive && this.inactiveMarkers(inactive)
        }
        {
          active && this.inactiveMarkers(active)
        }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h5>{this.state.selectedPlace.name}</h5>
              <h5>{this.state.selectedPlace.time}</h5>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyC82eeWEOZQ6JRrggJUjzkoEKSdIlVqkc8"
})(MapContainer)
