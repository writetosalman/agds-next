import { useRouter } from 'next/router';
import { Logo } from '@ag.ds-next/react/ag-branding';
import { Stack } from '@ag.ds-next/react/box';
import { Header } from '@ag.ds-next/react/header';
import { AvatarIcon } from '@ag.ds-next/react/icon';
import { MainNav, MainNavBottomBar } from '@ag.ds-next/react/main-nav';
import { SiteHeaderSearch } from './SiteHeaderSearch';

const NAV_ITEMS = {
	primary: [
		{ label: 'Home', href: '/' },
		{ label: 'Category 1', href: '/category' },
	],
	secondary: [
		{
			label: 'Sign In',
			href: '/sign-in-form',
			endElement: <AvatarIcon />,
		},
	],
};

export const SiteHeader = ({ focusMode }: { focusMode: boolean }) => {
	const router = useRouter();
	return (
		<Stack palette="dark">
			<Header
				background="bodyAlt"
				logo={<Logo />}
				heading="Export Service"
				subline="Supporting Australian agricultural exports"
				rightContent={<SiteHeaderSearch />}
			/>

			{!focusMode ? (
				<MainNav
					id="main-nav"
					activePath={router.asPath}
					items={NAV_ITEMS.primary}
					secondaryItems={NAV_ITEMS.secondary}
				/>
			) : (
				<MainNavBottomBar />
			)}
		</Stack>
	);
};
