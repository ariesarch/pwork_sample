import React from 'react';
import { View } from 'react-native';
import Underline from '@/components/atoms/common/Underline/Underline';
import ActionButtons from '@/components/molecules/profile/ActionButtons/ActionButtons';
import ActiveChannels from '@/components/molecules/profile/ActiveChannels/ActiveChannels';
import SocialSection from '@/components/molecules/profile/SocialSection/SocialSection';
import UserStats from '@/components/molecules/profile/UserStats/UserStats';
import VerticalInfo from '@/components/molecules/common/VerticalInfo/VerticalInfo';

type Prop = {
	accountName: string;
};

const ProfileInfo = ({ accountName }: Prop) => {
	return (
		<View className="bg-patchwork-light-900 dark:bg-patchwork-dark-100 mt-[70]">
			<View className="flex-row mt-3">
				<VerticalInfo
					hasRedMark
					accountName={accountName}
					username="iwashere"
					joinedDate="Joined on Dec 2022"
					userBio="Phasellus nunc leo ullamcorper non. Eget eu ut nunc ut convallis malesuada. Accumsan venenatis at fermentum."
				/>
				<ActionButtons name={'Follow'} hasIcon />
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
