import { ReactNode } from 'react';
import { Flex } from '@ag.ds-next/box';
import { Text, TextLink } from '@ag.ds-next/text';
import { Icon } from '@ag.ds-next/icon';
import { boxPalette } from '@ag.ds-next/core';

export type ProgressIndicatorItemStatus = 'doing' | 'todo' | 'done';

export type ProgressIndicatorItemProps = {
	children: ReactNode;
	href: string;
	status: ProgressIndicatorItemStatus;
};

export const ProgressIndicatorItem = ({
	children,
	href,
	status,
}: ProgressIndicatorItemProps) => {
	const active = status === 'doing';
	return (
		<li css={{ position: 'relative' }}>
			{active ? (
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						bottom: 0,
						width: 3,
						backgroundColor: boxPalette.foregroundAction,
					}}
				/>
			) : null}
			<Flex
				as={TextLink}
				href={href}
				alignItems="center"
				gap={0.75}
				padding={0.75}
				borderBottom
				color="text"
				fontWeight={active ? 'bold' : 'normal'}
				css={{
					position: 'relative',
					textDecoration: 'none',
					'&:hover': {
						backgroundColor: boxPalette.backgroundShade,
					},
				}}
			>
				<Icon icon={statusIconMap[status]} size={1.5} color="action" />
				<Flex flexDirection="column" gap={0}>
					<Text color="muted" fontSize="xs" lineHeight="nospace">
						{statusLabelMap[status]}
					</Text>
					{children}
				</Flex>
			</Flex>
		</li>
	);
};

const statusIconMap = {
	doing: 'progressDoing',
	todo: 'progressTodo',
	done: 'progressDone',
} as const;

const statusLabelMap = {
	doing: 'Doing',
	todo: 'Todo',
	done: 'Done',
} as const;