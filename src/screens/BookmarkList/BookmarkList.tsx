import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import ListEmptyComponent from '@/components/atoms/common/ListEmptyComponent/ListEmptyComponent';
import StatusWrapper from '@/components/organisms/feed/StatusWrapper/StatusWrapper';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useGetBookmarkList } from '@/hooks/queries/statusActions.queries';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import customColor from '@/util/constant/color';
import { flattenPages } from '@/util/helper/timeline';
import { FlashList } from '@shopify/flash-list';
import { useColorScheme } from 'nativewind';
import { useMemo } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	RefreshControl,
	View,
} from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BookmarkList = () => {
	const domain_name = useSelectedDomain();
	const { bottom } = useSafeAreaInsets();
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
		isRefetching,
		isFetchingNextPage,
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
			{isFetching && !isRefetching && !isFetchingNextPage ? (
				<View className="flex-1 justify-center items-center">
					<Flow size={50} color={customColor['patchwork-red-50']} />
				</View>
			) : (
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
							currentPage="BookmarkList"
							statusType={item.reblog ? 'reblog' : 'normal'}
						/>
					)}
					refreshControl={
						<RefreshControl
							refreshing={isRefetching}
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
						return <ListEmptyComponent title="No Bookmark found" />;
					}}
					onEndReachedThreshold={0.15}
					onEndReached={handleOnEndReached}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={
						isFetchingNextPage ? (
							<View className="my-3 items-center">
								<ActivityIndicator
									color={customColor['patchwork-red-50']}
									size={'large'}
									className="my-5"
								/>
							</View>
						) : (
							<></>
						)
					}
				/>
			)}
		</SafeScreen>
	);
};

export default BookmarkList;
