import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useFavouriteMutation } from '@/hooks/mutations/feed.mutation';
import { useActiveDomainStore } from '@/store/feed/activeDomain';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import {
	FavouriteQueryKeys,
	updateFavouriteCacheData,
	updateFavouriteForDescendentReply,
	updateFavouriteStatus,
} from '@/util/cache/favourite/favouriteCache';
import { getCacheQueryKeys } from '@/util/cache/queryCacheHelper';
import customColor from '@/util/constant/color';
import { HeartOutlineIcon } from '@/util/svg/icon.common';
import { TouchableOpacity, ViewProps } from 'react-native';

type Props = {
	status: Pathchwork.Status;
} & ViewProps;

const StatusFavourtieButton = ({ status, ...props }: Props) => {
	const currentFeed = useCurrentActiveFeed();
	const { setActiveFeed } = useActiveFeedAction();
	const { domain_name } = useActiveDomainStore();

	const { mutate } = useFavouriteMutation({
		onMutate: async ({ status }) => {
			if (currentFeed) {
				const updateFeedDatailData = updateFavouriteStatus(currentFeed);
				status.id == currentFeed.id && setActiveFeed(updateFeedDatailData);
			}
			const queryKeys = getCacheQueryKeys<FavouriteQueryKeys>(
				status.account.id,
				status.in_reply_to_id,
			);
			updateFavouriteCacheData({
				response: status,
				queryKeys,
			});
			updateFavouriteForDescendentReply(
				currentFeed?.id || '',
				domain_name,
				status.id,
			);
		},
	});

	const handleFavourite = () => {
		mutate({ status });
	};

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="flex flex-row items-center gap-1"
			{...props}
			onPress={handleFavourite}
		>
			<HeartOutlineIcon
				stroke={
					status.favourited
						? customColor['patchwork-red-50']
						: customColor['patchwork-grey-100']
				}
				fill={status.favourited ? customColor['patchwork-red-50'] : 'none'}
			/>
			<ThemeText variant="textGrey">{status.favourites_count}</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusFavourtieButton;
