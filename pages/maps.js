import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


class GoogleMaps extends Component 
{

    render() {
    const style = {
    width: '100%',
    height: '100%'
    }
    return (
    <div className= 'container'>
    Hello World
    {console.log(process.env.API)}
    {console.log(this.props.locations)}
    <Map 
    google={this.props.google} 
    zoom={10}
    initialCenter={{
    lat: this.props.locations.lat,
    lng: this.props.locations.long
    }}
    style={style}>
    <Marker />
    </Map>
      
    </div>
    );
    }
}
export default GoogleApiWrapper({
 apiKey: (process.env.API),
 version: 3.31
})(GoogleMaps);