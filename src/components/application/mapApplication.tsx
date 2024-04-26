import React, { useRef, useEffect } from "react";
import { Map, View } from "ol"; // Import Map and View from OpenLayers
import "./application.css"

import "ol/ol.css"; // Import OpenLayers CSS (adjust path as needed)

export function MapApplication() {
  const mapRef = useRef<HTMLDivElement>(null); // Ref to hold the map container

  useEffect(() => {
    if (!mapRef.current) return; // Exit if mapRef is not yet available

    const map = new Map({
      target: mapRef.current,
      layers: [], // Add layers as needed
      view: new View({
        center: [0, 0], // Initial center coordinates
        zoom: 2, // Initial zoom level
      }),
    });

    return () => {
      map.setTarget(); // Clean up: remove map from target on unmount
    };
  }, []); // Run effect only once on component mount

  return (
    <div>
      <header>
        <h1>Map Application</h1>
      </header>
      <nav>Actions</nav>
      <main ref={mapRef} className="map-container">
      </main>
    </div>
  );
}


