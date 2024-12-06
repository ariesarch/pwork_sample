import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useAuthStore } from '@/store/auth/authStore';
import { cn } from '@/util/helper/twutil';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { Button } from '@/components/atoms/common/Button/Button';
import { useProfileMutation } from '@/hooks/mutations/profile.mutation';
import { useNavigation } from '@react-navigation/native';
import { handleError } from '@/util/helper/helper';
import { UpdateProfilePayload } from '@/types/queries/profile.type';
import { queryClient } from '@/App';
import { DEFAULT_API_URL } from '@/util/constant';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import { useProfileMediaStore } from '@/store/profile/useProfileMediaStore';
import ManageAttachmentModal from '@/components/organisms/profile/ManageAttachment/MakeAttachmentModal';
import { ComposeCameraIcon } from '@/util/svg/icon.compose';
import { cleanText } from '@/util/helper/cleanText';
import LoadingModal from '@/components/atoms/common/LoadingModal/LoadingModal';
import Toast from 'react-native-toast-message';
import {
	BottomBarHeight,
	useGradualAnimation,
} from '@/hooks/custom/useGradualAnimation';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { ProfileBackIcon } from '@/util/svg/icon.profile';

type ProfileType = {
	display_name?: string;
	bio?: string;
	avatar?: string;
	header?: string;
};

