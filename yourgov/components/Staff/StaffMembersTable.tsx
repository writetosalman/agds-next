import { RefObject, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@ag.ds-next/react/src/stack';
import { Button } from '@ag.ds-next/react/src/button';
import { useTernaryState } from '@ag.ds-next/react/src/core';
import { FilterIcon } from '@ag.ds-next/react/src/icon';
import { Box } from '@ag.ds-next/react/src/box';
import { Text } from '@ag.ds-next/react/text';
import { SectionAlert } from '@ag.ds-next/react/section-alert';
import { DataProvider, SortAndFilterProvider } from './lib/contexts';
import { useSortAndFilter } from './lib/useSortAndFilter';
import { useFetchData } from './lib/useFetchData';
import { ActiveFilters } from './ActiveFilters';
import { SortBySelect } from './SortBySelect';
import { DataTable } from './DataTable';
import { DashboardFilterDrawer } from './DashboardFilterDrawer';
import { FilterSearchInput } from './FilterSearchInput';
import { FilterBar, FilterBarGroup, FilterRegion } from './FilterBar';
import { DashboardPagination } from './DashboardPagination';
import { DataTableSelectAllCheckbox } from './DataTableSelectAllCheckbox';
import { FilterSwitchInput } from './FilterSwitchInput';
import { useStaffGlobalState } from './StaffProvider';

type StaffMembersTableProps = {
	selectable?: boolean;
	tableRef?: RefObject<HTMLTableElement>;
};

const headingId = 'staff-members-heading';

const successTypeToMessageText = {
	invite: {
		description: 'will receive an email asking them to create a staff account.',
		titlePrefix: 'An email invitation has been sent to',
		titleSuffix: '',
	},
	update: {
		description: null,
		titlePrefix: '',
		titleSuffix: 'has been updated',
	},
	pause: {
		description: null,
		titlePrefix: '',
		titleSuffix: 'has been paused as a staff member',
	},
	pauseBatch: {
		description: null,
		titlePrefix: '',
		titleSuffix: 'have been paused as staff members',
	},
	remove: {
		description: null,
		titlePrefix: '',
		titleSuffix: 'has been removed as a staff member',
	},
	removeBatch: {
		description: null,
		titlePrefix: '',
		titleSuffix: 'have been removed as a staff members',
	},
};

export type successType = keyof typeof successTypeToMessageText;

export const StaffMembersTable = ({
	selectable,
	tableRef,
}: StaffMembersTableProps) => {
	const router = useRouter();
	const pageAlertElement = useRef<HTMLDivElement>(null);

	const { staffMembersGetState, staffMembersDelete } = useStaffGlobalState();

	const [isDrawerOpen, openDrawer, closeDrawer] = useTernaryState(false);
	const sortAndFilter = useSortAndFilter();
	const { filters, pagination, sort } = sortAndFilter;
	const data = useFetchData({
		filters,
		pagination,
		sort,
	});

	const [successMessageType, setSuccessMessageType] =
		useState<null | successType>(router.query.successType as successType);
	const [updatedStaffMemberName, setUpdatedStaffMemberName] = useState(() => {
		const updatedStaffMember = staffMembersGetState().find(
			(staffMember) => router.query.staffId === staffMember?.id
		);

		// If removing a staff member from another page, wait until arriving back here as this
		// will prevent a flash of the not-found page and ensure the name of the removed staff
		// member is still available for the success message before deletion.
		if (updatedStaffMember && router.query.successType === 'remove')
			staffMembersDelete(updatedStaffMember);

		return updatedStaffMember?.name || '';
	});

	return (
		<SortAndFilterProvider value={sortAndFilter}>
			<DataProvider
				value={{
					...data,
					setSuccessMessageType,
					setUpdatedStaffMemberName,
				}}
			>
				<div
					css={{
						display:
							successMessageType && updatedStaffMemberName ? 'block' : 'none',
					}}
				>
					<SectionAlert
						focusOnMount
						onClose={() => {
							setSuccessMessageType(null);
							router.replace(router.pathname, undefined, { shallow: true });
						}}
						ref={pageAlertElement}
						title={
							successMessageType
								? `${successTypeToMessageText[successMessageType].titlePrefix} ${updatedStaffMemberName} ${successTypeToMessageText[successMessageType].titleSuffix}`
								: ''
						}
						tone="success"
					>
						{successMessageType &&
							successTypeToMessageText[successMessageType].description && (
								<Text as="p">
									{updatedStaffMemberName}{' '}
									{successTypeToMessageText[successMessageType].description}
								</Text>
							)}
					</SectionAlert>
				</div>
				<Stack gap={0}>
					<FilterRegion>
						<FilterBar>
							<FilterBarGroup>
								<FilterSearchInput />

								<FilterSwitchInput />

								<Button
									onClick={openDrawer}
									variant="secondary"
									iconBefore={FilterIcon}
								>
									Show filters
								</Button>
							</FilterBarGroup>

							<SortBySelect />
						</FilterBar>

						<DashboardFilterDrawer
							isDrawerOpen={isDrawerOpen}
							closeDrawer={closeDrawer}
						/>

						<ActiveFilters />
					</FilterRegion>

					{selectable && !!data.totalItems && (
						<Box borderBottom padding={1}>
							<DataTableSelectAllCheckbox />
						</Box>
					)}

					<DataTable
						headingId={headingId}
						pageAlertElement={pageAlertElement?.current}
						ref={tableRef}
						selectable={selectable}
					/>
				</Stack>

				<DashboardPagination />
			</DataProvider>
		</SortAndFilterProvider>
	);
};