import ListEmptyComponent from '@/components/atoms/common/ListEmptyComponent/ListEmptyComponent';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import MuteBlockUserItem from '@/components/atoms/muteblock/MuteBlockUserItem/MuteBlockUserItem';
import { useGetBlockedUserList } from '@/hooks/queries/muteblock.queries';
import { useMuteBlockCountActions } from '@/store/muteblock/muteblockCountStore';
import customColor from '@/util/constant/color';
import { flattenPages } from '@/util/helper/timeline';
import { FlashList } from '@shopify/flash-list';
import { delay } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, RefreshControl, View } from 'react-native';
import { CircleFade, Flow } from 'react-native-animated-spinkit';

const BlockedUserList = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
		isLoading,
	} = useGetBlockedUserList();
	const blockedAccounts = useMemo(() => flattenPages(data), [data]);

	const { onSetBlockedAccountCount } = useMuteBlockCountActions();

	useEffect(() => {
		if (blockedAccounts) {
			const currentMutedAcc =
				blockedAccounts &&
				blockedAccounts.filter(account => !account.isUnBlockedNow);
			onSetBlockedAccountCount(currentMutedAcc?.length);
		}
	}, [blockedAccounts]);

	const [isRefreshing, setIsRefreshing] = useState(false);

	const onMutedUserLoadMore = () => {
		if (hasNextPage) {
			return fetchNextPage();
		}
	};

	return (
		<View className="flex-1 pb-5 mt-3">
			{!isLoading ? (
				<FlashList
					data={blockedAccounts}
					renderItem={({ item }) => {
						return <MuteBlockUserItem user={item} type="block" />;
					}}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							tintColor={customColor['patchwork-light-900']}
							onRefresh={() => {
								setIsRefreshing(true);
								refetch();
								delay(() => setIsRefreshing(false), 1500);
							}}
						/>
					}
					ListEmptyComponent={
						<ListEmptyComponent title="No User Has Been Blocked" />
					}
					ListFooterComponent={
						isFetchingNextPage ? (
							<View className="my-3 items-center">
								<CircleFade size={25} color="white" />
							</View>
						) : (
							<></>
						)
					}
					onEndReached={onMutedUserLoadMore}
					estimatedItemSize={100}
					estimatedListSize={{
						height: Dimensions.get('screen').height,
						width: Dimensions.get('screen').width,
					}}
				/>
			) : (
				<View className="flex-1 items-center justify-center">
					<Flow size={40} color={customColor['patchwork-red-50']} />
				</View>
			)}
		</View>
	);
};
export default BlockedUserList;
