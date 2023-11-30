'use client';

import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import classes from './page.module.css';

export default function SignupPage() {
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

	const handleSubmit = ({ username, password }) => {};

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Sign up
			</Title>
			<Paper pos="relative" shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label="Username" placeholder="johndoe" withAsterisk {...form.getInputProps('username')} />
					<PasswordInput label="Password" placeholder="password" withAsterisk {...form.getInputProps('password')} mt="md" />
					<Button fullWidth mt="xl" type="submit">
						Sign up
					</Button>
				</form>
			</Paper>
		</Container>
	);
}
