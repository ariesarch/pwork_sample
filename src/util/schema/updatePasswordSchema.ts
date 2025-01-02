import * as yup from 'yup';

export const updatePasswordSchema = yup.object({
	currentPassword: yup
		.string()
		.required('Current password is required')
		.min(6, 'Current password must be at least 6 characters long'),
	newPassword: yup
		.string()
		.required('New password is required')
		.min(6, 'New password must be at least 6 characters long')
		.notOneOf(
			[yup.ref('currentPassword')],
			'New password cannot be the same as the current password',
		),
	repeatNewPassword: yup
		.string()
		.required('Please confirm your new password')
		.oneOf([yup.ref('newPassword')], 'Passwords must match'),
});
