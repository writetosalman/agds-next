import { useEffect, useMemo, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateRangePicker } from '@ag.ds-next/react/date-range-picker';
import { FormStack } from '@ag.ds-next/react/form-stack';
import { GroupedFields } from '@ag.ds-next/react/grouped-fields';
import { Stack } from '@ag.ds-next/react/stack';
import { TimeInput } from '@ag.ds-next/react/time-input';
import { DeepPartial } from '../../../lib/types';
import { FormPageAlert } from '../FormPageAlert';
import { type ShallowErrors } from '../FormState';
import { StepActions } from '../StepActions';
import { useGlobalForm } from '../GlobalFormProvider';
import { FormContainer } from './FormContainer';
import { useFormContext } from './FormProvider';
import { step5FormSchema, type Step5FormSchema } from './FormState';

function transformDefaultValues(step?: DeepPartial<Step5FormSchema>) {
	const from = step?.tradingPeriod?.from;
	const to = step?.tradingPeriod?.to;
	return {
		...step,
		tradingPeriod: {
			from,
			to,
		},
	};
}

export function FormStep5() {
	const { formState, step5SetState, isSavingBeforeExiting } = useGlobalForm();
	const { submitStep } = useFormContext();
	const tradingPeriodFromRef = useRef<HTMLInputElement>(null);
	const tradingPeriodToRef = useRef<HTMLInputElement>(null);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Step5FormSchema>({
		defaultValues: transformDefaultValues(formState.steps?.step5),
		resolver: isSavingBeforeExiting ? undefined : zodResolver(step5FormSchema),
		mode: 'onSubmit',
		reValidateMode: 'onBlur',
	});

	const typeCorrectedErrors = errors as ShallowErrors<Step5FormSchema>;

	const onSubmit: SubmitHandler<Step5FormSchema> = async (data) => {
		if (isSavingBeforeExiting) {
			return;
		}
		await submitStep();
		step5SetState({
			...data,
			completed: !isSavingBeforeExiting,
			started: true,
		});
	};

	const hasErrors = useMemo(
		() => ({
			tradingPeriod: {
				both:
					Boolean(errors.tradingPeriod?.from?.message) &&
					Boolean(errors.tradingPeriod?.to?.message),
				from:
					Boolean(errors.tradingPeriod?.from?.message) &&
					!errors.tradingPeriod?.to?.message,
				to:
					!errors.tradingPeriod?.from?.message &&
					Boolean(errors.tradingPeriod?.to?.message),
			},
			hours: {
				both:
					Boolean(typeCorrectedErrors.openingTime?.message) &&
					Boolean(typeCorrectedErrors.closingTime?.message),
				from:
					Boolean(typeCorrectedErrors.openingTime?.message) &&
					!typeCorrectedErrors.closingTime?.message,
				to:
					!typeCorrectedErrors.openingTime?.message &&
					Boolean(typeCorrectedErrors.closingTime?.message),
			},
		}),
		[errors, typeCorrectedErrors]
	);

	const validErrors = [
		hasErrors.tradingPeriod.both,
		hasErrors.tradingPeriod.from,
		hasErrors.tradingPeriod.to,
		hasErrors.hours.both,
		hasErrors.hours.from,
		hasErrors.hours.to,
	].filter(Boolean);

	const showErrorAlert = validErrors.length > 1;

	useEffect(() => {
		if (hasErrors.tradingPeriod.both && validErrors.length === 1) {
			tradingPeriodFromRef?.current?.focus();
		} else if (hasErrors.tradingPeriod.from && validErrors.length === 1) {
			tradingPeriodFromRef?.current?.focus();
		} else if (hasErrors.tradingPeriod.to && validErrors.length === 1) {
			tradingPeriodToRef?.current?.focus();
		}
	}, [hasErrors, validErrors]);

	return (
		<FormContainer
			formTitle="Trading time"
			formIntroduction="What times would you like to operate?"
		>
			<Stack as="form" gap={3} onSubmit={handleSubmit(onSubmit)} noValidate>
				<FormStack>
					{showErrorAlert && (
						<FormPageAlert
							errors={{
								'date-range-picker-tradingPeriod-from': {
									message: hasErrors.tradingPeriod.both
										? 'Start date and End date are required'
										: errors.tradingPeriod?.from?.message,
								},
								'date-range-picker-tradingPeriod-to': {
									message: !hasErrors.tradingPeriod.both
										? errors.tradingPeriod?.to?.message
										: undefined,
								},
								openingTime: {
									message: hasErrors.hours.both
										? 'Opening time and Closing time are required'
										: typeCorrectedErrors.openingTime?.message,
								},
								closingTime: {
									message: hasErrors.hours.to
										? typeCorrectedErrors.closingTime?.message
										: undefined,
								},
							}}
						/>
					)}
					<Controller
						control={control}
						name="tradingPeriod"
						render={({ field: { ref, value, onChange, ...field } }) => (
							<DateRangePicker
								fromInputRef={tradingPeriodFromRef}
								toInputRef={tradingPeriodToRef}
								{...field}
								id="tradingPeriod"
								legend="Trading period"
								value={value}
								onChange={onChange}
								onFromInputChange={(from) => onChange({ ...value, from })}
								onToInputChange={(to) => onChange({ ...value, to })}
								fromInvalid={
									hasErrors.tradingPeriod.both || hasErrors.tradingPeriod.from
								}
								toInvalid={
									hasErrors.tradingPeriod.both || hasErrors.tradingPeriod.to
								}
								message={
									hasErrors.tradingPeriod.both
										? 'Start date and End date is required'
										: errors.tradingPeriod?.from?.message ||
										  errors.tradingPeriod?.to?.message
								}
								required
							/>
						)}
					/>
					<GroupedFields
						legend="Hours of operation"
						hideOptionalLabel
						hint="Provide the time you will open and close. For example, 3:00 pm - enter 12 am for midnight"
						field1Invalid={hasErrors.hours.both || hasErrors.hours.from}
						field2Invalid={hasErrors.hours.both || hasErrors.hours.to}
						message={
							hasErrors.hours.both
								? 'Opening time and Closing time is required'
								: typeCorrectedErrors.openingTime?.message ||
								  typeCorrectedErrors.closingTime?.message
						}
					>
						{({ field1Props, field2Props }) => (
							<>
								<Controller
									control={control}
									name="openingTime"
									render={({ field: { ref, ...field } }) => (
										<TimeInput
											autoComplete="on"
											label="Opening time"
											id="openingTime"
											ref={ref}
											{...field}
											{...field1Props}
											required
										/>
									)}
								/>
								<Controller
									control={control}
									name="closingTime"
									render={({ field: { ref, ...field } }) => (
										<TimeInput
											autoComplete="on"
											label="Closing time"
											id="closingTime"
											ref={ref}
											{...field}
											{...field2Props}
											required
										/>
									)}
								/>
							</>
						)}
					</GroupedFields>
				</FormStack>
				<StepActions />
			</Stack>
		</FormContainer>
	);
}
