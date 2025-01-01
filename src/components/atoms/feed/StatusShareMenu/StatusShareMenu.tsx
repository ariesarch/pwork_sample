import React, { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
	renderers,
} from 'react-native-popup-menu';
import Share from 'react-native-share';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import {
	AccountBookmarkIcon,
	AccountUnBookmarkIcon,
	StatusShareIcon,
} from '@/util/svg/icon.status_actions';
import Underline from '../../common/Underline/Underline';
import { handleError } from '@/util/helper/helper';
import { DEFAULT_API_URL } from '@/util/constant';
import { useBookmarkStatusMutation } from '@/hooks/mutations/statusActions.mutation';
import { queryClient } from '@/App';
import { InfiniteData } from '@tanstack/react-query';

const MenuIconButton = ({ icon, title }: { icon: any; title: string }) => {
	return (
		<View className="flex-row items-center py-1 px-2">
			<View className="mr-3">{icon}</View>
			<ThemeText variant={'textGrey'}>{title}</ThemeText>
		</View>
	);
};

type TimelineShareMenuProps = {
	status: Pathchwork.Status;
	page?: 'timeline' | 'detail' | 'profile';
};

const StatusShareMenu: React.FC<TimelineShareMenuProps> = ({
	status,
}: TimelineShareMenuProps) => {
	const [isShareVisible, setShareVisible] = useState(false);
	const toggleMenu = () => setShareVisible(!isShareVisible);

	const toggleBookmarkStatus = useBookmarkStatusMutation({
		onMutate: params => {
			const timelineQueryKey = ['BookMark'];
			queryClient.setQueryData<InfiniteData<TimelineData> | undefined>(
				timelineQueryKey,
				old => {
					if (!old) return;
					return {
						...old,
						pages: old.pages.map(page => ({
							...page,
							data: (page.data as Newsmast.Status[]).map(item => {
								if (item.reblog) {
									if (item.reblog.id === params?.statusesId) {
										return {
											...item,
											reblog: {
												...item?.reblog,
												bookmarked: params?.isBookmark,
											},
										};
									}
								}
								if (item?.id === params?.statusesId) {
									return { ...item, bookmarked: params?.isBookmark };
								} else {
									return item;
								}
							}),
						})),
					};
				},
			);

			const timelineDetailQueryKey: TimelineDetailQueryKey = [
				'Timeline-Detail',
				{
					postId: status.id,
					pageType: queryKey,
				},
			];
			queryClient.setQueryData<InfiniteData<TimelineData> | undefined>(
				timelineDetailQueryKey,
				old => {
					if (!old) return;

					if (old) {
						return {
							...old,
							bookmarked: params?.isBookmark,
						};
					}
				},
			);

			// const bookmarkStatusQueryKey: BookmarkStatusQueryKey = [
			//   "Bookmark-Timeline",
			// ];

			// queryClient.setQueryData<InfiniteData<TimelineData> | undefined>(
			//   bookmarkStatusQueryKey,
			//   (old) => {
			//     if (!old) return;

			//     return {
			//       ...old,
			//       pages: old.pages.map((page) => ({
			//         ...page,
			//         data: (page.data as Newsmast.Status[]).filter(
			//           (status) => status?.id !== params?.statusesId,
			//         ),
			//       })),
			//     };
			//   },
			// );

			const accountStatusesQueryKey: AccountStatusesQueryKey = [
				'Account-Statuses',
				{
					accountId: otherUserId ? otherUserId : (userId as string),
					domain: INSTANCE_CONNECT,
				},
			];

			queryClient.invalidateQueries(accountStatusesQueryKey);
			const profileStatusesQuery = queryClient.getQueryData<Newsmast.Account>(
				accountStatusesQueryKey,
			);

			if (profileStatusesQuery) {
				queryClient.setQueryData<InfiniteData<TimelineData> | undefined>(
					accountStatusesQueryKey,
					old => {
						if (!old) return;

						return {
							...old,
							pages: old.pages.map(page => ({
								...page,
								data: (page.data as Newsmast.Status[]).map(item => {
									if (item.reblog) {
										if (item.reblog.id === params?.statusesId) {
											return {
												...item,
												reblog: {
													...item?.reblog,
													bookmarked: params?.isBookmark,
												},
											};
										}
									}
									if (item?.id === params?.statusesId) {
										return { ...item, bookmarked: params?.isBookmark };
									} else {
										return item;
									}
								}),
							})),
						};
					},
				);
			}
		},
		onSuccess: res => {
			const bookmarkStatusQueryKey: BookmarkStatusQueryKey = [
				'Bookmark-Timeline',
			];

			queryClient.setQueryData<InfiniteData<TimelineData> | undefined>(
				bookmarkStatusQueryKey,
				old => {
					if (!old) return;

					return {
						...old,
						pages: old.pages.map(page => ({
							...page,
							data: (page.data as Newsmast.Status[]).filter(
								status => status?.id !== res.id,
							),
						})),
					};
				},
			);
		},
	});

	const onBookmarkStatus = (status: Pathchwork.Status) => {
		toggleBookmarkStatus.mutate({
			statusesId: status.id,
			isBookmark: !status?.bookmarked,
			// queryKey: queryKey,
		});
		toggleMenu();
	};

	const onSocialShare = async () => {
		toggleMenu();
		// const appIcon =
		// 'data:image/png;base64,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';
		const baseURL = `${process.env.API_URL ?? DEFAULT_API_URL}`;
		const SHARE_LINK_URL = `${baseURL}/@${status?.account?.username}/${status?.id}`;
		const options: any = Platform.select({
			ios: {
				activityItemSources: [
					{
						placeholderItem: {
							type: 'url',
							content: 'Patchwork',
							// content: appIcon,
						},
						item: {
							default: {
								type: 'url',
								content: SHARE_LINK_URL,
							},
						},
						// linkMetadata: {
						// 	title: 'Patchwork',
						// 	icon: 'https://newsmast-assets.s3.eu-west-2.amazonaws.com/default_fallback_resized.png',
						// },
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
					},
				}}
			>
				<>
					<MenuOption
						onSelect={() => onBookmarkStatus(status)}
						// disabled={toggleBookmarkStatus.isLoading}
					>
						<MenuIconButton
							icon={
								status?.bookmarked ? (
									<AccountUnBookmarkIcon />
								) : (
									<AccountBookmarkIcon />
								)
							}
							title={status?.bookmarked ? 'Remove Bookmark' : 'Bookmark'}
						/>
					</MenuOption>
					<Underline />
					<MenuOption onSelect={onSocialShare}>
						<MenuIconButton icon={<StatusShareIcon />} title="Share via ..." />
					</MenuOption>
				</>
			</MenuOptions>
		</Menu>
	);
};

export default StatusShareMenu;
