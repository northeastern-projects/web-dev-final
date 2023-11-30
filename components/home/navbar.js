import { Group, Button, Title } from '@mantine/core';
import classes from './navbar.module.css';
import Link from 'next/link';

export function Navbar() {
	return (
		<header className={classes.header}>
			<Group justify="space-between" h="100%">
				<Title order={2}>Final Project</Title>

				<Group>
					<Link href="/login">
						<Button variant="default">Log in</Button>
					</Link>
					<Link href="/signup">
						<Button>Sign up</Button>
					</Link>
				</Group>
			</Group>
		</header>
	);
}
