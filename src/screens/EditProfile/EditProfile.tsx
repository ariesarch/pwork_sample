import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { Button } from '@/components/atoms/common/Button/Button';
import { useNavigation } from '@react-navigation/native';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import ManageAttachmentModal from '@/components/organisms/profile/ManageAttachment/MakeAttachmentModal';
import LoadingModal from '@/components/atoms/common/LoadingModal/LoadingModal';
import Animated from 'react-native-reanimated';
import { ProfileBackIcon } from '@/util/svg/icon.profile';
import CustomAlert from '@/components/atoms/common/CustomAlert/CustomAlert';
import { useEditProfile } from '@/hooks/custom/useEditProfile';
import ProfileForm from '@/components/molecules/editProfile/ProfileForm';
import AvatarMedia from '@/components/molecules/editProfile/AvatarMedia';
import HeaderMedia from '@/components/molecules/editProfile/HeaderMedia';

const EditProfile = () => {
	const navigation = useNavigation();
	const {
		profile,
		setProfile,
		userInfo,
		header,
		avatar,
		actions,
		top,
		delConfAction,
		setDelConfAction,
		handleUpdateProfile,
		handlePressDelConf,
		isUpdatingProfile,
		isDeletingMedia,
		virtualKeyboardContainerStyle,
	} = useEditProfile();

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
						<HeaderMedia header={header} actions={actions} />
						<AvatarMedia avatar={avatar} actions={actions} />
						<ThemeText className="mx-auto">{userInfo.display_name}</ThemeText>
						<ProfileForm
							profile={profile}
							onChangeName={name =>
								setProfile(prev => ({
									...prev,
									display_name: name,
								}))
							}
							onChangeBio={bio =>
								setProfile(prev => ({
									...prev,
									bio: bio,
								}))
							}
						/>
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
			{delConfAction.visible && (
				<CustomAlert
					message={`Are u sure you want to delete the ${delConfAction?.title}?`}
					hasCancel
					handleCancel={() => setDelConfAction({ visible: false })}
					handleOk={() => {
						if (delConfAction.title) handlePressDelConf();
					}}
					type="error"
				/>
			)}
			<LoadingModal isVisible={isDeletingMedia || isUpdatingProfile} />
		</>
	);
};

export default EditProfile;
