import React, { useState } from 'react';
import WebView from 'react-native-webview';
import { Linking, Pressable, View } from 'react-native';
import { RootScreenProps } from '@/types/navigation';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import Header from '@/components/atoms/common/Header/Header';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import * as Progress from 'react-native-progress';
import { Browser } from '@/util/svg/icon.common';
import { cn } from '@/util/helper/twutil';

const WebViewer: React.FC<RootScreenProps<'WebViewer'>> = ({ route }) => {
	const match = route.params.url.match(
		/^(?:https?:\/\/)?(?:www\.)?([^\\/\n?]+)/i,
	);
	const [progress, setProgress] = useState(0);
	const [isLoaded, setLoaded] = useState(false);

	return (
		<SafeScreen>
			<Header
				title={match![0]}
				leftCustomComponent={<BackButton extraClass="border-0" />}
				rightCustomComponent={<OpenInBrowser url={route.params.url} />}
				hideUnderline
			/>
			{!isLoaded && (
				<Progress.Bar
					progress={progress}
					width={null}
					borderWidth={0}
					borderRadius={0}
					height={3}
					color="#FF3C26"
				/>
			)}
			<WebView
				originWhitelist={['*']}
				style={{
					flex: 1,
					backgroundColor: customColor['patchwork-dark-100'],
				}}
				startInLoadingState={true}
				source={{ uri: route?.params?.url }}
				onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
				renderLoading={() => {
					return (
						// <View className="absolute top-0 left-0 w-full h-full bg-patchwork-dark-100 justify-center items-center">
						// 	<Flow size={50} color={customColor['patchwork-red-50']} />
						// </View>
						<></>
					);
				}}
				mediaPlaybackRequiresUserAction={true}
				mixedContentMode={'compatibility'}
				onLoadEnd={() => setLoaded(true)}
			/>
		</SafeScreen>
	);
};

const OpenInBrowser = ({ url }: { url: string }) => {
	return (
		<Pressable
			onPress={() => Linking.openURL(url)}
			className={cn('w-10 h-10 items-center justify-center rounded-full')}
		>
			<Browser />
		</Pressable>
	);
};

export default WebViewer;
