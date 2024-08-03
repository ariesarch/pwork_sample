import React from 'react';
import { View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useColorScheme } from 'nativewind';
import ComposeActionsBar from '@/components/molecules/compose/ComposeActionsBar/ComposeActionsBar';
import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Header from '@/components/atoms/common/header/header';
import Audience from '@/components/molecules/compose/Audience/Audience';
import ComposeTextInput from '@/components/atoms/compose/ComposeTextInput/ComposeTextInput';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';

const PLATFORM_KEYBOARD_OFFSET = Platform.select({
	android: 42,
	ios: 0,
});

const Compose = () => {
	const { toggleColorScheme } = useColorScheme();
	return (
		<SafeScreen>
			<Header
				title="New Post"
				leftCustomComponent={<BackButton />}
				rightCustomComponent={
					<Pressable
						onPress={toggleColorScheme}
						className="border-[1] border-[1px] border-patchwork-grey-100 py-[6] px-3 rounded-full"
					>
						<ThemeText>Post</ThemeText>
					</Pressable>
				}
			/>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={PLATFORM_KEYBOARD_OFFSET}
				style={{ flexGrow: 1 }}
			>
				<Audience />
				<View className="px-4">
					<ComposeTextInput />
				</View>
				<View className="flex-1" />
				<ComposeActionsBar />
			</KeyboardAvoidingView>
		</SafeScreen>
	);
};

export default Compose;
