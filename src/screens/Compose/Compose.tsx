import { View, Pressable } from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

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
			<Header
				title={renderComposeHeaderTitle()}
				leftCustomComponent={<BackButton />}
				rightCustomComponent={<RightCustomComponent {...{ isRepost }} />}
			/>
			<KeyboardAwareScrollView
				contentContainerStyle={{ flexGrow: 1, flex: 1 }}
				keyboardShouldPersistTaps="always"
			>
				{composeParams.type === 'repost' ? (
					/* ***** Re-post Status Rendering ***** */
					<RepostStatus status={composeParams.incomingStatus} />
				) : (
					/* ***** Re-post Status Rendering ***** */
					<View className="flex-1 px-4">
						<ComposeTextInput />
					</View>
				)}
				<ComposeActionsBar />
			</KeyboardAwareScrollView>
		</SafeScreen>
	);
};

export default Compose;
