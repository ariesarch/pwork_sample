import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ChannelGuidelines from '@/components/molecules/channel/ChannelGuidelines/ChannelGuidelines';
import ChannelInformation from '@/components/molecules/channel/ChannelInformation/ChannelInformation';

type Props = {
	channelAbout: Pathchwork.ChannelAbout | undefined;
	channelAdditionalInfo: Pathchwork.ChannelAdditionalInfo;
};
const ChannelAbout = (prop: Props) => {
	return (
		<>
			<ChannelGuidelines channelAbout={prop.channelAbout} />
			<ChannelInformation {...prop} />
		</>
	);
};

export default ChannelAbout;
