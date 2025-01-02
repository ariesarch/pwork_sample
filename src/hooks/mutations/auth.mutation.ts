import {
	forgetPWVerifyOTP,
	login,
	requestForgotPassword,
	resetPassword,
	revokeToken,
} from '@/services/auth.service';
import { LoginMutationPayload } from '@/types/queries/auth.type';
import {
	MutationOptions,
	useMutation,
	UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useLoginEmailMutation = (
	options: UseMutationOptions<
		Pathchwork.LoginRespone,
		AxiosError,
		LoginMutationPayload
	>,
) => {
	return useMutation({ mutationFn: login, ...options });
};

export const useForgotPWMutation = (
	options: UseMutationOptions<
		{ reset_password_token: string },
		AxiosError,
		{ email: string }
	>,
) => {
	return useMutation({ mutationFn: requestForgotPassword, ...options });
};

export const useOTPVerificationMutation = (
	options: UseMutationOptions<
		{ message: string },
		AxiosError,
		{
			id: string;
			otp_secret: string;
		}
	>,
) => {
	return useMutation({ mutationFn: forgetPWVerifyOTP, ...options });
};

export const useResetPWMutation = (
	options: UseMutationOptions<
		{
			message: string;
		},
		AxiosError,
		{
			reset_password_token: string;
			password: string;
			password_confirmation: string;
		}
	>,
) => {
	return useMutation({ mutationFn: resetPassword, ...options });
};

export const useTokenRevokeMutation = (
	options: UseMutationOptions<{}, AxiosError, { token: string }>,
) => {
	return useMutation({ mutationFn: revokeToken, ...options });
};
