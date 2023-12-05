import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect } from 'react';
import { useStore } from '@/contexts/store';
import { useShallow } from 'zustand/react/shallow';

export default function Map({ position, zoom }) {
	const [locations, fetchLocations] = useStore(useShallow((state) => [state.locations, state.fetchLocations]));

	const handleOnClick = (e) => {
		console.log(e);
	};

	useEffect(() => {
		fetchLocations();
	}, []);

	return (
		<MapContainer style={{ height: '100vh' }} center={position} zoom={zoom} scrollWheelZoom={true} onClick={handleOnClick}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{locations.map((location, index) => (
				<Marker key={index} position={[location.position.lat, location.position.lng]}>
					<Popup>{location.name}</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}
