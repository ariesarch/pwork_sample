export type GetUserQueryParam = {
	id: string;
};

export type LoginMutationPayload = {
	username: string;
	password: string;
};

export type GetUserQueryKey = ['user', GetUserQueryParam];
