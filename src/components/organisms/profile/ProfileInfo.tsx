import React from 'react';
import { Pressable, View } from 'react-native';
import Banner from '../../atoms/profile/Banner';
import {
	VerticalInfo,
	SocialSection,
	ProfileHeaderRight,
	ActionButtons,
	ActiveChannels,
} from '@/components/molecules';
import { ComponentSeparator } from '@/components/atoms';
import Header from '@/components/atoms/common/header/header';
import { ChevronLeftIcon } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

const ProfileInfo = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	return (
		<View className="flex-1">
			<Header
				className="z-40 mt-14"
				leftCustomComponent={
					<Pressable
						onPress={() => navigation.goBack()}
						className="w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 opacity-50"
					>
						<ChevronLeftIcon />
					</Pressable>
				}
				rightCustomComponent={<ProfileHeaderRight />}
			/>
			<View className="absolute">
				<Banner source={require('@/assets/images/profile/banner_img.jpeg')} />
				<View className="flex-row">
					<VerticalInfo
						avatarSrc={require('@/assets/images/profile/profile_img.jpeg')}
						accountName="Account name"
						username="iwashere"
						joinedDate="Dec 2022"
						profileInfo="Phasellus nunc leo ullamcorper non. Eget eu ut nunc ut convallis malesuada. Accumsan venenatis at fermentum."
					/>
					<ActionButtons hasIcon />
				</View>
				<SocialSection posts={24} following={'2.2k'} followers={'7.3k'} />
				<ComponentSeparator />
				<ActiveChannels />
			</View>
		</View>
	);
};

export default ProfileInfo;
