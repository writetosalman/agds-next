import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormStack } from '@ag.ds-next/form-stack';
import { useFormExampleMultiStep } from './FormExampleMultiStep';
import { FormExampleMultiStepFieldset } from './FormExampleMultiStepFieldset';
import { FormExampleMultiStepActions } from './FormExampleMultiStepActions';
import { DatePicker } from '@ag.ds-next/date-picker';
import { FormExampleMultiStepContainer } from './FormExampleMultiStepContainer';

const formSchema = yup
	.object({
		date: yup.date().required('Select a date'),
	})
	.required();

type FormSchema = yup.InferType<typeof formSchema>;

export const formExampleMultiStep2ValuesMap: Record<keyof FormSchema, string> =
	{
		date: 'Select a date',
	};

export const FormExampleMultiStep2 = () => {
	const { next, stepFormState } = useFormExampleMultiStep();

	const { control, handleSubmit } = useForm<FormSchema>({
		defaultValues: stepFormState,
		resolver: yupResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		next(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormExampleMultiStepFieldset
				title="Select date (H1)"
				subTitle="The introductory paragraph provides context about this page of the form. Use a short paragraph to reduce cognitive load."
			>
				<FormExampleMultiStepContainer>
					<FormStack>
						<Controller
							control={control}
							name="date"
							render={({
								field: { onChange, onBlur, value, name },
								fieldState: { invalid, error },
							}) => (
								<DatePicker
									label="Select a date"
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									name={name}
									invalid={invalid}
									message={error?.message}
									maxWidth="xl"
									required
								/>
							)}
						/>
						<FormExampleMultiStepActions />
					</FormStack>
				</FormExampleMultiStepContainer>
			</FormExampleMultiStepFieldset>
		</form>
	);
};