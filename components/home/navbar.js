import { Group, Button, Title, TextInput, Menu, Drawer, Divider, Burger } from '@mantine/core';
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
import Search from './search';

export function Navbar() {
	const router = useRouter();
	const [{ username, _id, privileges }, logout, getSearchResults, { top }, fetchUserReviews, userReviews, clearSearchResults] = useStore(
		useShallow((state) => [
			state.user,
			state.logout,
			state.getSearchResults,
			state.search,
			state.fetchUserReviews,
			state.userReviews,
			state.clearSearchResults
		])
	);
	const [searchTerm, setSearchTerm] = useState('');
	const [opened, { open, close }] = useDisclosure(false);
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const [menuOpened, setMenuOpened] = useState(false);

	const [buildingName, setBuildingName] = useState('');
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

		getSearchResults(searchTerm);
	};

	const cleanClose = () => {
		setSearchTerm('');
		setBuildingName('');
		clearSearchResults();
		close();
	};

	useEffect(() => {
		if (_id) fetchUserReviews(_id);
		if (privileges !== '*' && userReviews.length > 0) {
			setLatestUserReview(userReviews.pop());
		}
	}, [userReviews, _id]);

	useEffect(() => {
		if (top) open();
	}, [top]);

	const navbarItems = <Title order={2}>Fountain Guru</Title>;
	const navbarSearch = (
		<>
			{username && (
				<Group gap={0}>
					<TextInput w={350} placeholder="Find new location" value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} />
					<Button onClick={handleSearch}>Add Location </Button>
				</Group>
			)}
		</>
	);
	const navbarButtons = (
		<>
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
							{privileges === '*' && <Menu.Item onClick={() => router.push('/admin')}>Administration</Menu.Item>}

							{latestUserReview && (
								<>
									<Menu.Divider />
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
		</>
	);

	return (
		<>
			<Search opened={opened} close={cleanClose} buildingName={buildingName} setBuildingName={setBuildingName} />
			<header className={classes.header}>
				<Group justify="space-between" h="100%" visibleFrom="md">
					{navbarItems}
					{navbarSearch}
					{navbarButtons}
				</Group>
				<Burger opened={drawerOpened} onClick={toggleDrawer} mt={10} hiddenFrom="md" />
			</header>
			<Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" title="Navigation" hiddenFrom="md" zIndex={1000}>
				{navbarItems}

				<Divider my="sm" />

				{navbarSearch}

				<Divider my="sm" />

				<Group justify="center" grow pb="xl" px="md">
					{navbarButtons}
				</Group>
			</Drawer>
		</>
	);
}
