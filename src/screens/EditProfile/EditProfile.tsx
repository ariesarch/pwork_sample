import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import FastImage from 'react-native-fast-image';
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

type ProfileType = {
	display_name?: string;
	bio?: string;
	avatar?: string;
	header?: string;
};

const EditProfile = () => {
	const { userInfo } = useAuthStore();
	const navigation = useNavigation();
	const [profile, setProfile] = useState<ProfileType>();

	useEffect(() => {
		if (userInfo) {
			setProfile({
				display_name: userInfo.display_name,
				bio: userInfo.note.split('<p>')[1]?.split('</p>')[0],
				avatar: userInfo.avatar,
				header: userInfo.header,
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
				// avatar: profile?.avatar,
				// header: profile?.header,
			};

			await mutateAsync(payload);
		} catch (error) {
			handleError(error);
		}
	};

	if (!userInfo) return null;
	return (
		<SafeScreen>
			<Header title="Edit Profile" leftCustomComponent={<BackButton />} />
			<View className="flex-1 -mt-2 bg-white dark:bg-patchwork-dark-100">
				<FastImage
					className="bg-patchwork-dark-50 h-[140]"
					source={{
						uri: 'https://via.placeholder.com/1200x400',
						priority: FastImage.priority.normal,
					}}
					resizeMode={FastImage.resizeMode.cover}
				/>
				<View className="mx-auto">
					<FastImage
						className={cn(
							'w-[70] h-[70] mt-[-25] bg-patchwork-dark-50  border-patchwork-dark-100 border-4 rounded-full',
						)}
						source={{
							uri: 'https://via.placeholder.com/300x300',
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.cover}
					/>
				</View>
				<View className="flex-1 mx-3">
					<ThemeText variant={'textOrange'} size={'md_16'}>
						Public Info
					</ThemeText>
					<ThemeText className="mt-3" variant={'textOrange'}>
						Display Name
					</ThemeText>
					<TextInput
						value={profile?.display_name || ''}
						onChangeText={name =>
							setProfile(prev => ({
								...prev,
								display_name: name,
							}))
						}
					/>
					<ThemeText className="mt-3" variant={'textOrange'}>
						Bio
					</ThemeText>
					<TextInput
						value={profile?.bio || ''}
						onChangeText={bio =>
							setProfile(prev => ({
								...prev,
								bio: bio,
							}))
						}
					/>
					<Button
						disabled={!profile?.display_name}
						className="absolute bottom-0 left-0 right-0 mb-5"
						onPress={handleUpdateProfile}
					>
						<ThemeText>Save</ThemeText>
					</Button>
				</View>
			</View>
		</SafeScreen>
	);
};

export default EditProfile;
