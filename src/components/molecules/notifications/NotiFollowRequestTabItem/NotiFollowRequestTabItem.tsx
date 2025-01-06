import React from 'react';
import { Pressable, View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { NotificationPeopleFollowIcon } from '@/util/svg/icon.notification';
import Image from '@/components/atoms/common/Image/Image';
import { useNavigation } from '@react-navigation/native';
import { NotificationScreenNavigationProp } from '@/types/navigation';
import { Button } from '@/components/atoms/common/Button/Button';
import { useFollowRequestsMutation } from '@/hooks/mutations/profile.mutation';
import { FollowRequestQueryKey } from '@/services/notification.service';
import { queryClient } from '@/App';

const NotiFollowRequestTabItem = ({ item }: { item: Patchwork.Account }) => {
	const navigation = useNavigation<NotificationScreenNavigationProp>();
	const displayAcct = item.url.includes('https://channel.org')
		? `${item.acct}@channel.org`
		: item.acct;

	const { mutate, isPending } = useFollowRequestsMutation({
		onSuccess: () => {
			const followRequestNotQueryKey: FollowRequestQueryKey = [
				'follow-request-query-key',
			];
			queryClient.invalidateQueries({ queryKey: followRequestNotQueryKey });
		},
	});

	const handleFollowRequest = (type: 'authorize' | 'reject') => {
		mutate({
			accountId: item.id,
			requestType: type,
		});
	};
	return (
		<View className="items-start gap-2 px-4 py-3 flex-row">
			<View className="w-9 h-9 items-center justify-center">
				<NotificationPeopleFollowIcon />
			</View>
			<View className="flex-auto">
				<View>
					<Pressable
						className="flex-row"
						onPress={() => {
							navigation.navigate('ProfileOther', {
								id: item.id,
								isFromNoti: true,
							});
						}}
					>
						<View>
							<Image
								source={{ uri: item.avatar }}
								className="w-10 h-10 rounded-full mx-[2px]"
							/>
						</View>
						<View className="ml-3 flex-1">
							<ThemeText size={'md_16'} className="opacity-80">
								{item.display_name} requested to follow you
							</ThemeText>
							<ThemeText size={'md_16'} className="opacity-50">
								@{displayAcct}
							</ThemeText>
						</View>
					</Pressable>

					{/* Follow Request Accept/Reject Actions */}
					<View className="flex-1 flex-row justify-around mt-3">
						<Button
							className="px-10"
							size={'sm'}
							onPress={() => handleFollowRequest('authorize')}
							disabled={isPending}
						>
							<ThemeText>Accept</ThemeText>
						</Button>
						<Button
							variant={'outline'}
							size={'sm'}
							className="px-10"
							onPress={() => handleFollowRequest('reject')}
							disabled={isPending}
						>
							<ThemeText>Reject</ThemeText>
						</Button>
					</View>
					{/* Follow Request Accept/Reject Actions */}
				</View>
			</View>
		</View>
	);
};

export default NotiFollowRequestTabItem;
