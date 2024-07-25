import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import Banner from '../../atoms/profile/Banner';
import {
	VerticalInfo,
	SocialSection,
	ProfileHeaderRight,
	ActionButtons,
	ActiveChannels,
} from '@/components/molecules';
import Header from '@/components/atoms/common/header/header';
import { ChevronLeftIcon } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import { mockStatusList } from '@/mock/feed/statusList';
import StatusItem from '../feed/StatusItem/StatusItem';
import Underline from '@/components/atoms/common/Underline/Underline';

const ProfileInfo = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const listHeaderComponent = () => {
		return (
			<View>
				<Header
					className="z-40 mt-14 absolute"
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
				<Underline className='my-2'/>
				<ActiveChannels />
			</View>
		);
	};
	return (
		<View className="flex-1">
			{/* <Header
				className="z-40 mt-14 absolute"
				leftCustomComponent={
					<Pressable
						onPress={() => navigation.goBack()}
						className="w-8 h-8 items-center justify-center rounded-full bg-patchwork-dark-100 opacity-50"
					>
						<ChevronLeftIcon />
					</Pressable>
				}
				rightCustomComponent={<ProfileHeaderRight />}
			/> */}
			<View>
				<FlatList
					data={mockStatusList}
					showsVerticalScrollIndicator={false}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => <StatusItem status={item} />}
					ListHeaderComponent={listHeaderComponent}
					contentContainerStyle={{ paddingBottom: 40 }}
				/>
			</View>
		</View>
	);
};

export default ProfileInfo;
