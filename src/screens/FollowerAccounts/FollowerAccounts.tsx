import React, { useCallback, useMemo } from 'react';
import { Dimensions, RefreshControl, StyleSheet, View } from 'react-native';
import { CircleFade, Flow } from 'react-native-animated-spinkit';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import Underline from '@/components/atoms/common/Underline/Underline';
import NotificationListEmpty from '@/components/atoms/notifications/NotificationListEmpty/NotificationListEmpty';
import FFAccountListItem from '@/components/organisms/profile/FFAccountListItem/FFAccountListItem';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import {
	useCheckRelationships,
	useFollowerAccountsQuery,
} from '@/hooks/queries/profile.queries';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { DEFAULT_API_URL } from '@/util/constant';
import customColor from '@/util/constant/color';
import { flattenPages } from '@/util/helper/timeline';
import { FlashList } from '@shopify/flash-list';
import AccountListEmpty from '@/components/atoms/profile/AccountListEmpty/AccountListEmpty';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '@/types/navigation';

type FollowerAccountsScreenRouteProp = RouteProp<
	HomeStackParamList,
	'FollowerAccounts'
>;
const FollowerAccounts = ({
	route,
}: {
	route: FollowerAccountsScreenRouteProp;
}) => {
	const { accountId, isMainChannel } = route.params;
	const domain_name = useSelectedDomain();

	const { data, isFetching, hasNextPage, fetchNextPage, refetch } =
		useFollowerAccountsQuery({
			accountId: accountId,
			domain_name: isMainChannel ? DEFAULT_API_URL : domain_name,
		});

	const followerIds = useMemo(() => {
		return data ? flattenPages(data).map(follower => follower.id) : [];
	}, [data]);

	// ***** Check Relationship To Other Accounts ***** //
	const {
		data: relationships,
		isLoading: isLoadingRelationships,
		refetch: refetchRelationships,
	} = useCheckRelationships({
		accountIds: followerIds,
	});
	// ***** Check Relationship To Other Accounts ***** //

	const relationshipsMap = useMemo(() => {
		if (!relationships) return new Map();
		return new Map(relationships?.map(rel => [rel.id, rel]));
	}, [relationships]);

	const renderItem = useCallback(
		({ item }: { item: Pathchwork.Account }) => (
			<FFAccountListItem
				item={item}
				relationship={relationshipsMap.get(item.id)}
				isLoadingRelationships={isLoadingRelationships}
				isMainChannel={isMainChannel}
				followerIds={followerIds}
			/>
		),
		[relationshipsMap],
	);

	const handleFetchNextPage = () => {
		if (hasNextPage) {
			return fetchNextPage();
		}
	};

	return (
		<SafeScreen>
			<Header
				title="Followers"
				leftCustomComponent={<BackButton />}
				hideUnderline
			/>
			<Underline />
			{data ? (
				<FlashList
					data={flattenPages(data)}
					renderItem={renderItem}
					ItemSeparatorComponent={Underline}
					ListEmptyComponent={<AccountListEmpty />}
					estimatedItemSize={100}
					estimatedListSize={{
						height: Dimensions.get('screen').height,
						width: Dimensions.get('screen').width,
					}}
					onEndReachedThreshold={0.15}
					onEndReached={handleFetchNextPage}
					refreshControl={
						<RefreshControl
							refreshing={isFetching}
							tintColor={customColor['patchwork-light-900']}
							onRefresh={() => {
								refetch();
								refetchRelationships();
							}}
						/>
					}
					ListFooterComponent={
						isFetching ? (
							<View className="my-3 items-center">
								<CircleFade size={25} color="white" />
							</View>
						) : (
							<></>
						)
					}
					getItemType={item => {
						return item.id;
					}}
				/>
			) : (
				<View className="flex-1 items-center justify-center">
					<Flow size={50} color={customColor['patchwork-red-50']} />
				</View>
			)}
		</SafeScreen>
	);
};

export default FollowerAccounts;
