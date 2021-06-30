import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '50%',
    height: '60%',
};

function MapComponent() {
    return (
        <Map 
            google={window.google}
            zoom={11}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176}}
        >
            <Marker
                position={{lat: 47.444, lng: -122.176}}
            />
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
})(MapComponent);
