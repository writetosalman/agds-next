import { PageTemplate } from '../../../.storybook/components/PageTemplate';
import { SinglePageFormPage } from './SinglePageForm';
import { SinglePageFormSuccess } from './SinglePageFormSuccess';

export default {
	title: 'Templates/Single-page Form',
};

export const FormPage = () => {
	return (
		<PageTemplate>
			<SinglePageFormPage />
		</PageTemplate>
	);
};

export const SuccessPage = () => {
	return (
		<PageTemplate>
			<SinglePageFormSuccess />
		</PageTemplate>
	);
};