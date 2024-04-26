import React, { useRef, useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css"; // Import OpenLayers CSS (adjust path as needed)
import { useGeographic } from "ol/proj";

useGeographic();

export function MapApplication() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [10.7522, 59.9139],
        zoom: 12,
      }),
    });

    return () => {
      map.setTarget();
    };
  }, []);

  return (
    <div>
      <header>
        <h1>Map Application</h1>
      </header>
      <nav>Actions</nav>
      <main ref={mapRef} className="map-container"></main>
    </div>
  );
}
