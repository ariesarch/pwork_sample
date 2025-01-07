import React from 'react';
import { Pressable } from 'react-native';
import { StatusTranslateIcon } from '@/util/svg/icon.status_actions';
import {
	StatusCacheQueryKeys,
	getCacheQueryKeys,
} from '@/util/cache/queryCacheHelper';
import { DEFAULT_API_URL } from '@/util/constant';
import { translateStatusCacheData } from '@/util/cache/statusActions/translateCache';
import customColor from '@/util/constant/color';
import { useLanguageSelectionActions } from '@/store/compose/languageSelection/languageSelection';

type StatusTranslateProps = {
	status: Pathchwork.Status;
	isFeedDetail?: boolean;
	isFromNoti?: boolean;
};
const StatusTranslate = ({ status }: StatusTranslateProps) => {
	const { onToggleTranslated } = useLanguageSelectionActions();

	const onToggleTranslateStatus = () => {
		const queryKeys = getCacheQueryKeys<StatusCacheQueryKeys>(
			status.account.id,
			status.in_reply_to_id,
			status.in_reply_to_account_id,
			status.reblog ? true : false,
			process.env.API_URL ?? DEFAULT_API_URL,
		);
		if (status.translated_text) {
			onToggleTranslated();
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
