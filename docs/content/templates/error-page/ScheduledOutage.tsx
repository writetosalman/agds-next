import { Callout } from '@ag.ds-next/react/callout';
import { PageContent } from '@ag.ds-next/react/content';
import { Prose } from '@ag.ds-next/react/prose';
import { Stack } from '@ag.ds-next/react/stack';
import { Text } from '@ag.ds-next/react/text';
import { tokens } from '@ag.ds-next/react/core';

export const ScheduledOutage = () => {
	return (
		<PageContent>
			<Stack gap={1.5} maxWidth={tokens.maxWidth.bodyText}>
				<Prose>
					<h1>There&apos;s a problem with the Export Service</h1>
					<p>
						Relationship Autorisation Manager (RAM) is down for system
						maintenance from 11:30 pm, 15 October to 7pm, 16 October.
					</p>
					<p>
						During this time you can&apos;t create an account or sign into the
						Export Service. Please try again later.
					</p>
				</Prose>
				<Callout title="Need help?">
					<Prose>
						<p>
							Call <strong>000 000 000</strong> (9am to 5pm AEST Monday to
							Friday)
							<br />
							Email{' '}
							<a href="mailto:emailaccount@agriculture.gov.au">
								emailaccount@agriculture.gov.au
							</a>
						</p>
					</Prose>
				</Callout>
				<Text color="muted">Error code: 503</Text>
			</Stack>
		</PageContent>
	);
};