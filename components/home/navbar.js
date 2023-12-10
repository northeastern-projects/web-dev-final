import { Group, Button, Title, TextInput, Modal, Badge, Menu } from '@mantine/core';
import classes from './navbar.module.css';
import Link from 'next/link';
import { useStore } from '@/contexts/store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { IconChevronsDown, IconChevronsUp } from '@tabler/icons-react';
import Review from './review';

export function Navbar() {
	const router = useRouter();
	const [{ username, _id }, logout, search, searchResults, addLocation, fetchUserReviews, userReviews] = useStore(
		useShallow((state) => [state.user, state.logout, state.search, state.searchResults, state.addLocation, state.fetchUserReviews, state.userReviews])
	);
	const [searchTerm, setSearchTerm] = useState('');
	const [opened, { open, close }] = useDisclosure(false);
	const [menuOpened, setMenuOpened] = useState(false);

	const [buildingName, setBuildingName] = useState('');
	const [topResult, setTopResult] = useState(null);
	const [latestUserReview, setLatestUserReview] = useState(null);

	const handleSearch = () => {
		if (!searchTerm) {
			notifications.show({
				title: 'Search term cannot be empty',
				message: 'Please enter a search term',
				color: 'red'
			});
			return;
		}

		search(searchTerm);
		setSearchTerm('');

		if (searchResults?.places?.length > 0) {
			setTopResult(searchResults.places[0]);
			open();
		}
	};

	const handleAddLocation = () => {
		addLocation({
			building: topResult.displayName.text,
			name: buildingName,
			place_id: topResult.id,
			position: {
				lat: topResult.location.latitude,
				lng: topResult.location.longitude
			}
		});
		setBuildingName('');
		setTopResult(null);
		close();
	};

	useEffect(() => {
		fetchUserReviews(_id);
		if (userReviews.length > 0) {
			setLatestUserReview(userReviews.pop());
		}
	}, [userReviews, _id]);

	useEffect(() => {
		if (searchResults?.places?.length > 0) {
			setTopResult(searchResults.places[0]);
		}
	}, [searchResults]);

	return (
		<>
			<Modal opened={opened} onClose={close} zIndex={1000} title="Search Results">
				{topResult && (
					<>
						<Badge color="blue" size="lg">
							{topResult.displayName.text}
						</Badge>
						<TextInput
							label="Location name"
							placeholder={`${topResult.displayName.text} First Floor`}
							value={buildingName}
							onChange={(e) => setBuildingName(e.currentTarget.value)}
							mt={15}
						/>
						<Button fullWidth mt={15} onClick={handleAddLocation}>
							Add Location
						</Button>
					</>
				)}
			</Modal>
			<header className={classes.header}>
				<Group justify="space-between" h="100%">
					<Title order={2}>Fountain Guru</Title>
					{username && (
						<Group gap={0}>
							<TextInput w={450} placeholder="Find new location" value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} />
							<Button onClick={handleSearch}>Add Location </Button>
						</Group>
					)}
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
						<Group gap="sm">
							<Menu shadow="md" zIndex={1000} width={300} opened={menuOpened} onChange={setMenuOpened}>
								<Menu.Target>
									<Button variant="outline" rightSection={menuOpened ? <IconChevronsUp /> : <IconChevronsDown />}>
										@{username}
									</Button>
								</Menu.Target>

								<Menu.Dropdown>
									<Menu.Label>Actions</Menu.Label>
									<Menu.Item onClick={() => router.push('/profile')}>My Profile</Menu.Item>

									<Menu.Divider />

									{latestUserReview && (
										<>
											<Menu.Label>Latest Review</Menu.Label>
											<Menu.Item>
												<Review review={latestUserReview} abridged />
											</Menu.Item>
										</>
									)}
								</Menu.Dropdown>
							</Menu>

							<Button onClick={logout} color="red">
								Logout
							</Button>
						</Group>
					)}
				</Group>
			</header>
		</>
	);
}
