import { Group, Button, Box, Title } from '@mantine/core';
import classes from './navbar.module.css';

export function Navbar() {
	return (
		<header className={classes.header}>
			<Group justify="space-between" h="100%">
				<Title order={2}>Final Project</Title>

				<Group>
					<Button variant="default">Log in</Button>
					<Button>Sign up</Button>
				</Group>
			</Group>
		</header>
	);
}
