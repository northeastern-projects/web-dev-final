import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect, useState } from 'react';
import { useStore } from '@/contexts/store';
import { useShallow } from 'zustand/react/shallow';
import { ActionIcon, Button, Group, Modal, Rating, Stack, Text, Textarea, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Review from './review';
import { IconHeart, IconHeartBroken } from '@tabler/icons-react';

export default function Map({ position, zoom }) {
	const { username, _id, favorites } = useStore((state) => state.user);
	const [locations, fetchLocations, addReview, addFavoriteLocation, removeFavoriteLocation] = useStore(
		useShallow((state) => [state.locations, state.fetchLocations, state.addReview, state.addFavoriteLocation, state.removeFavoriteLocation])
	);
	const [opened, { open, close }] = useDisclosure(false);

	// States for new review
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');
	const [locationId, setLocationId] = useState('');

	const modalCloseHandler = () => {
		close();
		setRating(0);
		setReview('');
	};

	const submitReview = () => {
		addReview(locationId, { rating, reviewText: review, user: _id });
		modalCloseHandler();
	};

	const hasFavorite = (locationId) => {
		return favorites.includes(locationId);
	};

	const handleFavorite = (locationId, add) => {
		if (add) {
			addFavoriteLocation(_id, locationId);
			return;
		}

		removeFavoriteLocation(_id, locationId);
	};

	useEffect(() => {
		fetchLocations();
	}, []);

	return (
		<>
			<Modal opened={opened} onClose={modalCloseHandler} title="Add review" zIndex={1000}>
				<Group>
					<Text fz="sm" fw={500}>
						Rating:{' '}
					</Text>
					<Rating value={rating} onChange={setRating} />
				</Group>
				<Textarea mt={15} label="Review Description" placeholder="Review" value={review} onChange={(e) => setReview(e.currentTarget.value)} />
				<Button mt={15} fullWidth onClick={submitReview}>
					Submit Review
				</Button>
			</Modal>
			<MapContainer style={{ height: '100vh' }} center={position} zoom={zoom} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{locations.map((location, index) => (
					<Marker key={index} position={[location.position.lat, location.position.lng]}>
						<Popup>
							<Group justify="space-between" mb={15}>
								<Title order={4}>{location.name}</Title>
								{username && (
									<ActionIcon
										variant="filled"
										aria-label="Favorite"
										color={hasFavorite(location._id) ? 'gray' : 'red'}
										onClick={() => handleFavorite(location._id, !hasFavorite(location._id))}
									>
										{hasFavorite(location._id) ? <IconHeartBroken /> : <IconHeart />}
									</ActionIcon>
								)}
							</Group>
							<Stack w={300} gap="xs">
								{location.details && location.details.reviews.length > 0 ? (
									location.details.reviews.map((review, index) => <Review review={review} key={index} />)
								) : (
									<Text m={0}>No reviews for this location yet!</Text>
								)}
								{username && (
									<Button
										mt={15}
										onClick={() => {
											setLocationId(location._id);
											open();
										}}
									>
										Add review
									</Button>
								)}
							</Stack>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</>
	);
}
