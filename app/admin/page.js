import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';

export default function AdminPage() {
	const router = useRouter();
	const { role } = useStore((state) => state.user);

	if (role !== 'ADMIN') {
		router.push('/');
		return null;
	}

	return (
		<div>
			<h1>Admin Page</h1>
		</div>
	);
}
