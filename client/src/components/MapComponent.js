import { Map, GoogleApiWrapper, Circle, Marker } from 'google-maps-react';


const mapStyles = {
    width: '50%',
    height: '60%',
};

function MapComponent({location}) {
    const coordinates = { lat: location[0], lng: location[1]}
    return (
        <>
        {location && <Map 
            google={window.google}
            zoom={15}
            style={mapStyles}
            initialCenter={coordinates}
            center={coordinates}
        >
            <Circle 
                radius={400}
                center={coordinates}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#FF0000'
                fillOpacity={0.2}
            />
            <Marker
                position={coordinates}
            />
        </Map>}
        </>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
})(MapComponent);
