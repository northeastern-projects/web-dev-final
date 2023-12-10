'use client';

import { useEffect } from 'react';
import { Avatar, Text, Button, Container, Title, Group, Table, Rating } from '@mantine/core';
import { useStore } from '@/contexts/store';
import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';

export default function AlienProfilePage({ params }) {
	const userId = params.id;
	const [{ username, email, role }, userReviews, fetchUserReviews, deleteReview, fetchAlienUser] = useStore(
		useShallow((state) => [state.alienUser, state.userReviews, state.fetchUserReviews, state.deleteReview, state.fetchAlienUser])
	);

	useEffect(() => {
		fetchAlienUser(userId);
		fetchUserReviews(userId);
	}, []);

	return (
		<Container size="lg" mt={100}>
			<Group justify="space-between">
				<Avatar size="xl" src="https://example.com/avatar.jpg" alt="User Avatar" />
				<Link href="/">
					<Button variant="outline">Back</Button>
				</Link>
			</Group>

			<Title weight={700} mt={30}>
				@{username}
			</Title>
			<Text>{email}</Text>

			<Text mt={30} fw="bold">
				Your Reviews:
			</Text>
			{userReviews.length === 0 && <Text mt={15}>This user has no reviews!</Text>}
			{userReviews.length > 0 && (
				<Table mt={15} highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Location</Table.Th>
							<Table.Th>Rating</Table.Th>
							<Table.Th>Description</Table.Th>
							{role === 'ADMIN' && <Table.Th>Actions</Table.Th>}
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{userReviews.map((review, index) => (
							<Table.Tr key={index}>
								<Table.Td>{review.location?.name || '?'}</Table.Td>
								<Table.Td>
									<Rating value={review.rating} readOnly />
								</Table.Td>
								<Table.Td>{review.reviewText || 'No description'}</Table.Td>
								{role === 'ADMIN' && (
									<Table.Td>
										<Button
											color="red"
											onClick={() => {
												deleteReview(review._id);
												fetchUserReviews(userId);
											}}
										>
											Delete
										</Button>
									</Table.Td>
								)}
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			)}
		</Container>
	);
}
