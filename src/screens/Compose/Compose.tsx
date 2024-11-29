import { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import ComposeActionsBar from '@/components/molecules/compose/ComposeActionsBar/ComposeActionsBar';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import ComposeTextInput from '@/components/atoms/compose/ComposeTextInput/ComposeTextInput';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { TabBarScreenProps } from '@/types/navigation';
import ComposeRepostButton from '@/components/atoms/compose/ComposeRepostButton/ComposeRepostButton';
import RepostStatus from '@/components/organisms/compose/RepostStatus/RepostStatus';
import { ComposeStatusProvider } from '@/context/composeStatusContext/composeStatus.context';
import { LinkCard } from '@/components/atoms/compose/LinkCard/LinkCard';
import UserSuggestionModal from '@/components/atoms/compose/UserSuggestionModal/UserSuggestionModal';
import { useGradualAnimation } from '@/hooks/custom/useGradualAnimation';
import ComposeButton from '@/components/atoms/compose/ComposeButton/ComposeButton';
import { useCallToActionStore } from '@/store/compose/callToAction/callToActionStore';
import Chip from '@/components/atoms/common/Chip/Chip';
import { useColorScheme } from 'nativewind';
import { LinkIcon } from '@/util/svg/icon.profile';
import ImageCard from '@/components/atoms/compose/ImageCard/ImageCard';
import PollForm from '@/components/organisms/compose/PollForm/PollForm';

const Compose = ({ route }: TabBarScreenProps<'Compose'>) => {
	const composeParams = route.params;
	const isRepost = composeParams?.type === 'repost';
	const { height } = useGradualAnimation();
	const { colorScheme } = useColorScheme();
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

	const toolbarAnimatedViewStyle = useAnimatedStyle(() => {
		return {
			height: Math.abs(height.value),
		};
	});

	return (
		<SafeScreen>
			<ComposeStatusProvider type={composeParams.type}>
				<View style={{ flex: 1 }}>
					<Header
						title={renderComposeHeaderTitle()}
						leftCustomComponent={<BackButton />}
						rightCustomComponent={
							isRepost ? (
								<ComposeRepostButton id={composeParams.incomingStatus.id} />
							) : (
								<ComposeButton />
							)
						}
					/>
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

								<PollForm />

								<LinkCard />
								<ImageCard />
								{ctaText && (
									<View>
										<Chip
											startIcon={<LinkIcon {...{ colorScheme }} />}
											title={ctaText}
											className="absolute"
										/>
									</View>
								)}
							</View>
						)}
					</ScrollView>
					<UserSuggestionModal />
					<ComposeActionsBar />
					<Animated.View style={toolbarAnimatedViewStyle} />
				</View>
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default Compose;
