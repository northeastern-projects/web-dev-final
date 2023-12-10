'use client';

import { useEffect, useState } from 'react';
import { Avatar, Text, Button, Container, Title, Group, Table, Rating, TextInput } from '@mantine/core';
import { useStore } from '@/contexts/store';
import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';

export default function ProfilePage() {
	const [{ username, email, _id }, userReviews, fetchUserReviews, updateReview, deleteReview] = useStore(
		useShallow((state) => [state.user, state.userReviews, state.fetchUserReviews, state.updateReview, state.deleteReview])
	);

	// Current editing button state
	const [editing, setEditing] = useState(false);
	const [editReview, setEditReview] = useState('');
	const [editRating, setEditRating] = useState(0);

	useEffect(() => {
		fetchUserReviews(_id);
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
			<Table mt={15} highlightOnHover>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Location</Table.Th>
						<Table.Th>Rating</Table.Th>
						<Table.Th>Description</Table.Th>
						<Table.Th>Actions</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{userReviews.map((review, index) => (
						<Table.Tr key={index}>
							<Table.Td>{review.location?.name || '?'}</Table.Td>
							<Table.Td>
								<Rating value={editing === index ? editRating : review.rating} readOnly={editing !== index} onChange={setEditRating} />
							</Table.Td>
							<Table.Td>
								{editing === index ? (
									<TextInput
										value={editing === index ? editReview : review.reviewText}
										onChange={(e) => setEditReview(e.currentTarget.value)}
									/>
								) : (
									<>{review.reviewText || 'No description'}</>
								)}
							</Table.Td>
							<Table.Td>
								<Button.Group>
									{editing === index ? (
										<Button
											variant="outline"
											color="green"
											onClick={() => {
												setEditing(false);
												updateReview(review._id, { reviewText: editReview, rating: editRating });
												fetchUserReviews(_id);
											}}
										>
											Save
										</Button>
									) : (
										<Button
											variant="outline"
											onClick={() => {
												setEditing(index);
												setEditReview(review.reviewText);
												setEditRating(review.rating);
											}}
										>
											Edit
										</Button>
									)}
									<Button
										color="red"
										onClick={() => {
											deleteReview(review._id);
											fetchUserReviews(_id);
										}}
									>
										Delete
									</Button>
								</Button.Group>
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</Container>
	);
}
