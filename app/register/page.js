'use client';

import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import classes from './page.module.css';
import { useRouter } from 'next/navigation';
import { useStore } from '@/contexts/store';
import { notifications } from '@mantine/notifications';

export default function SignupPage() {
	const router = useRouter();
	const signup = useStore((state) => state.signup);

	// Form state
	const form = useForm({
		initialValues: {
			username: '',
			email: '',
			password: ''
		},
		validate: {
			username: isNotEmpty('Username is required'),
			email: isEmail('Please enter a valid email'),
			password: isNotEmpty('Password is required')
		}
	});

	const handleSubmit = ({ username, email, password }) => {
		try {
			signup(username, email, password);
			notifications.show({
				title: `Hey there ${username}`,
				message: 'Thanks for signing up!',
				color: 'green'
			});
			router.push('/');
		} catch (error) {
			form.setErrors({
				username: 'Invalid username',
				email: 'Invalid email',
				password: 'Invalid password'
			});
		}
	};

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Sign up
			</Title>
			<Paper pos="relative" shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label="Username" placeholder="johndoe" withAsterisk {...form.getInputProps('username')} />
					<TextInput label="Email" placeholder="johndoe@email.com" withAsterisk {...form.getInputProps('email')} />
					<PasswordInput label="Password" placeholder="password" withAsterisk {...form.getInputProps('password')} mt="md" />
					<Button fullWidth mt="xl" type="submit">
						Sign up
					</Button>
					<Button variant="outline" onClick={() => router.push('/')} fullWidth>
						Go back
					</Button>
				</form>
			</Paper>
		</Container>
	);
}
