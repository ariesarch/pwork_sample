import { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import ComposeActionsBar from '@/components/molecules/compose/ComposeActionsBar/ComposeActionsBar';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { TabBarScreenProps } from '@/types/navigation';
import ComposeRepostButton from '@/components/atoms/compose/ComposeRepostButton/ComposeRepostButton';
import RepostStatus from '@/components/organisms/compose/RepostStatus/RepostStatus';
import { ComposeStatusProvider } from '@/context/composeStatusContext/composeStatus.context';
import UserSuggestionModal from '@/components/atoms/compose/UserSuggestionModal/UserSuggestionModal';
import { useGradualAnimation } from '@/hooks/custom/useGradualAnimation';
import ComposeButton from '@/components/atoms/compose/ComposeButton/ComposeButton';
import { useCallToActionStore } from '@/store/compose/callToAction/callToActionStore';
import { useColorScheme } from 'nativewind';
import EditComposeStatus from '@/components/organisms/compose/EditComposeStatus/EditComposeStatus';
import CreateComposeStatus from '@/components/organisms/compose/CreateComposeStatus/CreateComposeStatus';

const Compose = ({ route }: TabBarScreenProps<'Compose'>) => {
	const composeParams = route.params;
	const isRepost = composeParams?.type === 'repost';
	const isEdit = composeParams?.type === 'edit';

	// ***** Floating ComposeActionsBar ***** //
	const { height } = useGradualAnimation();

	const toolbarAnimatedViewStyle = useAnimatedStyle(() => {
		return {
			height: Math.abs(height.value),
		};
	});
	// ***** Floating ComposeActionsBar ***** //

	const ctaText = useCallToActionStore(state => state.ctaText);

	const renderComposeHeaderTitle = useCallback(() => {
		switch (composeParams?.type) {
			case 'edit':
				return 'Edit post';
			case 'repost':
				return 'Re-post';
			default:
				return 'New post';
		}
	}, [composeParams?.type]);

	return (
		<SafeScreen>
			<ComposeStatusProvider type={composeParams.type}>
				<View style={{ flex: 1 }}>
					<Header
						title={renderComposeHeaderTitle()}
						leftCustomComponent={<BackButton />}
						rightCustomComponent={
							isRepost ? (
								<ComposeRepostButton
									id={composeParams.incomingStatus.id}
									otherUserId={composeParams.incomingStatus.account.id}
									isFeedDetail={composeParams.isFeedDetail}
								/>
							) : (
								<ComposeButton
									{...{
										statusId: isEdit ? composeParams.incomingStatus.id : '',
									}}
								/>
							)
						}
					/>
					<ScrollView
						keyboardShouldPersistTaps="always"
						contentContainerStyle={{ paddingBottom: 100 }}
						showsVerticalScrollIndicator={false}
					>
						{composeParams.type === 'edit' && (
							<EditComposeStatus status={composeParams.incomingStatus} />
						)}

						{composeParams.type === 'repost' && (
							<RepostStatus status={composeParams.incomingStatus} />
						)}

						{composeParams.type === 'create' && <CreateComposeStatus />}
					</ScrollView>
					<UserSuggestionModal />
					<ComposeActionsBar isRepost={composeParams.type === 'repost'} />
					<Animated.View style={toolbarAnimatedViewStyle} />
				</View>
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default Compose;
