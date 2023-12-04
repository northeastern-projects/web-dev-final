'use client';

import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import classes from './page.module.css';
import axios from 'axios';

export default function LoginPage() {
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

	const API_BASE = process.env.API_BASE;
	// const API_BASE = "http://localhost:4000"

	const handleSubmit = async ({ username, password }) => {
		console.log(`${API_BASE}/users/signin`);
		console.log({username: username, password: password});
		const response = await axios.post(`${API_BASE}/users/signin`, 
		{username: username, password: password});
		console.log(response);
		// Navigate to account / home page (?)
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
				</form>
			</Paper>
		</Container>
	);
}
