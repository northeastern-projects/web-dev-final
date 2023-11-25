import Provider from './provider';

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({ children }) {
	return <Provider>{children}</Provider>;
}