const EditProfile = () => {
	const {
		userInfo,
		actions: { setUserInfo },
	} = useAuthStore();
	const navigation = useNavigation();
	const [profile, setProfile] = useState<ProfileType>();
	const { header, avatar, actions } = useProfileMediaStore();
	const { height, progress } = useGradualAnimation();

	useEffect(() => {
		if (userInfo) {
			setProfile({
				display_name: userInfo.display_name,
				bio: cleanText(userInfo?.note) || '',
				avatar: userInfo.avatar || '',
				header: userInfo.header || '',
			});
		}
	}, [userInfo]);

	const { mutateAsync, isPending } = useProfileMutation({
		onSuccess: response => {
			queryClient.invalidateQueries({
				queryKey: [
					'account-detail-feed',
					{
						domain_name: process.env.API_URL ?? DEFAULT_API_URL,
						account_id: userInfo?.id,
						exclude_reblogs: false,
						exclude_replies: true,
						exclude_original_statuses: false,
					},
				],
			});
			setUserInfo(response);
			Toast.show({
				text1: 'Your profile has been updated successfully!',
				position: 'top',
				topOffset: 15,
				visibilityTime: 1000,
				onHide: () =>
					navigation.navigate('Index', {
						screen: 'Home',
						params: {
							screen: 'HomeFeed',
						},
					}),
			});
		},
		onError: error => {
			Toast.show({
				type: 'error',
				text1: error?.message || 'Something went wrong!',
				position: 'top',
				topOffset: 15,
				visibilityTime: 1000,
				onHide: () => {
					actions.onSelectMedia('header', []);
					actions.onSelectMedia('avatar', []);
					navigation.navigate('Index', {
						screen: 'Home',
						params: {
							screen: 'HomeFeed',
						},
					});
				},
			});
		},
	});
	const handleUpdateProfile = async () => {
		try {
			let payload: UpdateProfilePayload = {
				display_name: profile?.display_name,
				note: profile?.bio,
			};
			if (avatar?.selectedMedia?.length > 0) {
				payload.avatar = avatar.selectedMedia[0];
			}
			if (header?.selectedMedia?.length > 0) {
				payload.header = header.selectedMedia[0];
			}
			await mutateAsync(payload);
		} catch (error) {
			handleError(error);
		}
	};

	const virtualKeyboardContainerStyle = useAnimatedStyle(() => {
		return {
			height:
				height.value > BottomBarHeight ? height.value - BottomBarHeight : 0,
		};
	});

	if (!userInfo) return null;
	return (
		<View className="flex-1">
			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
				<TouchableOpacity
					onPress={() => {
						actions.onSelectMedia('header', []);
						actions.onSelectMedia('avatar', []);
						navigation.goBack();
					}}
					className="absolute z-10 top-2 left-2 w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 opacity-50 mr-1"
				>
					<ProfileBackIcon />
				</TouchableOpacity>
				<View className="flex-1 -mt-2 bg-white dark:bg-patchwork-dark-100">
					{/* Header Media Modal */}
					<ThemeModal
						hasNotch={false}
						openThemeModal={header.mediaModal}
						onCloseThemeModal={() => {
							actions.onToggleMediaModal('header');
						}}
						modalPositionStyle={{
							justifyContent: 'flex-end',
						}}
						containerStyle={{ borderRadius: 0 }}
					>
						<ManageAttachmentModal
							type="header"
							onToggleMediaModal={() => actions.onToggleMediaModal('header')}
							imageUrl={profile?.header ? profile.header : null}
							canPreview={
								header.selectedMedia.length > 0
									? false
									: profile?.header
									? true
									: true
							}
						/>
					</ThemeModal>
					{/* Avatar Media Modal */}
					<ThemeModal
						hasNotch={false}
						openThemeModal={avatar.mediaModal}
						onCloseThemeModal={() => {
							actions.onToggleMediaModal('avatar');
						}}
						modalPositionStyle={{
							justifyContent: 'flex-end',
						}}
						containerStyle={{ borderRadius: 0 }}
					>
						<ManageAttachmentModal
							type="avatar"
							onToggleMediaModal={() => actions.onToggleMediaModal('avatar')}
							imageUrl={profile?.avatar ? profile.avatar : null}
							canPreview={
								avatar.selectedMedia.length > 0
									? false
									: profile?.avatar
									? true
									: true
							}
						/>
					</ThemeModal>

					{/* Header Image */}
					<Pressable onPress={() => actions.onToggleMediaModal('header')}>
						<FastImage
							className="bg-patchwork-dark-50 h-36 w-full"
							source={{
								uri: header.selectedMedia[0]?.uri || profile?.header,
								priority: FastImage.priority.normal,
							}}
							resizeMode={FastImage.resizeMode.cover}
						/>
					</Pressable>

					{/* Avatar Image */}
					<View className="mx-auto">
						<Pressable
							className="p-1 "
							onPress={() => actions.onToggleMediaModal('avatar')}
						>
							<View className="z-10 absolute bottom-2 right-2 rounded-full bg-slate-50 p-1">
								<ComposeCameraIcon className="" />
							</View>
							<FastImage
								className={cn(
									'w-[100] h-[100] mt-[-25] bg-patchwork-dark-50 border-patchwork-dark-100 border-4 rounded-full',
								)}
								source={{
									uri: avatar.selectedMedia[0]?.uri || profile?.avatar,
									priority: FastImage.priority.normal,
								}}
								resizeMode={FastImage.resizeMode.cover}
							/>
						</Pressable>
					</View>
					<ThemeText className="mx-auto">{userInfo.display_name}</ThemeText>
					{/* Profile Form */}
					<View className="mx-5 flex-1">
						<ThemeText size={'md_16'}>Public Info</ThemeText>
						<ThemeText className="mt-3 mb-1">Display Name</ThemeText>
						<TextInput
							placeholder="Your display name"
							value={profile?.display_name || ''}
							onChangeText={name =>
								setProfile(prev => ({
									...prev,
									display_name: name,
								}))
							}
						/>
						<ThemeText className="mt-2 mb-1">Bio</ThemeText>
						<TextInput
							textArea
							value={profile?.bio || ''}
							onChangeText={bio =>
								setProfile(prev => ({
									...prev,
									bio: bio,
								}))
							}
						/>
					</View>
				</View>
			</ScrollView>
			<Animated.View style={virtualKeyboardContainerStyle} />
			<Button
				className="mx-6 bottom-0 left-0 right-0 mb-5"
				onPress={handleUpdateProfile}
			>
				<ThemeText>Save</ThemeText>
			</Button>
			<LoadingModal isVisible={isPending} />
		</View>
	);
};

export default EditProfile;
