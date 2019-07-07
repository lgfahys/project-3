import React, { Component } from 'react';
import { getDistance } from 'geolib';

class GeolocationExample extends Component {
    constructor(props) {
    super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }



    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });

            console.log("Latitude: " + position.coords.latitude + " | Longitude: " + position.coords.longitude);
            console.log("Latitude: " + this.state.latitude + " | Longitude: " + this.state.longitude);
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        console.log("Latitude: " + this.state.latitude + " | Longitude: " + this.state.longitude);
    }

    render() {
    console.log("Latitude: " + this.state.latitude + " | Longitude: " + this.state.longitude);

    if (this.state.latitude !== null && this.state.longitude !== null) {
        var result = getDistance(
                { latitude: this.state.latitude, longitude: this.state.longitude },
                { latitude: 33.613355, longitude: -117.373261 }
        );
    }
    
    // let result = getDistance(
    //     { latitude: 51.5103, longitude: 7.49347 },
    //     { latitude: "51° 31' N", longitude: "7° 28' E" }
    // );

    return (
        <div style={{color: "white"}}>
            <p>Latitude: {this.state.latitude}</p>
            <p>Longitude: {this.state.longitude}</p>
            <p>Distance between two points: {result} </p>
            {this.state.error ? <p>Error: {this.state.error}</p> : null}
        </div>
    );
    }
}

export default GeolocationExample;