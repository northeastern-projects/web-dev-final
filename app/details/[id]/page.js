'use client';

import { useStore } from '@/contexts/store';
import { Button, Container, Fieldset, Group, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function DetailsPage({ params }) {
	const router = useRouter();
	const placeId = params.id;
	const [{ top, results }, fetchLocationsByPlaceId, detailLocations] = useStore(
		useShallow((state) => [state.search, state.fetchLocationsByPlaceId, state.detailLocations])
	);

	if (!placeId || !top || !results) {
		router.push('/');
		notifications.show({
			title: 'Invalid place id',
			message: 'Please try again',
			color: 'red'
		});
		return null;
	}

	useEffect(() => {
		fetchLocationsByPlaceId(placeId);
	}, []);

	return (
		<Container size="lg" mt={100}>
			<Group justify="space-between">
				<Title>{top.displayName.text}</Title>
				<Link href="/">
					<Button variant="outline">Back</Button>
				</Link>
			</Group>
			<Fieldset mt={50} legend="Location Information">
				<Text>
					<b>ID:</b> {placeId}
				</Text>
				<Text>
					<b>Coordinates:</b> {top.location.latitude}, {top.location.longitude}
				</Text>
			</Fieldset>
			<Fieldset mt={50} legend="Saved locations at this position">
				{detailLocations.length === 0 && <Text>No saved locations at this position</Text>}
				{detailLocations.length > 0 &&
					detailLocations.map((location, index) => (
						<Group key={index} justify="space-between">
							<Text>
								<b>{location.name}</b>
							</Text>
							<Text>{location.details?.reviews?.length || 0} reviews</Text>
						</Group>
					))}
			</Fieldset>
		</Container>
	);
}
