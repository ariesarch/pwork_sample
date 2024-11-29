import { useSelectedDomain } from '@/store/feed/activeDomain';
import { useFeedDetailQuery } from '../queries/feed.queries';
import { useCurrentActiveFeed } from '@/store/feed/activeFeed';

const useFeedItemResolver = (feedId: string) => {
	const currentFeed = useCurrentActiveFeed();
	const shouldFetch = currentFeed?.id !== feedId;
	const domain_name = useSelectedDomain();

	const { data: feedDetail } = useFeedDetailQuery({
		domain_name,
		id: feedId,
		options: {
			enabled: shouldFetch,
		},
	});

	return shouldFetch ? (feedDetail as Pathchwork.Status) : currentFeed;
};
export default useFeedItemResolver;
