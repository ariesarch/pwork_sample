export type SearchUsersQueryParam = {
	query: string;
	resolve?: boolean;
	limit?: number;
};

export type SearchUsersQueryKey = ['users', SearchUsersQueryParam];

export type ConversationsQueryParam = {
	max_id?: string | null;
	limit?: number;
	since_id?: string | null;
	min_id?: string | null;
};

export type ConversationsQueryKey = ['conversations', ConversationsQueryParam];

export type PaginatedResponse<T, P extends object = {}> = {
	pageParams: P;
	pages: T[];
};
