import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ChannelGuidelines from '@/components/molecules/channel/ChannelGuidelines/ChannelGuidelines';
import ChannelInformation from '@/components/molecules/channel/ChannelInformation/ChannelInformation';

const ChannelAbout = () => {
	return (
		<>
			<ChannelGuidelines />
			<ChannelInformation />
		</>
	);
};

export default ChannelAbout;

const styles = StyleSheet.create({});
