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
	StatusReportIcon,
	StatusTranslateIcon,
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
	useActiveFeedStore,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import { useNavigation } from '@react-navigation/native';
import { getEditStatusSourceFn } from '@/services/statusActions.service';
import { useActiveDomainStore } from '@/store/feed/activeDomain';
import { useSubchannelStatusActions } from '@/store/feed/subChannelStatusStore';
import { DEFAULT_API_URL } from '@/util/constant';
import { uniqueId } from 'lodash';
import { useStatusContext } from '@/context/statusItemContext/statusItemContext';
import {
	updateReplyCountChannelFeedCache,
	updateReplyCountInAccountFeedCache,
	updateReplyCountInHashtagFeed,
} from '@/util/cache/reply/replyCache';
import MenuOptionsForOtherUser from './MenuOptionsForOtherUser/MenuOptionsForOtherUser';
import { queryClient } from '@/App';
import { useTranslateMutation } from '@/hooks/mutations/feed.mutation';
import {
	translateStatusCacheData,
	updatedTranslateStatus,
} from '@/util/cache/statusActions/translateCache';
import { Flow } from 'react-native-animated-spinkit';
import { useTranslationLanguageStore } from '@/store/compose/translationLanguage/translationLanguage';

const StatusMenu = ({ status }: { status: Patchwork.Status }) => {
	const navigation = useNavigation();
	const { domain_name } = useActiveDomainStore();
	const { activeFeed: currentFeed } = useActiveFeedStore();
	const { currentPage, extraPayload, comeFrom } = useStatusContext();
	const { setActiveFeed } = useActiveFeedAction();
	const { translationLanguageData } = useTranslationLanguageStore();

	const [menuVisible, setMenuVisible] = useState(false);
	const hideMenu = () => setMenuVisible(false);
	const showMenu = () => setMenuVisible(true);
	const showEditIcon =
		currentPage !== 'FeedDetail' || currentFeed?.id == status.id;
	const goBackToPreviousPage =
		currentPage == 'FeedDetail' && currentFeed?.id == status.id;
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

	const feedReplyQueryKey = [
		'feed-replies',
		{ id: currentFeed?.id, domain_name },
	];

	//********** Delete Status **********//
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);

	const onPressShowDeleteModal = () => {
		setDeleteModalVisible(prevState => !prevState);
		hideMenu();
	};

	const { mutate } = useStatusDeleteMutation({
		onMutate: ({ status_id }) => {
			if (goBackToPreviousPage) {
				navigation.goBack();
			}
			const queryKeys = getCacheQueryKeys<StatusCacheQueryKeys>(
				status.account.id,
				status.in_reply_to_id,
				status.in_reply_to_account_id,
				status.reblog ? true : false,
				process.env.API_URL ?? DEFAULT_API_URL,
			);
			deleteStatusCacheData({ status_id, queryKeys });

			if (
				currentPage == 'FeedDetail' &&
				currentFeed?.id &&
				status.in_reply_to_id == currentFeed?.id
			) {
				changeActiveFeedReplyCount('decrease');
				updateReplyCountInAccountFeedCache(
					domain_name,
					currentFeed?.account.id,
					currentFeed?.id,
					'decrease',
				);
				updateReplyCountChannelFeedCache(
					domain_name,
					currentFeed?.id,
					'decrease',
				);
				deleteDescendentReply(currentFeed?.id, domain_name, status_id);
				comeFrom == 'hashtag' &&
					updateReplyCountInHashtagFeed(
						extraPayload,
						currentFeed.id,
						'decrease',
					);
			}
		},
		onSuccess: () => {
			currentPage == 'FeedDetail' &&
				queryClient.invalidateQueries({ queryKey: feedReplyQueryKey });
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
					statusCurrentPage: currentPage,
					extraPayload,
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

	const { mutate: translationMutate, isPending } = useTranslateMutation({
		onSuccess(data, variables, context) {
			// Check if the feed detail is the one being translated
			if (currentPage == 'FeedDetail' && currentFeed?.id === status.id) {
				// Use updatedTranslateStatus to update the current feed data
				const updateFeedDetailData = updatedTranslateStatus(
					currentFeed,
					{
						content: data.content,
						statusId: variables.statusId, // Ensure statusId is included here
					},
					true,
				);
				// Ensure the status matches before updating the active feed
				if (status.id === currentFeed.id) {
					setActiveFeed(updateFeedDetailData); // Update the feed with the translated content
				}
			}

			const queryKeys = getCacheQueryKeys<StatusCacheQueryKeys>(
				status.account.id,
				status.in_reply_to_id,
				status.in_reply_to_account_id,
				status.reblog ? true : false,
				process.env.API_URL ?? DEFAULT_API_URL,
			);
			translateStatusCacheData({
				response: { content: data.content, statusId: variables.statusId }, // Include statusId
				queryKeys,
				showTranslatedText: true,
			});
			hideMenu();
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

	const onTranslateStatus = () => {
		translationMutate({ statusId: status.id });
	};

	const shouldShowTranslateButton = useMemo(() => {
		return (
			status.reblog === null &&
			status.language !== 'en' &&
			status.language !== null &&
			translationLanguageData[status.language]?.length > 0
		);
	}, [status, translationLanguageData]);

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
									{/* <Underline className="border-patchwork-grey-400" /> */}
								</>
							)}
							<MenuOption onSelect={onPressShowDeleteModal}>
								<MenuOptionIcon icon={<StatusDeleteIcon />} name="Delete" />
							</MenuOption>
						</>
					) : (
						<>
							<MenuOptionsForOtherUser status={status} hideMenu={hideMenu} />
							{/* <FollowMenuOption url={status.account.url} />
							<MuteMenuOption url={status.account.url} /> */}
						</>
					)}
					{shouldShowTranslateButton && (
						<MenuOption onSelect={onTranslateStatus}>
							<MenuOptionIcon
								icon={
									isPending ? (
										<Flow
											size={25}
											color={customColor['patchwork-light-900']}
											className="ml-1"
										/>
									) : (
										<StatusTranslateIcon />
									)
								}
								name="Translate"
							/>
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
