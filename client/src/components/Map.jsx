import React from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export default function Map(postCode) {
    var apiKey = "95hcXeOsnd4dIFUnbepjXbFxyLKnwAAA";
    var cityLat;
    var cityLong;
    var coordinates = [];
    var here = [];
    var centre = [];

    userLocation(postCode.postCode);
    
    here = JSON.parse(localStorage.getItem('coords'));
    if (here) {
        var latitude = here[0];
        var latSouth = latitude - 0.6
        centre.push(latSouth, here[1])
    } else {
        setInterval(() => {
            here = JSON.parse(localStorage.getItem('coords'));
            var latitude = here[0];
            var latSouth = latitude - 0.6
            centre.push(latSouth, here[1])
            window.location.reload();
        } , 600);
    }

    // Retrieve co-ords from local storage
    async function userLocation(cityName){
      await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${cityName}`)
      .then(function(response){
      return response.json();
      })
      .then(function(data){
          cityLat = data.results[0].locations[0].latLng.lat;
          cityLong = data.results[0].locations[0].latLng.lng;
          coordinates.push(cityLat, cityLong);
          localStorage.setItem('coords', JSON.stringify(coordinates));
      })
    };
    
    return(
        <MapContainer center={centre} zoom={10}scrollWheelZoom={true}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={here}></Marker>
        </MapContainer>
    )
}