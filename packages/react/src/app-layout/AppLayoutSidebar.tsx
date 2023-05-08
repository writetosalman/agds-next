import { Fragment } from 'react';
import { tokens } from '../core';
import { Stack } from '../box';
import { AppLayoutSidebarNav, NavItem } from './AppLayoutSidebarNav';
import { useAppLayoutContext } from './AppLayoutContext';
import { AppLayoutSidebarDialog } from './AppLayoutSidebarDialog';

export type AppLayoutSidebarProps = {
	/** Used for highlighting the active element. */
	activePath?: string;
	/** Groups of navigation items to display. */
	items: NavItem[][];
};

export function AppLayoutSidebar({ activePath, items }: AppLayoutSidebarProps) {
	const { focusMode } = useAppLayoutContext();
	return (
		<Fragment>
			{/* Desktop */}
			<Stack
				as="aside"
				gap={1}
				background="bodyAlt"
				borderRight
				borderColor="muted"
				flexGrow={1}
				css={{
					display: 'none',
					width: tokens.maxWidth.mobileMenu,
					[tokens.mediaQuery.min.lg]: {
						display: focusMode ? 'none' : 'flex',
					},
				}}
			>
				<AppLayoutSidebarNav
					activePath={activePath}
					items={items}
					css={{ position: 'sticky', top: 0 }}
				/>
			</Stack>
			{/* Mobile */}
			<AppLayoutSidebarDialog>
				<AppLayoutSidebarNav activePath={activePath} items={items} />
			</AppLayoutSidebarDialog>
		</Fragment>
	);
}