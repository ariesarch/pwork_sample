import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useFavouriteMutation } from '@/hooks/mutations/feed.mutation';
import { useActiveDomainStore } from '@/store/feed/activeDomain';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import { useSubchannelStatusActions } from '@/store/feed/subChannelStatusStore';
import {
	FavouriteQueryKeys,
	updateFavouriteCacheData,
	updateFavouriteForDescendentReply,
	updateFavouriteStatus,
} from '@/util/cache/favourite/favouriteCache';
import { getCacheQueryKeys } from '@/util/cache/queryCacheHelper';
import customColor from '@/util/constant/color';
import { HeartOutlineIcon } from '@/util/svg/icon.common';
import { uniqueId } from 'lodash';
import { TouchableOpacity, ViewProps } from 'react-native';

type Props = {
	status: Pathchwork.Status;
} & ViewProps;

const StatusFavourtieButton = ({ status, ...props }: Props) => {
	const currentFeed = useCurrentActiveFeed();
	const { setActiveFeed } = useActiveFeedAction();
	const { domain_name } = useActiveDomainStore();
	const { saveStatus } = useSubchannelStatusActions();

	const { mutate } = useFavouriteMutation({
		onMutate: async ({ status }) => {
			if (currentFeed) {
				const updateFeedDatailData = updateFavouriteStatus(currentFeed);
				status.id == currentFeed.id && setActiveFeed(updateFeedDatailData);
			}

			const queryKeys = getCacheQueryKeys<FavouriteQueryKeys>(
				status.account.id,
				status.in_reply_to_id,
				domain_name,
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
		const stat = status.reblog ? status.reblog : status;
		const crossChannelRequestIdentifier = `CROS-Channel-Status::${status.id}::Req-ID::`;
		saveStatus(crossChannelRequestIdentifier, {
			status,
			savedPayload: {
				id: status.id,
				account: status.account,
			},
			crossChannelRequestIdentifier,
			specificResponseMapping: {
				id: 'id',
				account: 'account',
			},
		});
		mutate({ status: stat, crossChannelRequestIdentifier });
	};

	const favouriteColor = status.reblog
		? status.reblog.favourited
		: status.favourited;

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="flex flex-row items-center gap-1"
			{...props}
			onPress={handleFavourite}
		>
			<HeartOutlineIcon
				stroke={
					favouriteColor
						? customColor['patchwork-red-50']
						: customColor['patchwork-grey-100']
				}
				fill={favouriteColor ? customColor['patchwork-red-50'] : 'none'}
			/>
			<ThemeText variant="textGrey">
				{status.reblog
					? status.reblog.favourites_count
					: status.favourites_count}
			</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusFavourtieButton;
