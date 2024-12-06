import React from 'react';
import { View, Pressable } from 'react-native';
import { ComposeGalleryIcon, ComposeGifIcon } from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { TextInput } from 'react-native';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useComposeMutation } from '@/hooks/mutations/feed.mutation';
import Toast from 'react-native-toast-message';
import { prepareComposePayload } from '@/util/helper/compose';

type Props = {
	message: string;
	handleMessage: (text: string) => void;
	handleScroll: () => void;
};

const MessageActionsBar = ({ message, handleMessage, handleScroll }: Props) => {
	const { colorScheme } = useColorScheme();
	const { composeState, composeDispatch } = useComposeStatus();

	const { mutate, isPending } = useComposeMutation({
		onSuccess: (response: Pathchwork.Status) => {
			composeDispatch({ type: 'clear' });
		},
		onError: e => {
			Toast.show({
				type: 'errorToast',
				text1: 'Something went wrong',
				position: 'top',
				topOffset: 50,
			});
		},
	});
	const sendMessage = () => {
		if (composeState.text.count <= composeState.maxCount) {
			let payload;
			payload = prepareComposePayload(composeState);
			payload.visibility = 'direct';
			mutate(payload);
		}
	};

	return (
		<View>
			<View className="flex-row items-center px-2 pt-1 bg-patchwork-grey-70">
				<Pressable
					className={'mr-3'}
					children={<ComposeGalleryIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<ComposeGifIcon {...{ colorScheme }} />}
				/>
				<TextInput
					value={message}
					onChangeText={handleMessage}
					placeholder="Your message..."
					className="flex-1 rounded-md px-4 py-2 border-gray-300 bg-patchwork-grey-400 text-white"
					placeholderTextColor={'#fff'}
					autoFocus
					onPress={handleScroll}
				/>
				<Pressable
					// disabled={!message}
					disabled
					onPress={sendMessage}
					className="ml-2 rounded-full p-3"
				>
					<ThemeText
						className={`border-[1] border-[1px]  py-[6] px-3 rounded-full  ${
							message
								? 'text-patchwork-red-50 border-patchwork-red-50'
								: 'border-patchwork-grey-100 text-patchwork-grey-100'
						}`}
					>
						Send
					</ThemeText>
				</Pressable>
			</View>
		</View>
	);
};

export default MessageActionsBar;
