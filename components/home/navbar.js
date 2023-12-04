import { Group, Button, Title, Input } from '@mantine/core';
import classes from './navbar.module.css';
import Link from 'next/link';

export function Navbar() {
	return (
		<header className={classes.header}>
			<Group justify="space-between" h="100%">
				<Title order={2}>Fountain Guru</Title>
				<Group>
					<Link href="/search">
						<Button>
							Search
						</Button>
					</Link>
					<Input>
					</Input>
				</Group>
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
