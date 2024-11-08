import { GetChannelFeedQueryKey } from '@/types/queries/channel.type';
import { AccountDetailFeedQueryKey } from '@/types/queries/feed.type';
import { NavigationProp } from '@react-navigation/native';

const useHandleOnPressStatus = (
	feed: Pathchwork.Status[],
	navigation: NavigationProp<any>,
	queryKey?: GetChannelFeedQueryKey | AccountDetailFeedQueryKey,
) => {
	return (itemId: string) => {
		const index = feed.findIndex(feedItem => feedItem.id === itemId);
		if (index < 100) {
			navigation.navigate('FeedDetail', {
				id: itemId,
				selectedFeedIndex: index,
				queryKey,
			});
		} else {
			navigation.navigate('FeedDetail', { id: itemId });
		}
	};
};

export default useHandleOnPressStatus;
