import { useStore } from '@/contexts/store';
import { Button, TextInput, Modal, Badge, Text } from '@mantine/core';
import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';

export default function Search({ opened, close, buildingName, setBuildingName }) {
	const [{ top }, addLocation] = useStore(useShallow((state) => [state.search, state.addLocation]));

	if (!top) {
		return null;
	}

	const handleAddLocation = () => {
		addLocation({
			building: top.displayName.text,
			name: buildingName,
			place_id: top.id,
			position: {
				lat: top.location.latitude,
				lng: top.location.longitude
			}
		});
		close();
	};

	return (
		<Modal opened={opened} onClose={close} zIndex={10000} title="Search Results">
			<Text c="dimmed" fz="sm">
				Click to see details
			</Text>
			<Link href={`/details/${top.id}`}>
				<Badge color="blue" size="lg">
					{top.displayName.text}
				</Badge>
			</Link>
			<TextInput
				label="Location name"
				placeholder={`${top.displayName.text} First Floor`}
				value={buildingName}
				onChange={(e) => setBuildingName(e.currentTarget.value)}
				mt={15}
			/>
			<Button fullWidth mt={15} onClick={handleAddLocation}>
				Add Location
			</Button>
		</Modal>
	);
}
