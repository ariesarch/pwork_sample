import { View, ScrollView } from 'react-native';
import React from 'react';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import Header from '@/components/atoms/common/Header/Header';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import SendButton from '@/components/atoms/conversations/SendButton/SendButton';
import ComposeTextInput from '@/components/atoms/compose/ComposeTextInput/ComposeTextInput';
import UserSuggestionModal from '@/components/atoms/compose/UserSuggestionModal/UserSuggestionModal';
import {
	BottomBarHeight,
	useGradualAnimation,
} from '@/hooks/custom/useGradualAnimation';
import { ComposeStatusProvider } from '@/context/composeStatusContext/composeStatus.context';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import ComposeActionsBar from '@/components/molecules/compose/ComposeActionsBar/ComposeActionsBar';
import ConversationsActionsBar from '@/components/molecules/conversations/ConversationsActionsBar.tsx/ConversationsActionsBar';

const NewMessage = () => {
	const { height } = useGradualAnimation();

	const virtualKeyboardContainerStyle = useAnimatedStyle(() => {
		return {
			height:
				height.value > BottomBarHeight ? height.value - BottomBarHeight : 0,
		};
	});

	return (
		<SafeScreen>
			<ComposeStatusProvider type="chat">
				<View style={{ flex: 1 }}>
					<Header
						title="New Message"
						leftCustomComponent={<BackButton />}
						rightCustomComponent={
							<SendButton
							// disabled={!selectedUser || !messageText}
							/>
						}
					/>
					<ScrollView
						keyboardShouldPersistTaps="always"
						contentContainerStyle={{ paddingBottom: 100 }}
						showsVerticalScrollIndicator={false}
					>
						<View className="px-4">
							<ComposeTextInput placeholder="@Username..." />
						</View>
					</ScrollView>
					<UserSuggestionModal />
					<ConversationsActionsBar />
					<Animated.View style={virtualKeyboardContainerStyle} />
				</View>
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default NewMessage;
