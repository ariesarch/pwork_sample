import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ChannelGuidelines from '@/components/molecules/channel/ChannelGuidelines/ChannelGuidelines';
import ChannelInformation from '@/components/molecules/channel/ChannelInformation/ChannelInformation';

type Props = {
	channelAbout: Pathchwork.ChannelAbout | undefined;
};
const ChannelAbout = ({ channelAbout }: Props) => {
	return (
		<>
			<ChannelGuidelines channelAbout={channelAbout} />
			<ChannelInformation channelAbout={channelAbout} />
		</>
	);
};

export default ChannelAbout;
