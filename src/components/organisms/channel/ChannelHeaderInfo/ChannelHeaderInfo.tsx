import React from 'react';
import { View } from 'react-native';
import Underline from '@/components/atoms/common/Underline/Underline';
import VerticalInfo from '@/components/molecules/common/VerticalInfo/VerticalInfo';
import ActionButtons from '@/components/molecules/profile/ActionButtons/ActionButtons';
import Chip from '@/components/atoms/common/Chip/Chip';

const ChannelHeaderInfo = () => {
	return (
		<View className="bg-patchwork-light-900 dark:bg-patchwork-dark-100 mt-[70]">
			<View className="flex-row mt-3">
				<VerticalInfo
					accountName={'Channel name'}
					username={'username'}
					joinedDate={'Created on Dec 2022'}
					userBio={
						'Consectetur quam cursus posuere at. Diam odio eu luctus viverra magna. Aliquet dui sagittis faucibus sit mi.'
					}
					showChannelFollowers
				/>
				<ActionButtons name="Follow" />
			</View>
			<Underline className="mb-1 mt-2" />
		</View>
	);
};

export default ChannelHeaderInfo;
