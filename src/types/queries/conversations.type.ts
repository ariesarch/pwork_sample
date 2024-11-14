export type SearchUsersQueryParam = {
	query: string;
	resolve?: boolean;
	limit?: number;
};

export type SearchUsersQueryKey = ['users', SearchUsersQueryParam];
