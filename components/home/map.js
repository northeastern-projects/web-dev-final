import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect } from 'react';
import { useStore } from '@/contexts/store';
import { useShallow } from 'zustand/react/shallow';
import { Divider, Group, List, Rating, Stack, Text, Title } from '@mantine/core';

export default function Map({ position, zoom }) {
	const [locations, fetchLocations] = useStore(useShallow((state) => [state.locations, state.fetchLocations]));
	// const [reviews, fetchReviews] = useStore(useShallow((state) => [state.reviews, state.fetchReviews]));

	// const getReviews = async (locationId) => {
	// 		console.log(locationId);
	// 		return;
	// 		// fetchReviews(location._id);
	// 		// return reviews;
	// 	}

	useEffect(() => {
		fetchLocations();
	}, []);

	return (
		<MapContainer style={{ height: '100vh' }} center={position} zoom={zoom} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{locations.map((location, index) => (
				<Marker key={index} position={[location.position.lat, location.position.lng]}>
					<Popup>
						<Title order={4} mb={15}>
							{location.name}
						</Title>
						<Stack w={300} gap="xs">
							<Group justify="space-between">
								<Text m={0} fw={700}>
									Username
								</Text>
								<Rating value={2} />
							</Group>
							<Text fz="sm" m={0}>
								{location.details}
							</Text>
						</Stack>
						<Divider my="sm" />
						<Stack w={300} gap="xs">
							<Group justify="space-between">
								<Text m={0} fw={700}>
									Username
								</Text>
								<Rating value={2} />
							</Group>
							<Text fz="sm" m={0}>
								{location.details || 'No details provided'}
							</Text>
						</Stack>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}
