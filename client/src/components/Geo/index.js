import React, { Component } from 'react';
import { getPreciseDistance, isPointWithinRadius } from 'geolib';

// ***** Notes on geolib *****
// https://github.com/manuelbieh/geolib

// getDistance(start, end, accuracy = 1)
// Calculates the distance between two geo coordinates.
// Returns the distance in meters as a numeric value.
// ft = m * 3.2808

// getPreciseDistance(start, end[, int accuracy])
// This method is more accurate then getDistance,
//   especially for long distances but it is also 
//   slower. It is using the Vincenty inverse 
//   formula for ellipsoids.

// isPointWithinRadius(point, centerPoint, radius)
// Checks whether a point is inside of a circle or not.
// Returns true or false

// { latitude: this.state.latitude, longitude: this.state.longitude }

// lat:  +    0.1 -> 11132 meters
// lat:  +   0.01 ->  1113 meters
// lat:  +  0.001 ->   111 meters
// lat:  + 0.0001 ->    11 meters

// long: +    0.1 ->  9029 meters
// long: +   0.01 ->   903 meters
// long: +  0.001 ->    90 meters
// long: + 0.0001 ->     9 meters

// lat/long: +    0.1 ->  14333 meters
// lat/long: +   0.01 ->   1433 meters
// lat/long: +  0.001 ->    143 meters
// lat/long: + 0.0001 ->     14 meters

class Geolocation extends Component {
    constructor(props) {
    super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null
        };
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation = () => {
        if (!navigator.geolocation) {
            console.log("Geolocation API is not supported in your browser.");
        }
        else {
            console.log("Setting location...");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    });
                    return {
                        latitude: position.coords.latitude,
                        longitude: position.coords.latitude
                    };
                },
                (error) => this.setState({ error: error.message }),
                { 
                    enableHighAccuracy: true,
                    timeout: 20000,   //  5000 ?
                    maximumAge: 1000  // 10000 ?
                });
        }
    }

    updateUserLocation = () => {
        console.log(`Current Position: { Latitude: ${this.state.latitude} | Longitude: ${this.state.longitude} }`);
        this.props.getLocation({latitude: this.state.latitude, longitude: this.state.longitude});
        //setInterval(function () {
        //   locationSet();
        // }, 120 * 1000);
    }

    getDistance = ({latitude, longitude}) => {
        if (this.state.latitude !== null && this.state.longitude !== null) {
            
            let distance = getPreciseDistance(
                { latitude: this.state.latitude, longitude: this.state.longitude },
                { latitude, longitude}
            );
            
            console.log(`Distance from { ${latitude}, ${longitude} }: ${distance}`);
            return distance;
        }
    }

    inRadius = ({latitude, longitude}, radius=805) => {
        if (this.state.latitude !== null && this.state.longitude !== null) {
                
            let inRange = isPointWithinRadius(
                { latitude: this.state.latitude, longitude: this.state.longitude },
                { latitude, longitude},
                radius
            );
            console.log(`Distance in radius? ${inRange} :  ${radius} @ { ${latitude}, ${longitude} }`);
            return inRange.toString();
        }
    }

    renderOutput = () => {
        return (
            <div style={{color: "white"}}>
                <p>Latitude: {this.state.latitude}</p>
                <p>Longitude: {this.state.longitude}</p>
                <p>Distance between two points: {this.getDistance({latitude: 35.80, longitude: -78.82})} </p>
                <p>Distance in radius: {this.inRadius({latitude: 35.80, longitude: -78.82})} </p>
                {this.state.error ? <p>Error: {this.state.error}</p> : null}
            </div>
        );
    }
    
    renderComponent = () =>{
        this.updateUserLocation();
    }

    render() {
        console.log(`Current Position: { Latitude: ${this.state.latitude} | Longitude: ${this.state.longitude} }`);

        return (
            // null
            <span>{this.renderComponent()}</span>
            );
        }
}

export default Geolocation;

