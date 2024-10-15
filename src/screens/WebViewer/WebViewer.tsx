import React, { useState } from 'react';
import WebView from 'react-native-webview';
import { View } from 'react-native';
import { RootScreenProps } from '@/types/navigation';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';

const WebViewer: React.FC<RootScreenProps<'WebViewer'>> = ({ route }) => {
	const [loading, setLoading] = useState(false);
	return (
		<View className="flex-1 bg-patchwork-dark-900">
			<WebView
				originWhitelist={['*']}
				style={{ flex: 1, backgroundColor: customColor['patchwork-dark-100'] }}
				startInLoadingState={true}
				source={{ uri: route?.params?.url }}
				onLoadStart={() => setLoading(true)}
				onLoadEnd={() => setLoading(false)}
				renderLoading={() => {
					return (
						<View className="flex-1 bg-patchwork-dark-100 items-center justify-center">
							<Flow size={50} color={customColor['patchwork-red-50']} />
						</View>
					);
				}}
				mediaPlaybackRequiresUserAction={true}
				mixedContentMode={'compatibility'}
			/>
		</View>
	);
};

export default WebViewer;
