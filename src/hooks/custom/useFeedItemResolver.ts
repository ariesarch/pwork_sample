import { useSelectedDomain } from '@/store/feed/activeDomain';
import { useFeedDetailQuery } from '../queries/feed.queries';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import { useEffect } from 'react';

const useFeedItemResolver = (feedId: string) => {
	const currentFeed = useCurrentActiveFeed();
	const { setActiveFeed } = useActiveFeedAction();
	const shouldFetch = currentFeed?.id !== feedId;
	const domain_name = useSelectedDomain();

	const { data: feedDetail } = useFeedDetailQuery({
		domain_name,
		id: feedId,
		options: {
			enabled: shouldFetch,
		},
	});

	useEffect(() => {
		if (shouldFetch && currentFeed == undefined && feedDetail) {
			setActiveFeed(feedDetail as Pathchwork.Status);
		}
	}, [shouldFetch, currentFeed, feedDetail]);

	return shouldFetch ? (feedDetail as Pathchwork.Status) : currentFeed;
};
export default useFeedItemResolver;
