import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet';

const MapView = (props) => {
    const { locationArray, mapCenter, onSelecteMarker } = props
    const iconArray = {
        safe: divIcon({ className: 'marker-icon Safe', iconSize: [20, 20] }),
        xxSmall: divIcon({ className: 'marker-icon Yellow', iconSize: [18, 18] }),
        xSmall: divIcon({ className: 'marker-icon xOrange', iconSize: [24, 24] }),
        small: divIcon({ className: 'marker-icon xxOrange', iconSize: [30, 30] }),
        normal: divIcon({ className: 'marker-icon xxxOrange', iconSize: [36, 36] }),
        large: divIcon({ className: 'marker-icon xRed', iconSize: [42, 42] }),
        xLarge: divIcon({ className: 'marker-icon xxRed', iconSize: [48, 48] }),
        xxLarge: divIcon({ className: 'marker-icon xxxRed', iconSize: [54, 54] })
    }
    const markerElements = locationArray.map(location => {
        const {
            id, country_code,
            country, province,
            coordinates: { latitude, longitude },
            latest: { confirmed }
        } = location;
        let markerIcon = iconArray.safe;
        if (confirmed >= 1 && confirmed <= 100) {
            markerIcon = iconArray.xxSmall;
        }
        else if (confirmed >= 101 && confirmed <= 500) {
            markerIcon = iconArray.xSmall;
        }
        else if (confirmed >= 501 && confirmed <= 1000) {
            markerIcon = iconArray.small;
        }
        else if (confirmed >= 1001 && confirmed <= 5000) {
            markerIcon = iconArray.normal;
        }
        else if (confirmed >= 5001 && confirmed <= 10000) {
            markerIcon = iconArray.large;
        }
        else if (confirmed >= 10001 && confirmed <= 50000) {
            markerIcon = iconArray.xLarge;
        }
        else if (confirmed >= 50001) {
            markerIcon = iconArray.xxLarge;
        }

        let title = country;
        if (province !== '' && province !== country) {
            title = `${province}, ${country}`;
        }
        return (
            <Marker
                key={`${id}-${country_code}`}
                position={[latitude, longitude]}
                icon={markerIcon}
                onclick={() => onSelecteMarker(id)}>
                <Popup>{title}</Popup>
            </Marker>
        );
    });
    return (
        <Map className="map-view" center={mapCenter} zoom={5}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markerElements}
        </Map>
    );
}

export default MapView;
