import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect } from 'react';
import { useStore } from '@/contexts/store';
import { useShallow } from 'zustand/react/shallow';
import { Box, Button, Group, Rating, Stack, Text, Title } from '@mantine/core';

export default function Map({ position, zoom }) {
	const { username } = useStore((state) => state.user);
	const [locations, fetchLocations] = useStore(useShallow((state) => [state.locations, state.fetchLocations]));

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
							{location.details.reviews.length == 0 ? (
								<Text m={0}>No reviews for this location yet!</Text>
							) : (
								location.details.reviews.map((review, index) => (
									<Box key={index}>
										<Group justify="space-between">
											<Text m={0} fw={700}>
												{review.user.username}
											</Text>
											<Rating value={review.rating} readOnly />
										</Group>
										<Text fz="sm" m={0}>
											No description
										</Text>
									</Box>
								))
							)}
							{username && <Button mt={15}>Add review</Button>}
						</Stack>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}
