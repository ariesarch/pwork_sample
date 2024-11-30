interface CacheUpdateParams<TResponse, TQueryKeys> {
	response: TResponse;
	queryKeys: TQueryKeys[];
}
interface IFeedQueryFnData {
	pageParams: unknown[];
	pages: Array<{
		data: Pathchwork.Status[];
	}>;
}

interface IFeedDetailQueryFnData extends Pathchwork.Status {}
