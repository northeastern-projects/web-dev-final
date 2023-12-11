'use client';

import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import classes from './page.module.css';
import { useRouter } from 'next/navigation';
import { useStore } from '@/contexts/store';
import { notifications } from '@mantine/notifications';

export default function LoginPage() {
	const router = useRouter();
	const login = useStore((state) => state.login);

	// Form state
	const form = useForm({
		initialValues: {
			username: '',
			password: ''
		},
		validate: {
			username: isNotEmpty('Username is required'),
			password: isNotEmpty('Password is required')
		}
	});

	const handleSubmit = ({ username, password }) => {
		try {
			login(username, password);
			notifications.show({
				title: `Welcome back ${username}`,
				message: 'You have been logged in',
				color: 'green'
			});
			router.push('/');
		} catch (error) {
			form.setErrors({
				username: 'Invalid username or password',
				password: 'Invalid username or password'
			});
		}
	};

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Login
			</Title>
			<Paper pos="relative" shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label="Username" placeholder="johndoe" withAsterisk {...form.getInputProps('username')} />
					<PasswordInput label="Password" placeholder="password" withAsterisk {...form.getInputProps('password')} mt="md" />
					<Button fullWidth mt="xl" type="submit">
						Sign in
					</Button>
					<Button variant="outline" onClick={() => router.push('/')} fullWidth>
						Go back
					</Button>
				</form>
			</Paper>
		</Container>
	);
}
