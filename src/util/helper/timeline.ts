export type PagedResponse<T = unknown> = {
	data: T;
	links?: {
		prev?: { min_id: string } | { offset: string };
		next?: { max_id: string } | { offset: string };
	};
};
