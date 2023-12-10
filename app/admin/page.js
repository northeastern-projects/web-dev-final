'use client';

import { useStore } from '@/contexts/store';
import { Button, Container, Group, Table, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function AdminPage() {
	const router = useRouter();
	const [{ privileges }, fetchAll, { users, admins }, promoteUser, demoteAdmin] = useStore(
		useShallow((state) => [state.user, state.fetchAll, state.admin, state.promoteUser, state.demoteAdmin])
	);

	if (privileges !== '*') {
		router.push('/');
		notifications.clean();
		notifications.show({
			title: 'You are not an admin',
			message: 'Please log in as an admin to view this page',
			color: 'red'
		});
		return null;
	}

	useEffect(() => {
		fetchAll();
	}, []);

	return (
		<Container size="lg" mt={100}>
			<Group justify="space-between">
				<Title>Administration</Title>
				<Button variant="outline" onClick={() => router.push('/')}>
					Back
				</Button>
			</Group>

			<Text mt={30} fw="bold">
				All Users:
			</Text>
			{users.length === 0 && <Text mt={15}>There are no users!</Text>}
			{users.length > 0 && (
				<Table mt={15} highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Username</Table.Th>
							<Table.Th>Email</Table.Th>
							<Table.Th>Actions</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{users.map((user, index) => (
							<Table.Tr key={index}>
								<Table.Td>{user.username}</Table.Td>
								<Table.Td>{user.email}</Table.Td>
								<Table.Td>
									<Button color="blue" onClick={() => promoteUser(user._id)}>
										Promote
									</Button>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			)}

			<Text mt={30} fw="bold">
				All Users:
			</Text>
			{admins.length === 0 && <Text mt={15}>There are no admins!</Text>}
			{admins.length > 0 && (
				<Table mt={15} highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Username</Table.Th>
							<Table.Th>Email</Table.Th>
							<Table.Th>Actions</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{admins.map((admin, index) => (
							<Table.Tr key={index}>
								<Table.Td>{admin.username}</Table.Td>
								<Table.Td>{admin.email}</Table.Td>
								<Table.Td>
									<Button color="red" onClick={() => demoteAdmin(admin._id)}>
										Demote
									</Button>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			)}
		</Container>
	);
}
