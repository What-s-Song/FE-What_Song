import type { Preview } from '@storybook/react';
import '../src/app/styles/globals.css';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
			options: {
				storySort: (a, b) =>
					a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
			},
		},
	},
};

export default preview;