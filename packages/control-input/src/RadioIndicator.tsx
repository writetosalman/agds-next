import { Flex } from '@ag.ds-next/box';
import { boxPalette, packs, themeVars } from '@ag.ds-next/core';
import { ControlSize } from './utils';

export type RadioIndicatorProps = {
	disabled?: boolean;
	invalid?: true;
	size: ControlSize;
	valid?: true;
};

export const RadioIndicator = ({
	disabled,
	invalid,
	size,
	valid,
}: RadioIndicatorProps) => (
	<Flex
		justifyContent="center"
		alignItems="center"
		css={{
			...packs.control[size],
			position: 'relative',
			borderRadius: '100%',
			borderStyle: 'solid',
			borderColor: boxPalette.foregroundText,
			opacity: disabled ? 0.3 : undefined,

			...(invalid
				? {
						borderColor: `var(${themeVars.error})`,
				  }
				: valid
				? {
						borderColor: `var(${themeVars.success})`,
				  }
				: undefined),
		}}
	>
		<div
			css={{
				display: 'none',
				width: `calc(100% - 8px)`,
				height: `calc(100% - 8px)`,
				background: disabled ? boxPalette.border : boxPalette.foregroundText,
				borderRadius: '100%',
			}}
		/>
	</Flex>
);