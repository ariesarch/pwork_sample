import React, { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from 'react-native-popup-menu';
import MenuOptionIcon from './MenuOptionIcon/MenuOptionIcon';
import {
	StatusMenuIcon,
	StatusDeleteIcon,
	StatusEditIcon,
	StatusBlockIcon,
} from '@/util/svg/icon.status_actions';
import customColor from '@/util/constant/color';
import { useAuthStore } from '@/store/auth/authStore';
import Underline from '../../common/Underline/Underline';
import { useStatusDeleteMutation } from '@/hooks/mutations/statusActions.mutation';
import {
	StatusCacheQueryKeys,
	getCacheQueryKeys,
} from '@/util/cache/queryCacheHelper';
import {
	deleteDescendentReply,
	deleteStatusCacheData,
} from '@/util/cache/statusActions/deleteStatusCache';
import Toast from 'react-native-toast-message';
import StatusDeleteModal from '../../common/StatusDeleteModal/StatusDeleteModal';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import { useNavigation } from '@react-navigation/native';
import { getEditStatusSourceFn } from '@/services/statusActions.service';
import { useActiveDomainStore } from '@/store/feed/activeDomain';
import { FeedDetail } from '@/screens';
import { queryClient } from '@/App';
import { useSubchannelStatusActions } from '@/store/feed/subChannelStatusStore';
import { uniqueId } from 'lodash';

const StatusMenu = ({
	status,
	isFeedDetail,
}: {
	status: Pathchwork.Status;
	isFeedDetail?: boolean;
}) => {
	const navigation = useNavigation();
	const { domain_name } = useActiveDomainStore();
	const currentFeed = useCurrentActiveFeed();

	const [menuVisible, setMenuVisible] = useState(false);
	const hideMenu = () => setMenuVisible(false);
	const showMenu = () => setMenuVisible(true);
	const showEditIcon = !isFeedDetail || currentFeed?.id == status.id;
	const goBackToPreviousPage = isFeedDetail && currentFeed?.id == status.id;
	const { changeActiveFeedReplyCount } = useActiveFeedAction();
	const { saveStatus } = useSubchannelStatusActions();

	const { userInfo } = useAuthStore();

	const isAuthor = useMemo(() => {
		const currentUserAccHandle = userInfo?.acct + '@channel.org';
		return (
			userInfo?.id == status.account.id ||
			status.account.acct == currentUserAccHandle
		);
	}, [status, userInfo?.id]);

	const accountDetailFeedQueryKey = [
		'account-detail-feed',
		{
			domain_name: domain_name,
			account_id: userInfo?.id!,
			exclude_replies: true,
			exclude_reblogs: false,
			exclude_original_statuses: false,
		},
	];

	const accountDetailReplyFeedQueryKey = [
		'account-detail-feed',
		{
			domain_name: domain_name,
			account_id: userInfo?.id!,
			exclude_replies: false,
			exclude_reblogs: true,
			exclude_original_statuses: true,
		},
	];

	const feedReplyQueryKey = [
		'feed-replies',
		{ id: currentFeed?.id, domain_name },
	];

	const channelFeedQueryKey = [
		'channel-feed',
		{ domain_name, remote: false, only_media: false },
	];

	//********** Delete Status **********//
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);

	const onPressShowDeleteModal = () => {
		setDeleteModalVisible(prevState => !prevState);
		hideMenu();
	};

	const { mutate } = useStatusDeleteMutation({
		onSuccess(_, { status_id }) {
			if (goBackToPreviousPage) {
				navigation.goBack();
			}
			// const queryKeys = getCacheQueryKeys<StatusCacheQueryKeys>(
			// 	status.account.id,
			// 	status.in_reply_to_id,
			// );
			// deleteStatusCacheData({ status_id, queryKeys });
			deleteDescendentReply(currentFeed?.id || '', domain_name, status_id);

			isFeedDetail &&
				status.in_reply_to_id == currentFeed?.id &&
				changeActiveFeedReplyCount('decrease');

			//temp
			queryClient.invalidateQueries({
				queryKey: accountDetailReplyFeedQueryKey,
			});
			queryClient.invalidateQueries({
				queryKey: feedReplyQueryKey,
			});
			queryClient.invalidateQueries({
				queryKey: accountDetailFeedQueryKey,
			});
			queryClient.invalidateQueries({
				queryKey: channelFeedQueryKey,
			});
		},
		onError(error) {
			Toast.show({
				type: 'error',
				text1: error.message,
				position: 'top',
				topOffset: 50,
			});
		},
	});

	const handleDeleteStatus = () => {
		const crossChannelRequestIdentifier = uniqueId(
			`CROS-Channel-Status::${status.id}::Req-ID::`,
		);
		saveStatus(crossChannelRequestIdentifier, {
			status,
			savedPayload: {
				id: status.id,
			},
			crossChannelRequestIdentifier,
		});
		mutate({ status_id: status.id, crossChannelRequestIdentifier });
		setDeleteModalVisible(false);
	};
	//********** Delete Status **********//

	//********** Edit Status **********//
	const onPressEditStatus = async () => {
		try {
			const { text } = await getEditStatusSourceFn({
				status_id: status.id,
			});
			navigation.navigate('Index', {
				screen: 'Compose',
				params: {
					type: 'edit',
					incomingStatus: {
						...status,
						text,
					},
					isFeedDetail,
				},
			});
			hideMenu();
		} catch (error: any) {
			Toast.show({
				type: 'error',
				text1: error.message,
				position: 'top',
				topOffset: 50,
			});
		}
	};
	//********** Edit Status **********//

	return (
		<>
			<Menu opened={menuVisible} onBackdropPress={hideMenu}>
				<MenuTrigger>
					<Pressable onPress={showMenu}>
						<StatusMenuIcon />
					</Pressable>
				</MenuTrigger>
				<MenuOptions
					customStyles={{
						optionsContainer: {
							backgroundColor: customColor['patchwork-dark-400'],
							borderRadius: 10,
							shadowOpacity: 0.1,
							elevation: 2,
						},
					}}
				>
					{isAuthor ? (
						<>
							{showEditIcon && !status.reblog && !status.in_reply_to_id && (
								<>
									<MenuOption onSelect={onPressEditStatus}>
										<MenuOptionIcon icon={<StatusEditIcon />} name="Edit" />
									</MenuOption>
									<Underline className="border-patchwork-grey-400" />
								</>
							)}
							<MenuOption onSelect={onPressShowDeleteModal}>
								<MenuOptionIcon icon={<StatusDeleteIcon />} name="Delete" />
							</MenuOption>
						</>
					) : (
						<MenuOption>
							<MenuOptionIcon icon={<StatusBlockIcon />} name="Block" />
						</MenuOption>
					)}
				</MenuOptions>
			</Menu>

			<StatusDeleteModal
				openDeleteModal={deleteModalVisible}
				onPressHideDeleteModal={() => setDeleteModalVisible(false)}
				handleDeleteStatus={handleDeleteStatus}
			/>
		</>
	);
};

export default StatusMenu;
