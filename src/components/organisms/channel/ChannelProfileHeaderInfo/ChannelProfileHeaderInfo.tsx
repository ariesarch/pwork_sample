import React from 'react';
import { View } from 'react-native';
import Underline from '@/components/atoms/common/Underline/Underline';
import VerticalInfo from '@/components/molecules/common/VerticalInfo/VerticalInfo';
import ActionButtons from '@/components/molecules/profile/ActionButtons/ActionButtons';
import dayjs from 'dayjs';

type Props = {
	channelAbout: Pathchwork.ChannelAbout;
};
const ChannelProfileHeaderInfo = ({ channelAbout }: Props) => {
	return (
		<View className="bg-patchwork-light-900 dark:bg-patchwork-dark-100 mt-[70]">
			<View className="flex-row mt-3">
				<VerticalInfo
					accountName={channelAbout.title}
					username={channelAbout.contact.account.username}
					joinedDate={dayjs(channelAbout.contact.account.created_at).format(
						'MMM YYYY',
					)}
					userBio={channelAbout.description}
					showChannelFollowers
				/>
				<ActionButtons name="Follow" />
			</View>
			<Underline className="mb-1 mt-2" />
		</View>
	);
};

export default ChannelProfileHeaderInfo;
