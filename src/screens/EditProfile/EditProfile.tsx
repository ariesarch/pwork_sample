import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useAuthStore } from '@/store/auth/authStore';
import { cn } from '@/util/helper/twutil';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { Button } from '@/components/atoms/common/Button/Button';
import {
	useDeleteProfileMediaMutation,
	useProfileMutation,
} from '@/hooks/mutations/profile.mutation';
import { useNavigation } from '@react-navigation/native';
import { handleError } from '@/util/helper/helper';
import {
	AccountInfoQueryKey,
	UpdateProfilePayload,
} from '@/types/queries/profile.type';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CloseIcon } from '@/util/svg/icon.common';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';

type ProfileType = {
	display_name?: string;
	bio?: string;
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
	const { top } = useSafeAreaInsets();
	const [delConfAction, setDelConfAction] = useState<{
		visible: boolean;
		title?: 'header' | 'avatar';
	}>({ visible: false });

	useEffect(() => {
		if (userInfo) {
			setProfile({
				display_name: userInfo.display_name,
				bio: cleanText(userInfo?.note) || '',
			});
			actions.onSelectMedia(
				'avatar',
				userInfo?.avatar || userInfo.avatar_static,
			);
			actions.onSelectMedia(
				'header',
				userInfo.header || userInfo.header_static,
			);
		}
	}, [userInfo]);

	// Const
	const acctInfoQueryKey: AccountInfoQueryKey = [
		'get_account_info',
		{ id: userInfo?.id!, domain_name: process.env.API_URL ?? DEFAULT_API_URL },
	];

	// mutations
	const { mutateAsync, isPending: isUpdatingProfile } = useProfileMutation({
		onSuccess: response => {
			queryClient.invalidateQueries({ queryKey: acctInfoQueryKey });
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
	const { mutate: deleteMedia, isPending: isDeletingMedia } =
		useDeleteProfileMediaMutation({
			onSuccess: (response, variables) => {
				queryClient.invalidateQueries({ queryKey: acctInfoQueryKey });
				setUserInfo(response);
				Toast.show({
					text1: `Your ${variables.mediaType} is deleted successfully!`,
					position: 'top',
					topOffset: 15,
					visibilityTime: 1000,
				});
			},
			onError: error => {
				Toast.show({
					type: 'error',
					text1: error?.message || 'Something went wrong!',
					position: 'top',
					topOffset: 15,
					visibilityTime: 1000,
				});
			},
		});

	// handlers
	const handleUpdateProfile = async () => {
		let payload: UpdateProfilePayload = {
			display_name: profile?.display_name,
			note: profile?.bio,
		};
		payload.avatar =
			typeof avatar.selectedMedia === 'string'
				? avatar.selectedMedia
				: avatar.selectedMedia[0] || null;
		payload.header =
			typeof header.selectedMedia === 'string'
				? header.selectedMedia
				: header.selectedMedia[0] || null;
		mutateAsync(payload);
	};

	const handlePressDelConf = () => {
		if (delConfAction.title) {
			setDelConfAction({ visible: false });
			actions.onSelectMedia(delConfAction.title, []);
			actions.onToggleMediaModal(delConfAction.title);
			deleteMedia({ mediaType: delConfAction.title });
		}
	};

	// styles
	const virtualKeyboardContainerStyle = useAnimatedStyle(() => {
		return {
			height:
				height.value > BottomBarHeight ? height.value - BottomBarHeight : 0,
		};
	});

	if (!userInfo) return null;
	return (
		<>
			<View
				className={'flex-row items-center absolute px-2 z-40 py-2'}
				style={[{ paddingTop: top + 10 }]}
			>
				<TouchableOpacity
					onPress={() => {
						actions.onSelectMedia('header', []);
						actions.onSelectMedia('avatar', []);
						navigation.goBack();
					}}
					className="w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 opacity-50 mr-1"
				>
					<ProfileBackIcon />
				</TouchableOpacity>
			</View>
			<View className="flex-1">
				<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
								imageUrl={header.selectedMedia}
								handleOnPressDelete={() =>
									setDelConfAction({ visible: true, title: 'header' })
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
								imageUrl={avatar.selectedMedia}
								handleOnPressDelete={() =>
									setDelConfAction({ visible: true, title: 'avatar' })
								}
							/>
						</ThemeModal>

						{/* Header Image */}
						<Pressable onPress={() => actions.onToggleMediaModal('header')}>
							<FastImage
								className="bg-patchwork-dark-50 h-36 w-full"
								source={{
									uri:
										typeof header.selectedMedia === 'string'
											? header?.selectedMedia
											: header?.selectedMedia[0]?.uri,
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
										uri:
											typeof avatar.selectedMedia === 'string'
												? avatar?.selectedMedia
												: avatar?.selectedMedia[0]?.uri,
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
			</View>
			<CustomAlert
				isVisible={delConfAction.visible}
				message={`Are u sure you want to delete the ${delConfAction?.title}?`}
				hasCancel
				handleCancel={() => setDelConfAction({ visible: false })}
				handleOk={() => {
					if (delConfAction.title) handlePressDelConf();
				}}
				type="error"
			/>
			<LoadingModal isVisible={isDeletingMedia || isUpdatingProfile} />
		</>
	);
};

export default EditProfile;
