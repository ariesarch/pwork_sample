import * as yup from 'yup';

export const resetPasswordSchema = yup.object().shape({
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters long')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm Password is required'),
});
