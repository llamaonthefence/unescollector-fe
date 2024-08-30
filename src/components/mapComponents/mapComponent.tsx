import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './mapComponent.css'
// import '../mapComponents/mapData'
import { fetchSiteData } from './mapData';

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
export interface Site {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  id_number: number; 
}

// Define the props type for the MapComponent
// interface MapComponentProps {
//   sites: Site[];
// }

const MapComponent: React.FC = () => {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const [data, setData] = useState<Site[]>([])
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }; 

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []); 


    useEffect(() => {

      const loadData = async () => {
          try {
          const fetchedData = await fetchSiteData(); 
          console.log("Fetch site data:", fetchedData) //test if fetching
          setData(fetchedData); //store site data in state 

          } catch (error) {
              setError("Error loading site data");
          }
      }

      loadData(); 

  }, []) //empty dependency to load data on component mount


    const customIcon = createCustomIcon(isMobile)
    const position: [number, number] = [51.505, -0.09]; // Default position for the map, e.g., London


    
  return (
    <div className="mapContainer">
    <MapContainer center={position} zoom={5} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {data.map((site, index) => (
        <Marker key={index} position={[site.latitude, site.longitude]} icon={customIcon}>
          <Popup>
          <Link to={`/site/${site.id_number}`}>
            <strong>{site.name}</strong><br />
            </Link>
            <br />
            {site.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default MapComponent;
