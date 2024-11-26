import { memo, useCallback } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import ComposeActionsBar from '@/components/molecules/compose/ComposeActionsBar/ComposeActionsBar';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Header from '@/components/atoms/common/Header/Header';
import ComposeTextInput from '@/components/atoms/compose/ComposeTextInput/ComposeTextInput';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { RouteProp } from '@react-navigation/native';
import { BottomStackParamList } from '@/types/navigation';
import ComposeRepostButton from '@/components/atoms/compose/ComposeRepostButton/ComposeRepostButton';
import RepostStatus from '@/components/organisms/compose/RepostStatus/RepostStatus';
import {
	ComposeStatusProvider,
	useComposeStatus,
} from '@/context/composeStatusContext/composeStatus.context';
import { LinkCard } from '@/components/atoms/compose/LinkCard/LinkCard';
import UserSuggestionModal from '@/components/atoms/compose/UserSuggestionModel/UserSuggestionModel';

import { useManageAttachmentStore } from '@/store/compose/manageAttachments/manageAttachmentStore';
import { useGradualAnimation } from '@/hooks/custom/useGradualAnimation';
import { useCallToActionStore } from '@/store/compose/callToAction/callToActionStore';
import Chip from '@/components/atoms/common/Chip/Chip';
import { useColorScheme } from 'nativewind';
import { LinkIcon } from '@/util/svg/icon.profile';

const RightCustomComponent = memo(({ isRepost }: { isRepost: boolean }) => {
	return isRepost ? (
		<ComposeRepostButton onPress={() => {}} />
	) : (
		<Pressable className="border-[1] border-[1px] border-patchwork-grey-100 py-[6] px-3 rounded-full">
			<ThemeText size={'fs_13'} className="leading-5">
				Post
			</ThemeText>
		</Pressable>
	);
});

type ComposeScreenRouteProp = RouteProp<BottomStackParamList, 'Compose'>;
const Compose = ({ route }: { route: ComposeScreenRouteProp }) => {
	const composeParams = route.params;
	const isRepost = composeParams?.type === 'repost';

	const { colorScheme } = useColorScheme();

	const selectedMedia = useManageAttachmentStore(state => state.selectedMedia);
	const ctaText = useCallToActionStore(state => state.ctaText);

	const renderComposeHeaderTitle = useCallback(() => {
		switch (composeParams?.type) {
			case 'create':
				return 'New post';
			case 'repost':
				return 'Re-post';
			default:
				return 'New post';
		}
	}, [composeParams?.type]);

	// ****** Compose Action Toolbar ****** //
	const { height } = useGradualAnimation();

	const toolbarAnimatedViewStyle = useAnimatedStyle(() => {
		return {
			height: Math.abs(height.value),
		};
	});
	// ****** Compose Action Toolbar ****** //

	return (
		<SafeScreen>
			<ComposeStatusProvider type={composeParams.type}>
				<View style={{ flex: 1 }}>
					{/* Header */}
					<Header
						title={renderComposeHeaderTitle()}
						leftCustomComponent={<BackButton />}
						rightCustomComponent={<RightCustomComponent {...{ isRepost }} />}
					/>

					{/* Scrollable Content */}
					<ScrollView
						keyboardShouldPersistTaps="always"
						contentContainerStyle={{ paddingBottom: 100 }}
						showsVerticalScrollIndicator={false}
					>
						{composeParams.type === 'repost' ? (
							<RepostStatus status={composeParams.incomingStatus} />
						) : (
							<View className="px-4">
								<ComposeTextInput />
								<LinkCard />

								{/* Additional Components */}
								<View className="my-5">
									{selectedMedia.length > 0 && (
										<FastImage
											className="w-full h-56 rounded-md"
											source={{
												uri: selectedMedia[0].uri,
												priority: FastImage.priority.high,
												cache: FastImage.cacheControl.immutable,
											}}
											resizeMode={'cover'}
										/>
									)}
								</View>
								{/* Call To Action View */}
								<View>
									<Chip
										startIcon={<LinkIcon {...{ colorScheme }} />}
										title={ctaText}
										className="absolute"
									/>
								</View>
								{/* Call To Action View */}
							</View>
						)}
					</ScrollView>

					{/* UserSuggestionModal */}
					<UserSuggestionModal />
					{/* UserSuggestionModal */}

					{/* Compose Action Tool Bar */}
					<ComposeActionsBar />
					<Animated.View style={toolbarAnimatedViewStyle} />
					{/* Compose Action Tool Bar */}
				</View>
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default Compose;
