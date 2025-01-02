import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import ListEmptyComponent from '@/components/atoms/common/ListEmptyComponent/ListEmptyComponent';
import StatusWrapper from '@/components/organisms/feed/StatusWrapper/StatusWrapper';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useTokenRevokeMutation } from '@/hooks/mutations/auth.mutation';
import { usePushNotiRevokeTokenMutation } from '@/hooks/mutations/pushNoti.mutation';
import { useGetChannelFeed } from '@/hooks/queries/channel.queries';
import { useGetBookmarkList } from '@/hooks/queries/statusActions.queries';
import { useAuthStore, useAuthStoreAction } from '@/store/auth/authStore';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { usePushNoticationStore } from '@/store/pushNoti/pushNotiStore';
import { RootScreenProps } from '@/types/navigation';
import customColor from '@/util/constant/color';
import { flattenPages } from '@/util/helper/timeline';
import { FlashList } from '@shopify/flash-list';
import { useColorScheme } from 'nativewind';
import { useMemo, useState } from 'react';
import { Dimensions, RefreshControl, View } from 'react-native';
import { CircleFade } from 'react-native-animated-spinkit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BookmarkList: React.FC<RootScreenProps<'BookmarkList'>> = ({
	route,
	navigation,
}) => {
	const domain_name = useSelectedDomain();
	const { bottom, top } = useSafeAreaInsets();
	const { colorScheme } = useColorScheme();

	const queryParams = {
		domain_name,
		remote: false,
		only_media: false,
	};

	const {
		data: bookmarks,
		hasNextPage,
		fetchNextPage,
		isFetching,
		refetch: refetchBookmarks,
	} = useGetBookmarkList(queryParams);

	const feed = useMemo(() => flattenPages(bookmarks), [bookmarks]);

	const handleOnEndReached = () => {
		if (hasNextPage) {
			return fetchNextPage();
		}
	};

	return (
		<SafeScreen>
			<Header title="Bookmarks" leftCustomComponent={<BackButton />} />
			<FlashList
				data={feed}
				contentContainerStyle={{
					paddingBottom: bottom,
					backgroundColor: colorScheme === 'dark' ? '#2E363B' : '#ffffff',
				}}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => (
					<StatusWrapper
						status={item}
						currentPage="Channel"
						statusType={item.reblog ? 'reblog' : 'normal'}
					/>
				)}
				refreshControl={
					<RefreshControl
						refreshing={isFetching}
						tintColor={customColor['patchwork-light-900']}
						onRefresh={refetchBookmarks}
					/>
				}
				estimatedItemSize={500}
				estimatedListSize={{
					height: Dimensions.get('screen').height,
					width: Dimensions.get('screen').width,
				}}
				ListEmptyComponent={() => {
					return <ListEmptyComponent />;
				}}
				onEndReachedThreshold={0.15}
				onEndReached={handleOnEndReached}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={
					isFetching ? (
						<View className="my-3 items-center">
							<CircleFade size={25} color="white" />
						</View>
					) : (
						<></>
					)
				}
			/>
		</SafeScreen>
	);
};

export default BookmarkList;
