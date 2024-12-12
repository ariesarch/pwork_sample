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
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import { FormattedText } from '@/components/atoms/compose/FormattedText/FormattedText';
import { queryClient } from '@/App';
import { FeedRepliesQueryKey } from '@/types/queries/feed.type';
import { DEFAULT_API_URL } from '@/util/constant';

type Props = {
	isFirstMsg: boolean;
	firstMsg: Pathchwork.Conversations;
	handleScroll: () => void;
	inReplyToId: string | undefined;
	id: string;
};

const MessageActionsBar = ({
	handleScroll,
	firstMsg,
	isFirstMsg,
	inReplyToId,
	id,
}: Props) => {
	const { colorScheme } = useColorScheme();
	const selectionColor = useAppropiateColorHash('patchwork-red-50');
	const { composeState, composeDispatch } = useComposeStatus();
	const { mutate, isPending } = useComposeMutation({
		onSuccess: (response: Pathchwork.Status) => {
			console.log('success');
			const queryKey: FeedRepliesQueryKey = [
				'feed-replies',
				{ domain_name: process.env.API_URL ?? DEFAULT_API_URL, id: id },
			];
			// queryClient.invalidateQueries({ queryKey });
			queryClient.invalidateQueries({ queryKey }).then(() => {
				const queryState = queryClient.getQueryState(queryKey);
				console.log('Query state after invalidation:', queryState);
			});
			const cachedData = queryClient.getQueryData(queryKey);
			console.log('Cached data after invalidation:', cachedData);
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
			// payload.in_reply_to_id = isFirstMsg
			// ? firstMsg.last_status?.id
			// : // : inReplyToId
			// ? inReplyToId
			// firstMsg.last_status.in_reply_to_id;
			payload.in_reply_to_id = firstMsg.last_status?.id;
			payload.status = `@${firstMsg?.accounts[0]?.username}@${firstMsg?.last_status?.application?.name} ${payload.status}`;
			mutate(payload);
		}
	};

	const handleChangeText = (text: string) => {
		composeDispatch({
			type: 'text',
			payload: {
				count: text.length,
				raw: text,
			},
		});

		if (composeState.disableUserSuggestionsModal) {
			composeDispatch({
				type: 'disableUserSuggestionsModal',
				payload: false,
			});
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
					placeholder="Your message..."
					className="flex-1 rounded-md px-4 py-2 border-gray-300 bg-patchwork-grey-400 text-white"
					placeholderTextColor={'#fff'}
					autoFocus={false}
					selectionColor={selectionColor}
					onChangeText={handleChangeText}
					autoCorrect
					autoComplete="off"
					autoCapitalize="none"
					spellCheck
					onPress={handleScroll}
				>
					<FormattedText text={composeState.text.raw} />
				</TextInput>
				<Pressable
					disabled={!composeState.text.raw}
					onPress={sendMessage}
					className="ml-2 rounded-full p-3"
				>
					<ThemeText
						className={`border-[1] border-[1px]  py-[6] px-3 rounded-full  ${
							composeState.text.raw
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
