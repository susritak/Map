import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import "./application.css";
import "ol/ol.css";
import { KommunelayerCheckbox } from "../kommune/kommuneLayerCheckbox";
import { Layer } from "ol/layer";

useGeographic();

const map = new Map({
    view: new View({
        center: [10, 59],
        zoom: 8,
    }),
});

export function MapApplication() {
    const [layers, setLayers] = useState<Layer[]>([
        new TileLayer({ source: new OSM() }),
    ]);

    const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
    useEffect(() => {
        map.setLayers(layers);
    }, [layers]);

    useEffect(() => {
        map.setTarget(mapRef.current);
    }, []);

    function handleFocusUser(e: React.MouseEvent) {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            map.getView().animate({
                center: [longitude, latitude],
                zoom: 10,
            });
        });
    }

    return (
        <>
            <header>
                <h1>Map Application</h1>
            </header>
            <nav>
                <KommunelayerCheckbox setLayers={setLayers} Map={map} />
            </nav>
            <main ref={mapRef}></main>
            <button onClick={handleFocusUser}>Focus User</button>
        </>
    );
}
