'use client';

import { Navbar } from '@/components/home/navbar';
import { Stack } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function Home() {
	const Map = useMemo(() => dynamic(() => import('@/components/home/map'), { ssr: false }), []);

	return (
		<Stack gap={0} style={{ height: '100vh', overflow: 'hidden' }}>
			<Navbar />
			<Map position={[42.338, -71.088]} zoom={18} />
		</Stack>
	);
}
