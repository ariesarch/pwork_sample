import React from 'react';
import { View } from 'react-native';
import Underline from '@/components/atoms/common/Underline/Underline';
import ActionButtons from '@/components/molecules/profile/ActionButtons/ActionButtons';
import ActiveChannels from '@/components/molecules/profile/ActiveChannels/ActiveChannels';
import SocialSection from '@/components/molecules/profile/SocialSection/SocialSection';
import UserStats from '@/components/molecules/profile/UserStats/UserStats';
import VerticalInfo from '@/components/molecules/common/VerticalInfo/VerticalInfo';

const ProfileInfo = () => {
	return (
		<View className="bg-patchwork-light-900 dark:bg-patchwork-dark-100 mt-[70]">
			<View className="flex-row">
				<VerticalInfo
					hasRedMark
					accountName="Account name"
					username="iwashere"
					joinedDate="Joined on Dec 2022"
					profileInfo="Phasellus nunc leo ullamcorper non. Eget eu ut nunc ut convallis malesuada. Accumsan venenatis at fermentum."
				/>
				<ActionButtons className="right-[135] bottom-14" hasIcon name='Follow'/>
			</View>
			<SocialSection />
			<UserStats posts={24} following={'2.2k'} followers={'7.3k'} />
			<Underline className="my-2" />
			<ActiveChannels />
			<Underline className="my-2" />
		</View>
	);
};

export default ProfileInfo;
