import React, { useState } from 'react';
import WebView from 'react-native-webview';
import { View } from 'react-native';
import { RootScreenProps } from '@/types/navigation';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import Header from '@/components/atoms/common/Header/Header';
import BackButton from '@/components/atoms/common/BackButton/BackButton';

const WebViewer: React.FC<RootScreenProps<'WebViewer'>> = ({ route }) => {
	return (
		<SafeScreen>
			<View className="flex-1 bg-patchwork-dark-100">
				<Header title="Post" leftCustomComponent={<BackButton />} />
				<WebView
					originWhitelist={['*']}
					style={{
						flex: 1,
						backgroundColor: customColor['patchwork-dark-100'],
					}}
					startInLoadingState={true}
					source={{ uri: route?.params?.url }}
					renderLoading={() => {
						return (
							<View className="absolute top-0 left-0 w-full h-full bg-patchwork-dark-100 justify-center items-center">
								<Flow size={50} color={customColor['patchwork-red-50']} />
							</View>
						);
					}}
					mediaPlaybackRequiresUserAction={true}
					mixedContentMode={'compatibility'}
				/>
			</View>
		</SafeScreen>
	);
};

export default WebViewer;
