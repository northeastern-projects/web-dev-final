import { useStore } from '@/contexts/store';
import { Box, Group, Rating, Text } from '@mantine/core';
import Link from 'next/link';

export default function Review({ review, abridged = false }) {
	const { _id } = useStore((state) => state.user);

	if (abridged) {
		return (
			<Box>
				<Group justify="space-between">
					<Text m={0} fw={700}>
						Me
					</Text>
					<Rating value={review.rating} readOnly />
				</Group>
				<Text fz="sm" m={0}>
					{review.reviewText || 'No description'}
				</Text>
			</Box>
		);
	}

	if (!review || !review.user) {
		return null;
	}

	return (
		<Box>
			<Group justify="space-between">
				{review.user._id !== _id ? (
					<Link href={`/profile/${review.user._id}`}>
						<Text m={0} fw={700}>
							{review.user.username}
						</Text>
					</Link>
				) : (
					<Text m={0} fw={700}>
						Me
					</Text>
				)}
				<Rating value={review.rating} readOnly />
			</Group>
			<Text fz="sm" m={0}>
				{review.reviewText || 'No description'}
			</Text>
		</Box>
	);
}
