import ProfileInfo from '@/components/organisms/profile/ProfileInfo';
import React from 'react';
import { View } from 'react-native';

const ProfilePage = () => {
	return (
		<View className="flex-1 bg-patchwork-dark-100">
			<ProfileInfo />
		</View>
	);
};

export default ProfilePage;
