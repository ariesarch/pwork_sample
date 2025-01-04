import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useStatusContext } from '@/context/statusItemContext/statusItemContext';
import { useFavouriteMutation } from '@/hooks/mutations/feed.mutation';
import { useAuthStore } from '@/store/auth/authStore';
import { useActiveDomainStore } from '@/store/feed/activeDomain';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import { useSubchannelStatusActions } from '@/store/feed/subChannelStatusStore';
import {
	FavouriteQueryKeys,
	syncFavouriteAcrossCache,
	updateFavouriteForDescendentReply,
	toggleFavouriteState,
	updateHashtagFavourite,
} from '@/util/cache/favourite/favouriteCache';
import { getCacheQueryKeys } from '@/util/cache/queryCacheHelper';
import { DEFAULT_API_URL } from '@/util/constant';
import customColor from '@/util/constant/color';
import { HeartOutlineIcon } from '@/util/svg/icon.common';
import { uniqueId } from 'lodash';
import { useMemo } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';

type Props = {
	status: Patchwork.Status;
	isFromNoti?: boolean;
} & ViewProps;

const StatusFavourtieButton = ({ status, isFromNoti, ...props }: Props) => {
	const currentFeed = useCurrentActiveFeed();
	const { setActiveFeed } = useActiveFeedAction();
	const { domain_name } = useActiveDomainStore();

	const { saveStatus } = useSubchannelStatusActions();
	const { userInfo } = useAuthStore();
	const { currentPage, comeFrom, extraPayload } = useStatusContext();

	const isAuthor = useMemo(() => {
		return userInfo?.id === status.account.id;
	}, [userInfo, status.account.id]);

	const { mutate } = useFavouriteMutation({
		onMutate: async variables => {
			if (currentPage == 'FeedDetail' && currentFeed?.id === status.id) {
				const updateFeedDatailData = toggleFavouriteState(currentFeed);
				status.id == currentFeed.id && setActiveFeed(updateFeedDatailData);
			}
			const queryKeys = getCacheQueryKeys<FavouriteQueryKeys>(
				isAuthor ? userInfo?.id! : status.account.id,
				variables.status.in_reply_to_id,
				variables.status.in_reply_to_account_id,
				status.reblog ? true : false,
				// isAuthor ? process.env.API_URL ?? DEFAULT_API_URL : domain_name,
				isFromNoti ? DEFAULT_API_URL : domain_name,
			);
			syncFavouriteAcrossCache({
				response: status,
				queryKeys,
			});
			updateFavouriteForDescendentReply(
				currentFeed?.id || '',
				domain_name,
				status.id,
			);
			['Hashtag', 'FeedDetail'].includes(currentPage) &&
				updateHashtagFavourite(extraPayload, status);
		},
	});

	const handleFavourite = () => {
		const stat = status.reblog ? status.reblog : status;
		const crossChannelRequestIdentifier = uniqueId(
			`CROS-Channel-Status::${status.id}::Req-ID::`,
		);
		saveStatus(crossChannelRequestIdentifier, {
			status: stat,
			savedPayload: {
				id: status.reblog ? status.reblog.id : status.id,
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

	const favouritesCount = status.reblog
		? status.reblog.favourites_count
		: status.favourites_count;

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
			<ThemeText variant="textGrey">{favouritesCount}</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusFavourtieButton;
