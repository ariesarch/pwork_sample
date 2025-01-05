import React, { useMemo, useState } from 'react';
import { Platform, Pressable } from 'react-native';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
	renderers,
} from 'react-native-popup-menu';
import Share from 'react-native-share';
import {
	AccountBookmarkIcon,
	AccountUnBookmarkIcon,
	CopyLinkIcon,
	StatusShareIcon,
} from '@/util/svg/icon.status_actions';
import Underline from '../../common/Underline/Underline';
import { handleError } from '@/util/helper/helper';
import { DEFAULT_API_URL } from '@/util/constant';
import { useBookmarkStatusMutation } from '@/hooks/mutations/statusActions.mutation';
import customColor from '@/util/constant/color';
import MenuOptionIcon from '../StatusMenu/MenuOptionIcon/MenuOptionIcon';
import { useStatusContext } from '@/context/statusItemContext/statusItemContext';
import {
	useActiveFeedAction,
	useCurrentActiveFeed,
} from '@/store/feed/activeFeed';
import { useAuthStore } from '@/store/auth/authStore';
import {
	BookmarkQueryKeys,
	removeBookmarkFromBookmarkList,
	syncBookmarkAcrossCache,
	toggleBookmarkState,
	updateBookmarkForDescendentReply,
	updateHashtagBookmark,
} from '@/util/cache/bookmark/bookmarkCache';
import { getCacheQueryKeys } from '@/util/cache/queryCacheHelper';
import { useSubchannelStatusActions } from '@/store/feed/subChannelStatusStore';
import { useActiveDomainStore } from '@/store/feed/activeDomain';
import { uniqueId } from 'lodash';
import * as Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

type Props = {
	status: Pathchwork.Status;
	isFromNoti?: boolean;
};

const FALLBACK_PREVIEW_IMAGE_URL =
	'https://patchwork-staging-bucket.s3.eu-west-2.amazonaws.com/default_fallback_resized.png';

const StatusShareMenu: React.FC<Props> = ({ status, isFromNoti }: Props) => {
	const [isShareVisible, setShareVisible] = useState(false);
	const toggleMenu = () => setShareVisible(!isShareVisible);
	const currentFeed = useCurrentActiveFeed();
	const { setActiveFeed } = useActiveFeedAction();
	const { domain_name } = useActiveDomainStore();
	const { userInfo } = useAuthStore();
	const { currentPage, extraPayload } = useStatusContext();

	const isAuthor = useMemo(() => {
		return userInfo?.id === status.account.id;
	}, [userInfo, status.account.id]);

	const { saveStatus } = useSubchannelStatusActions();

	const baseURL = `${process.env.API_URL ?? DEFAULT_API_URL}`;
	const SHARE_LINK_URL = status.url.includes('channel.org')
		? `${baseURL}/@${status?.account?.username}/${status?.id}`
		: status.url;

	const toggleBookmarkStatus = useBookmarkStatusMutation({
		onMutate: async variables => {
			if (currentPage == 'FeedDetail' && currentFeed?.id === status.id) {
				const updateFeedDatailData = toggleBookmarkState(currentFeed);
				status.id == currentFeed.id && setActiveFeed(updateFeedDatailData);
			}
			const queryKeys = getCacheQueryKeys<BookmarkQueryKeys>(
				isAuthor ? userInfo?.id! : status.account.id,
				variables.status.in_reply_to_id!,
				variables.status.in_reply_to_account_id,
				status.reblog ? true : false,
				isFromNoti ? DEFAULT_API_URL : domain_name,
			);
			syncBookmarkAcrossCache({
				response: status,
				queryKeys,
			});
			updateBookmarkForDescendentReply(
				currentFeed?.id || '',
				domain_name,
				status.id,
			);
			currentPage === 'BookmarkList' &&
				removeBookmarkFromBookmarkList(variables.status.id, domain_name),
				['Hashtag', 'FeedDetail'].includes(currentPage) &&
					updateHashtagBookmark(extraPayload, status);
		},
	});

	const onBookmarkStatus = (status: Pathchwork.Status) => {
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
		toggleBookmarkStatus.mutate({
			status: stat,
			crossChannelRequestIdentifier,
		});
		toggleMenu();
	};

	const onSocialShare = async () => {
		toggleMenu();
		const appIcon =
			'data:image/png;base64,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';

		const options: any = Platform.select({
			ios: {
				activityItemSources: [
					{
						placeholderItem: {
							type: 'url',
							content: appIcon,
						},
						item: {
							default: {
								type: 'url',
								content: SHARE_LINK_URL,
							},
						},
						linkMetadata: {
							title: 'Patchwork',
							icon: FALLBACK_PREVIEW_IMAGE_URL,
						},
					},
				],
			},
			default: {
				title: 'Patchwork',
				subject: 'Patchwork',
				message: SHARE_LINK_URL,
			},
		});

		try {
			await Share.open(options);
		} catch (error) {
			handleError(error);
		}
	};

	const onCopyLink = () => {
		Clipboard.default.setString(SHARE_LINK_URL);
		Toast.show({
			type: 'success',
			text1: 'Link Copied!',
			topOffset: 60,
		});
	};

	const isBookmarked = status.reblog
		? status.reblog.bookmarked
		: status.bookmarked;

	return (
		<Menu
			renderer={renderers.Popover}
			rendererProps={{
				placement: 'left',
				anchorStyle: {
					width: 0,
					height: 0,
				},
			}}
			opened={isShareVisible}
			style={{ zIndex: 1000 }}
			onBackdropPress={toggleMenu}
		>
			<MenuTrigger>
				<Pressable onPress={toggleMenu}>
					<StatusShareIcon />
				</Pressable>
			</MenuTrigger>
			<MenuOptions
				customStyles={{
					optionsContainer: {
						borderRadius: 3,
						paddingHorizontal: 10,
						backgroundColor: customColor['patchwork-dark-400'],
					},
				}}
			>
				<>
					<MenuOption
						customStyles={{
							optionText: { color: 'red' },
						}}
						onSelect={() => onBookmarkStatus(status)}
						disabled={toggleBookmarkStatus.isPending}
					>
						<MenuOptionIcon
							name={
								status?.bookmarked || isBookmarked
									? 'Remove Bookmark'
									: 'Bookmark'
							}
							icon={
								status?.bookmarked ? (
									<AccountUnBookmarkIcon />
								) : (
									<AccountBookmarkIcon
										fill={isBookmarked ? '#828689' : 'none'}
									/>
								)
							}
						/>
					</MenuOption>
					<Underline />
					<MenuOption onSelect={onCopyLink}>
						<MenuOptionIcon name="Copy Link" icon={<CopyLinkIcon />} />
					</MenuOption>
					<Underline />
					<MenuOption onSelect={onSocialShare}>
						<MenuOptionIcon name="Share via ..." icon={<StatusShareIcon />} />
					</MenuOption>
				</>
			</MenuOptions>
		</Menu>
	);
};

export default StatusShareMenu;
