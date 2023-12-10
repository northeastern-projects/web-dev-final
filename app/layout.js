import Provider from './provider';

export const metadata = {
	title: 'Fountain Guru',
	description: 'Web dev final project'
};

export default function RootLayout({ children }) {
	return <Provider>{children}</Provider>;
}
