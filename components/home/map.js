import { MapContainer, Marker, Popup, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useState, useEffect } from 'react';

import axios from 'axios';

function MapComponent() {
	const map = useMapEvents({
		click() {
			map.locate()
		}
	})
}


export default function Map({ position, zoom }) {

	const API = process.env.API_BASE ||  "http://localhost:4000";
	const LOCATIONS_URL = `${API}/locations`;

	const [locations, setLocations] = useState([]);

	const [location, setLocation] = useState({
		name: "New fountain",
		location: position
	})

	// const handleOnClick = ((e) => {
	// 	setLocation({...location, position: e.latlng});
	// });

	useEffect(() => {
		getLocations();
	  }, []);

	const getLocations = async () => {
		console.log(LOCATIONS_URL);
		const response = await axios.get(LOCATIONS_URL);
		setLocations(response.data);
	}

	return (
		// <MapContainer style={{ height: '100vh' }} center={position} zoom={zoom} scrollWheelZoom={true} onClick={handleOnClick}>
		<MapContainer style={{ height: '100vh' }} center={position} zoom={zoom} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{locations.map((location, index) => (
				<Marker position={[location.position.lat, location.position.lng]}>
					<Popup>{location.name}</Popup>
				</Marker>
			))}

		</MapContainer>
	);
}
