import { Group, Button, Title, TextInput } from '@mantine/core';
import classes from './navbar.module.css';
import Link from 'next/link';
import { useStore } from '@/contexts/store';

export function Navbar() {
	const { username } = useStore((state) => state.user);

	return (
		<header className={classes.header}>
			<Group justify="space-between" h="100%">
				<Title order={2}>Fountain Guru</Title>
				{username && <TextInput w={450} placeholder="Search" rightSection={<Button>Search</Button>} />}
				{!username && (
					<Group>
						<Link href="/login">
							<Button variant="default">Log in</Button>
						</Link>
						<Link href="/signup">
							<Button>Sign up</Button>
						</Link>
					</Group>
				)}
			</Group>
		</header>
	);
}
