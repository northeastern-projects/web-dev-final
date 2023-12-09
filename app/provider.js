'use client';

import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript, Loader, Center } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function Provider({ children }) {
	const ZustandProvider = ({ children }) => {
		const [isHydrated, setIsHydrated] = useState(false);

		// Wait till Next.js rehydration completes
		useEffect(() => {
			setIsHydrated(true);
		}, []);

		if (!isHydrated) {
			return (
				<Center w="100vw" h="100vh">
					<Loader />
				</Center>
			);
		}

		return <div>{children}</div>;
	};

	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider>
					<ZustandProvider>{children}</ZustandProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
