export type SearchUsersQueryParam = {
	query: string;
	resolve?: boolean;
	limit?: number;
};

export type SearchUsersQueryKey = ['users', SearchUsersQueryParam];

export type ConversationsQueryParam = {
	max_id?: string | null;
};

export type ConversationsQueryKey = ['conversations'];
