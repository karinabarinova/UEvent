import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


const mapStyles = {
    width: '50%',
    height: '60%',
};

function MapComponent({location}) {
    return (
        <>
        {location && <Map 
            google={window.google}
            zoom={11}
            style={mapStyles}
            initialCenter={{ lat: location[0], lng: location[1]}}
            center={{ lat: location[0], lng: location[1]}}
        >
            <Marker
                position={{lat: location[0], lng: location[1]}}
            />
        </Map>}
        </>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
})(MapComponent);
