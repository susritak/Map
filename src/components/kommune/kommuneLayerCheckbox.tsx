import React, { Dispatch, SetStateAction, useMemo, useState, useEffect } from "react";
import { Layer } from "ol/layer";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Map } from "ol"; // Add this import statement

export function KommunelayerCheckbox({
  setLayers,
  map, // Fix the prop name "Map" to "map"
}: {
  setLayers: Dispatch<SetStateAction<Layer[]>>;
  map: Map; // Fix the prop name "Map" to "map"
}) {
  const kommuneLayer = useMemo(
    () =>
      new VectorLayer({
        source: new VectorSource({
          url: "/kommuner.json",
          format: new GeoJSON(),
        }),
      }),
    []
  );
  const [checked, setChecked] = useState(false);

  // Function to go to the user's current location
  function goToCurrentLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.getView().animate({
        center: [longitude, latitude],
        zoom: 10,
      });
    });
  }

  // Update layers when checkbox state changes
  useEffect(() => {
    if (checked) {
      setLayers((prevLayers) => [...prevLayers, kommuneLayer]);
    } else {
      setLayers((prevLayers) =>
        prevLayers.filter((layer) => layer !== kommuneLayer)
      );
    }
  }, [checked, setLayers]);

  // Log a message when checkbox state changes
  useEffect(() => {
    console.log(`Checkbox state changed: ${checked ? "checked" : "unchecked"}`);
  }, [checked]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked ? "Hide" : "Show"} kommuner
      </label>
      <button onClick={goToCurrentLocation}>Go to Current Location</button>
    </div>
  );
}



