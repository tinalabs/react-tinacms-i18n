import React from "react";
import { Map, TileLayer } from 'react-leaflet';

export default function Location(props) {

    return (
        <div>
            <h3>{props.city}</h3>
            <div>
            <Map center={[props.lat, props.lon]} zoom={props.zoom} style={{width: 200, height: 100}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </Map>
            </div>
        </div>
    );
}
