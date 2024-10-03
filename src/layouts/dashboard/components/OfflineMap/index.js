import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.offline"; // Import the leaflet.offline plugin

// Define the paths for the marker icons
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

// Create a new icon
const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

// Set the default icon for the marker
L.Marker.prototype.options.icon = DefaultIcon;

const OfflineMap = ({ lastTenLocations }) => {
  const [map, setMap] = useState(null); // Store the map instance
  const initialPosition = [42.36058226915706, -71.08731546241223]; // Initial map center

  // Predefined array of opacities for the markers
  const opacities = [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.55, 0.7, 0.85, 1.0];

  useEffect(() => {
    if (map) {
      // Initialize the offline tile layer
      const tileLayerOffline = L.tileLayer.offline(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: ["a", "b", "c"],
        }
      ).addTo(map);

      // Add save tiles control
      const control = L.control.savetiles(tileLayerOffline, {
        zoomlevels: [12, 13, 14],
        confirm(layer, successCallback) {
          if (window.confirm("Save tiles for offline use?")) {
            successCallback();
          }
        },
        confirmRemoval(layer, successCallback) {
          if (window.confirm("Remove all the saved tiles?")) {
            successCallback();
          }
        },
      });
      control.addTo(map);
    }
  }, [map]); // Run effect only when map is initialized

  return (
    <MapContainer
      center={initialPosition}
      zoom={13}
      whenCreated={setMap} // Set the map instance
      style={{ height: "500px", width: "100%" }}
    >
      {/* Add the TileLayer to the map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Render markers for the last 10 locations with predefined opacities */}
      {lastTenLocations && lastTenLocations.map((location, index) => {
        // Use the opacity based on the index (ensuring the index is within bounds)
        const opacity = opacities[index] || opacities[opacities.length - 1];

        return (
          <Marker
            key={index}
            position={[location.loc.latitude, location.loc.longitude]}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `<div style="background-color: rgba(255, 0, 0, ${opacity}); width: 25px; height: 41px; border-radius: 5px;"></div>`,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>
              <div>
                <p><strong>UID:</strong> {location.uid}</p>
                <p><strong>Time:</strong> {location.time.toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default OfflineMap;


// import React, { useRef, useEffect, memo, useMemo } from "react";
// import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet.offline";

// // Define the paths for the marker icons
// const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
// const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
// const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

// // Create a new icon
// const DefaultIcon = L.icon({
//   iconUrl,
//   iconRetinaUrl,
//   shadowUrl,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   tooltipAnchor: [16, -28],
//   shadowSize: [41, 41],
// });

// // Set the default icon for the marker
// L.Marker.prototype.options.icon = DefaultIcon;

// // Custom OfflineTileLayer component
// const OfflineTileLayer = ({ url, ...props }) => {
//   const map = useMap();

//   const tileLayer = L.tileLayer.offline(url, props);
  
//   useEffect(() => {
//     tileLayer.addTo(map);
//     return () => {
//       map.removeLayer(tileLayer);
//     };
//   }, [map, tileLayer]);

//   return null;
// };

// // Custom SaveTilesControl component
// const SaveTilesControl = ({ layer }) => {
//   useEffect(() => {
//     const control = L.control.savetiles(layer, {
//       zoomlevels: [12, 13, 14],
//       confirm(layer, successCallback) {
//         if (window.confirm("Save tiles for offline use?")) {
//           successCallback();
//         }
//       },
//       confirmRemoval(layer, successCallback) {
//         if (window.confirm("Remove all the saved tiles?")) {
//           successCallback();
//         }
//       },
//     });
//     control.addTo(layer._map);

//     return () => {
//       control.remove();
//     };
//   }, [layer]);

//   return null;
// };

// // Memoized Marker component to prevent re-renders
// const MarkerComponent = memo(({ position, uid, time }) => (
//   <Marker position={position}>
//     <Popup>
//       <div>
//         <p><strong>UID:</strong> {uid}</p>
//         <p><strong>Time:</strong> {time.toLocaleString()}</p>
//       </div>
//     </Popup>
//   </Marker>
// ));

// // Main MapView component
// const OfflineMap = ({ lastTenLocations }) => {
//   const baselayer = useRef(null);

//   // Memoize lastTenLocations to prevent re-renders
//   const memoizedLocations = useMemo(() => lastTenLocations, [lastTenLocations]);

//   return (
//     <MapContainer id="mymap" center={[42.36058226915706, -71.08731546241223]} zoom={13} style={{ height: "500px", width: "100%" }}>
//       <OfflineTileLayer 
//         ref={baselayer} 
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
//       />
//       {baselayer.current && <SaveTilesControl layer={baselayer.current} />}
//       {memoizedLocations.map((location) => (
//         <MarkerComponent
//           key={location.uid}
//           position={[location.loc.latitude, location.loc.longitude]}
//           uid={location.uid}
//           time={location.time}
//         />
//       ))}
//     </MapContainer>
//   );
// };

// export default OfflineMap;
