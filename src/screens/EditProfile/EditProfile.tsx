import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useAuthStore } from '@/store/auth/authStore';
import { cn } from '@/util/helper/twutil';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { Button } from '@/components/atoms/common/Button/Button';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import Header from '@/components/atoms/common/Header/Header';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingModal from '@/components/atoms/common/LoadingModal/LoadingModal';
import Toast from 'react-native-toast-message';

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
					},
				],
			});
			setUserInfo(response);
			navigation.goBack();
		},
		onError: error => {
			handleError(error);
		},
	});
	const handleUpdateProfile = async () => {
		try {
			const payload: UpdateProfilePayload = {
				display_name: profile?.display_name,
				note: profile?.bio,
				avatar: avatar.selectedMedia.length > 0 ? avatar.selectedMedia[0] : '',
				header: header.selectedMedia.length > 0 ? header.selectedMedia[0] : '',
			};
			await mutateAsync(payload);
		} catch (error) {
			handleError(error);
		}
	};

	if (!userInfo) return null;

	return (
		<SafeScreen>
			<Header
				hideUnderline
				title="Edit Your Profile"
				leftCustomComponent={
					<BackButton
						customOnPress={() => {
							actions.onSelectMedia('header', []);
							actions.onSelectMedia('avatar', []);
							navigation.goBack();
						}}
					/>
				}
			/>
			<KeyboardAwareScrollView
				enableOnAndroid
				extraScrollHeight={85}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<View className="flex-1 -mt-2 bg-white dark:bg-patchwork-dark-100">
					{/* Header Media Modal */}
					<ThemeModal
						hasNotch={false}
						openThemeModal={header.mediaModal}
						onCloseThemeModal={() => {
							actions.onToggleMediaModal('header');
							actions.onSelectMedia('header', []);
						}}
						modalPositionStyle={{
							justifyContent: 'flex-end',
						}}
						containerStyle={{ borderRadius: 0 }}
					>
						<ManageAttachmentModal
							type="header"
							onToggleMediaModal={() => actions.onToggleMediaModal('header')}
						/>
					</ThemeModal>

					{/* Avatar Media Modal */}
					<ThemeModal
						hasNotch={false}
						openThemeModal={avatar.mediaModal}
						onCloseThemeModal={() => {
							actions.onToggleMediaModal('avatar');
							actions.onSelectMedia('avatar', []);
						}}
						modalPositionStyle={{
							justifyContent: 'flex-end',
						}}
						containerStyle={{ borderRadius: 0 }}
					>
						<ManageAttachmentModal
							type="avatar"
							onToggleMediaModal={() => actions.onToggleMediaModal('avatar')}
						/>
					</ThemeModal>

					{/* Header Image */}
					<Pressable onPress={() => actions.onToggleMediaModal('header')}>
						<FastImage
							className="bg-patchwork-dark-50 h-[100]"
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
							multiline
							textArea
							value={profile?.bio || ''}
							onChangeText={bio =>
								setProfile(prev => ({
									...prev,
									bio: bio,
								}))
							}
						/>
						<Button
							className="absolute bottom-0 left-0 right-0 mb-5"
							onPress={handleUpdateProfile}
						>
							<ThemeText>Save</ThemeText>
						</Button>
					</View>
				</View>
			</KeyboardAwareScrollView>
			<LoadingModal isVisible={isPending} />
		</SafeScreen>
	);
};

export default EditProfile;
