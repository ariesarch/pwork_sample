import ListEmptyComponent from '@/components/atoms/common/ListEmptyComponent/ListEmptyComponent';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import MuteBlockUserItem from '@/components/atoms/muteblock/MuteBlockUserItem/MuteBlockUserItem';
import { useMuteUnmuteUserMutation } from '@/hooks/queries/feed.queries';
import { useGetMutedUserList } from '@/hooks/queries/muteblock.queries';
import { useMuteBlockCountActions } from '@/store/muteblock/muteblockCountStore';
import customColor from '@/util/constant/color';
import { flattenPages } from '@/util/helper/timeline';
import { FlashList } from '@shopify/flash-list';
import { delay } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, RefreshControl, View } from 'react-native';
import { CircleFade, Flow } from 'react-native-animated-spinkit';

const MutedUserList = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
		isLoading,
	} = useGetMutedUserList();
	const mutedAccount = useMemo(() => flattenPages(data), [data]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const { onSetMutedAccountCount } = useMuteBlockCountActions();

	useEffect(() => {
		if (mutedAccount) {
			const currentMutedAcc =
				mutedAccount && mutedAccount.filter(account => !account.isUnMutedNow);
			onSetMutedAccountCount(currentMutedAcc?.length);
		}
	}, [mutedAccount]);

	const onMutedUserLoadMore = () => {
		if (hasNextPage) {
			return fetchNextPage();
		}
	};

	return (
		<View className="flex-1 pb-5 mt-3">
			{!isLoading ? (
				<FlashList
					data={mutedAccount}
					renderItem={({ item }) => {
						return <MuteBlockUserItem user={item} type="mute" />;
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
						<ListEmptyComponent title="No User Has Been Muted" />
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
export default MutedUserList;
