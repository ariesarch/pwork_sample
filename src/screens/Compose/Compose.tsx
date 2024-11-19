import { View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import ComposeActionsBar from '@/components/molecules/compose/ComposeActionsBar/ComposeActionsBar';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Header from '@/components/atoms/common/Header/Header';
import ComposeTextInput from '@/components/atoms/compose/ComposeTextInput/ComposeTextInput';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { RouteProp } from '@react-navigation/native';
import { BottomStackParamList } from '@/types/navigation';
import ComposeRepostButton from '@/components/atoms/compose/ComposeRepostButton/ComposeRepostButton';
import { memo, useCallback } from 'react';
import RepostStatus from '@/components/organisms/compose/RepostStatus/RepostStatus';
import { ComposeStatusProvider } from '@/context/composeStatusContext/composeStatus.context';

const PLATFORM_KEYBOARD_OFFSET = Platform.select({
	android: 42,
	ios: 0,
});

const RightCustomComponent = memo(({ isRepost }: { isRepost: boolean }) => {
	return isRepost ? (
		<ComposeRepostButton onPress={() => {}} />
	) : (
		<Pressable className="border-[1] border-[1px] border-patchwork-grey-100 py-[6] px-3 rounded-full">
			<ThemeText>Post</ThemeText>
		</Pressable>
	);
});

type ComposeScreenRouteProp = RouteProp<BottomStackParamList, 'Compose'>;
const Compose = ({ route }: { route: ComposeScreenRouteProp }) => {
	const composeParams = route.params;
	const isRepost = composeParams?.type === 'repost';

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

	return (
		<SafeScreen>
			<ComposeStatusProvider type={composeParams?.type}>
				<Header
					title={renderComposeHeaderTitle()}
					leftCustomComponent={<BackButton />}
					rightCustomComponent={<RightCustomComponent {...{ isRepost }} />}
				/>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={PLATFORM_KEYBOARD_OFFSET}
					style={{ flexGrow: 1 }}
				>
					{composeParams.type !== 'repost' && (
						<View className="px-4">
							<ComposeTextInput />
						</View>
					)}
					{/****** Re-post Status Rendering ******/}
					{composeParams.type === 'repost' && (
						<RepostStatus status={composeParams.incomingStatus} />
					)}
					{/****** Re-post Status Rendering ******/}
					<View className="flex-1" />
					<ComposeActionsBar />
				</KeyboardAvoidingView>
			</ComposeStatusProvider>
		</SafeScreen>
	);
};

export default Compose;
