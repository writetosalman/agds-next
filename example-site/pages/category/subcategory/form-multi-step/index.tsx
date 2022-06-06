import type { NextPage } from 'next';
import { PageContent } from '@ag.ds-next/content';
import { Columns, Column } from '@ag.ds-next/columns';
import { ButtonLink } from '@ag.ds-next/button';
import { Body } from '@ag.ds-next/body';
import { Breadcrumbs } from '@ag.ds-next/breadcrumbs';
import { Stack } from '@ag.ds-next/box';
import { TextLinkExternal } from '@ag.ds-next/text';
import { AppLayout } from '../../../../components/AppLayout';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import { FormExampleMultiStepCallout } from '../../../../components/FormExampleMultiStep/FormExampleMultiStepCallout';
import { PageTitle } from '../../../../components/PageTitle';

const FormMultiStepPage: NextPage = () => {
	return (
		<>
			<DocumentTitle title="Multi-step form example" />
			<AppLayout
				template={{ name: 'Multi-step form', slug: 'multi-step-form' }}
			>
				<PageContent>
					<Columns>
						<Column columnSpan={{ xs: 12, md: 8 }}>
							<Stack gap={3}>
								<Breadcrumbs
									links={[
										{ href: '/', label: 'Home' },
										{ href: '/category', label: 'Category 1' },
										{
											href: '/category/subcategory',
											label: 'Subcategory page',
										},
										{ label: 'Multi-step form' },
									]}
								/>
								<PageTitle
									title="Multi-step form title (H1)"
									introduction="The introductory paragraph provides context about the entire multi-step form. Use a short paragraph to reduce cognitive load."
								/>
								<Body>
									<h2>Multi-step form subheading (H2)</h2>
									<p>Multi-step form subheading content</p>
									<hr aria-hidden="true" />
									<ButtonLink href="/category/subcategory/form-multi-step/form">
										Start form
									</ButtonLink>
									<h2>More information section heading (H2)</h2>
									<h3>More information link list heading (H3)</h3>
									<ul>
										<li>
											<TextLinkExternal href="#">
												Meaningful link label that shows link purpose
											</TextLinkExternal>
										</li>
										<li>
											<TextLinkExternal href="#">
												Meaningful link label that shows link purpose
											</TextLinkExternal>
										</li>
										<li>
											<TextLinkExternal href="#">
												Meaningful link label that shows link purpose
											</TextLinkExternal>
										</li>
									</ul>
									<h3>More information link list heading (H3)</h3>
									<ul>
										<li>
											<TextLinkExternal href="#">
												Meaningful link label that shows link purpose
											</TextLinkExternal>
										</li>
										<li>
											<TextLinkExternal href="#">
												Meaningful link label that shows link purpose
											</TextLinkExternal>
										</li>
										<li>
											<TextLinkExternal href="#">
												Meaningful link label that shows link purpose
											</TextLinkExternal>
										</li>
									</ul>
								</Body>
								<FormExampleMultiStepCallout />
							</Stack>
						</Column>
					</Columns>
				</PageContent>
			</AppLayout>
		</>
	);
};

export default FormMultiStepPage;