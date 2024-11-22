export type GetUserQueryParam = {
	id: string;
};

export type LoginMutationPayload = {
	username: string;
	password: string;
};

export type VerifyAuthTokenQueryKey = ['verify-token'];

export type GetUserQueryKey = ['user', GetUserQueryParam];
