import React from 'react';
import { Pressable } from 'react-native';
import { StatusTranslateIcon } from '@/util/svg/icon.status_actions';
import {
	StatusCacheQueryKeys,
	getCacheQueryKeys,
} from '@/util/cache/queryCacheHelper';
import { DEFAULT_API_URL } from '@/util/constant';
import {
	translateStatusCacheData,
	updatedTranslateStatus,
} from '@/util/cache/statusActions/translateCache';
import customColor from '@/util/constant/color';
import { useLanguageSelectionActions } from '@/store/compose/languageSelection/languageSelection';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import { useStatusContext } from '@/context/statusItemContext/statusItemContext';

type StatusTranslateProps = {
	status: Patchwork.Status;
	isFromNoti?: boolean;
};
const StatusTranslate = ({ status }: StatusTranslateProps) => {
	const currentFeed = useCurrentActiveFeed();
	const { setActiveFeed } = useActiveFeedAction();
	const { currentPage } = useStatusContext();

	const onToggleTranslateStatus = () => {
		const queryKeys = getCacheQueryKeys<StatusCacheQueryKeys>(
			status.account.id,
			status.in_reply_to_id,
			status.in_reply_to_account_id,
			status.reblog ? true : false,
			process.env.API_URL ?? DEFAULT_API_URL,
		);
		if (status.translated_text) {
			if (currentPage == 'FeedDetail' && currentFeed?.id === status.id) {
				// Use updatedTranslateStatus to update the current feed data
				const updateFeedDetailData = updatedTranslateStatus(
					currentFeed,
					{
						content: status.content,
						statusId: status.id, // Ensure statusId is included here
					},
					false,
				);
				// Ensure the status matches before updating the active feed
				if (status.id === currentFeed.id) {
					setActiveFeed(updateFeedDetailData); // Update the feed with the translated content
				}
			}
			translateStatusCacheData({
				response: { content: status.content, statusId: status.id },
				queryKeys,
				showTranslatedText: false,
			});
		}
	};

	return (
		<Pressable className="mx-1" onPress={onToggleTranslateStatus}>
			<StatusTranslateIcon
				fill={
					status.translated_text
						? customColor['patchwork-red-50']
						: customColor['patchwork-grey-100']
				}
			/>
		</Pressable>
	);
};

export default StatusTranslate;
