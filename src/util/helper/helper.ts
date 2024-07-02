/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const handleError = (error: any) => {
	return Promise.reject({
		status: error?.response.status,
		message:
			error?.response.data?.error || error?.response.message || 'Unknown error',
	});
};
