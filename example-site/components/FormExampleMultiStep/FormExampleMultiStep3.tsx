import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormStack } from '@ag.ds-next/form-stack';
import { useFormExampleMultiStep } from './FormExampleMultiStep';
import { Body } from '@ag.ds-next/body';
import { PageAlert } from '@ag.ds-next/page-alert';
import { useScrollToField } from '@ag.ds-next/field';
import { useEffect, useRef, useState } from 'react';
import { Checkbox, ControlGroup } from '@ag.ds-next/control-input';
import { FormExampleMultiStepFieldset } from './FormExampleMultiStepFieldset';
import { FormExampleMultiStepActions } from './FormExampleMultiStepActions';
import { TextInput } from '@ag.ds-next/text-input';
import { Box } from '@ag.ds-next/box';
import { mapSpacing } from '@ag.ds-next/core';
import { FormExampleMultiStepContainer } from './FormExampleMultiStepContainer';

const formSchema = yup
	.object({
		checkboxA: yup.boolean(),
		checkboxB: yup.boolean(),
		checkboxC: yup.boolean(),
		checkboxD: yup.boolean(),
		conditionalField: yup.string().when('checkboxB', {
			is: true,
			then: yup.string().required('Nested field is required'),
		}),
	})
	.test('checkbox test', (obj) => {
		// All good if at least 1 checkbox is checked
		if (obj.checkboxA || obj.checkboxB || obj.checkboxC || obj.checkboxD) {
			return true;
		}
		return new yup.ValidationError(
			'Please check at least 1 option',
			null,
			'checkbox-fieldset'
		);
	})
	.required();

type FormSchema = yup.InferType<typeof formSchema>;

export const formExampleMultiStep3ValuesMap: Record<keyof FormSchema, string> =
	{
		checkboxA: 'Checkbox label A',
		checkboxB: 'Checkbox label B',
		checkboxC: 'Checkbox label C',
		checkboxD: 'Checkbox label D',
		conditionalField: 'Nested field',
	};

export const FormExampleMultiStep3 = () => {
	const { next, stepFormState } = useFormExampleMultiStep();
	const scrollToField = useScrollToField();
	const errorRef = useRef<HTMLDivElement>(null);
	const [focusedError, setFocusedError] = useState(false);

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormSchema>({
		defaultValues: stepFormState,
		resolver: yupResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		setFocusedError(false);
		next(data);
	};

	const onError = () => {
		setFocusedError(false);
	};

	const hasErrors = Boolean(Object.keys(errors).length);

	useEffect(() => {
		if (hasErrors && !focusedError) {
			errorRef.current?.focus();
			setFocusedError(true);
		}
	}, [hasErrors, focusedError, errors]);

	const showConditionalField = watch('checkboxB');

	return (
		<form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormExampleMultiStepFieldset
				title="Conditional reveal title (H1)"
				subTitle="The introductory paragraph provides context about this page of the form. Use a short paragraph to reduce cognitive load."
			>
				<FormExampleMultiStepContainer>
					<FormStack>
						{hasErrors && (
							<PageAlert
								ref={errorRef}
								tone="error"
								title="There is a problem"
								tabIndex={-1}
							>
								<Body>
									<p>Please correct the following fields and try again</p>
									<ul>
										{Object.entries(errors).map(([key, value]) => (
											<li key={key}>
												<a href={`#${key}`} onClick={scrollToField}>
													{value.message}
												</a>
											</li>
										))}
									</ul>
								</Body>
							</PageAlert>
						)}
						<ControlGroup
							id="checkbox-fieldset"
							label="Checkbox fieldset question?"
							hint="Provide a hint here"
							required
							block
						>
							<Checkbox
								{...register('checkboxA')}
								invalid={Boolean(errors.checkboxA?.message)}
							>
								Checkbox label A
							</Checkbox>
							<Checkbox
								{...register('checkboxB')}
								invalid={Boolean(errors.checkboxB?.message)}
							>
								Checkbox label B
							</Checkbox>
							{showConditionalField ? (
								<Box
									borderLeft
									borderLeftWidth="xl"
									paddingLeft={1.5}
									css={{ marginLeft: mapSpacing(1) }}
								>
									<TextInput
										id="conditionalField"
										label="Nested field"
										hint="Hint text"
										{...register('conditionalField')}
										invalid={Boolean(errors.conditionalField?.message)}
										required
									/>
								</Box>
							) : null}
							<Checkbox
								{...register('checkboxC')}
								invalid={Boolean(errors.checkboxC?.message)}
							>
								Checkbox label C
							</Checkbox>
							<Checkbox
								{...register('checkboxD')}
								invalid={Boolean(errors.checkboxD?.message)}
							>
								Checkbox label D
							</Checkbox>
						</ControlGroup>
						<FormExampleMultiStepActions />
					</FormStack>
				</FormExampleMultiStepContainer>
			</FormExampleMultiStepFieldset>
		</form>
	);
};