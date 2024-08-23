import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './mapComponent.css'

// Custom leaflet icon with dynamic resizing
const createCustomIcon = (isMobile: boolean): L.Icon => {

return new L.Icon({

  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',

  iconSize: isMobile ? [20, 32] : [25, 41],
  iconAnchor: isMobile ? [10, 32] : [12, 41],
  popupAnchor: isMobile ? [1, -30] : [1, -34],
  shadowSize: isMobile ? [32, 32] : [41, 41],

});
};

// Define the type for the individual site
interface Site {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

// Define the props type for the MapComponent
interface MapComponentProps {
  sites: Site[];
}

const MapComponent: React.FC<MapComponentProps> = ({ sites }) => {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }; 

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []); 


    const customIcon = createCustomIcon(isMobile)
  
    const position: [number, number] = [51.505, -0.09]; // Default position for the map, e.g., London


    
  return (
    <div className="mapContainer">
    <MapContainer center={position} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {sites.map((site, index) => (
        <Marker key={index} position={[site.latitude, site.longitude]} icon={customIcon}>
          <Popup>
            <strong>{site.name}</strong><br />
            {site.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default MapComponent;
