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


const getLocation = () => {
    return new Promise((resolve, reject) => {
        let location = {
            latitude: null,
            longitude: null
        };

        if (!navigator.geolocation) {
            console.log("Geolocation API is not supported in your browser.");
        } else 
        {
            console.log("Requesting location from browser...");
            
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log(`Current Position: { Latitude: ${position.coords.latitude} | Longitude: ${position.coords.longitude} }`);
                        
                        location.latitude = position.coords.latitude;
                        location.longitude = position.coords.longitude;
                        resolve(location);
                        // return location;
                    }, 
                    (error) => {
                        console.log({ error: error.message });
                        reject("Error getting location");
                    },
                    { 
                        enableHighAccuracy: true,
                        timeout: 20000,   //  5000 ?
                        maximumAge: 1000  // 10000 ?
                    });
            }
    })
}

const getDistance = (user1, user2) => {
    return getPreciseDistance(
        { latitude: user1.latitude, longitude: user1.longitude },
        { latitude: user2.latitude, longitude: user2.longitude }
    );
}

const inRadius = (user1, user2, radius=150) => {
    let inRange = isPointWithinRadius(
        { latitude: user1.latitude, longitude: user1.longitude },
        { latitude: user2.latitude, longitude: user2.longitude },
        radius
    );
    console.log(`Distance radius (${getDistance(user1, user2)} < ${radius})? ${inRange}`, user1, user2);
    return inRange;
}

export { getLocation, inRadius };