import React from "react";
import ReactDOM from "react-dom/client";
import { MapApplication } from "./components/application/mapApplication"; // Import MapApplication component

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Render the initial content using root.render
root.render(<h1>Mapping Application</h1>);

// Now render the MapApplication component using root.render
root.render(<MapApplication />);
