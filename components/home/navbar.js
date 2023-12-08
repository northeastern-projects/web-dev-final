import { Group, Button, Title, TextInput } from '@mantine/core';
import classes from './navbar.module.css';
import Link from 'next/link';
import { useStore } from '@/contexts/store';
import { useEffect } from 'react';

export function Navbar() {
	const { username } = useStore((state) => state.user);
	const logout = useStore((state) => state.logout);

	const handleSearch = (e) => {
		e.preventDefault();
		console.log('search');
	};

	const handleLogout = async (e) => {
		await logout();
	}

	return (
		<header className={classes.header}>
			<Group justify="space-between" h="100%">
				<Title order={2}>Fountain Guru</Title>
				{!username && <TextInput w={450} placeholder="Search" rightSection={<Button onClick={handleSearch}>Search</Button>} />}
				{!username && (
					<Group>
						<Link href="/login">
							<Button variant="default">Log in</Button>
						</Link>
						<Link href="/register">
							<Button>Sign up</Button>
						</Link>
					</Group>
				)}
				{username && (
					<Group>
						<Button onClick={handleLogout} color="red">Logout</Button>
					</Group>
				)}
			</Group>
		</header>
	);
}
