import React from 'react';
import { View, Pressable } from 'react-native';
import { ComposeGalleryIcon, ComposeGifIcon } from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useComposeMutation } from '@/hooks/mutations/feed.mutation';
import Toast from 'react-native-toast-message';
import { prepareComposePayload } from '@/util/helper/compose';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import { FormattedText } from '@/components/atoms/compose/FormattedText/FormattedText';
import {
	addNewMsgToQueryCache,
	changeLastMsgInConversationChache,
} from '@/util/cache/conversation/conversationCahce';
import {
	useManageAttachmentActions,
	useManageAttachmentStore,
} from '@/store/compose/manageAttachments/manageAttachmentStore';
import { playSound } from '@/util/helper/conversation';
import { removeOtherMentions } from '@/util/helper/removeOtherMentions';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import ManageAttachmentModal from '@/components/organisms/compose/modal/ManageAttachment/MakeAttachmentModal';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { cn } from '@/util/helper/twutil';

type Props = {
	account: Pathchwork.Account;
	lastMsg?: Pathchwork.Status;
	changeTotalMsgList: (status: Pathchwork.Status) => void;
};

const InitialMessageActionsBar = ({
	lastMsg,
	account,
	changeTotalMsgList,
}: Props) => {
	const { colorScheme } = useColorScheme();
	const selectionColor = useAppropiateColorHash('patchwork-red-50');
	const { composeState, composeDispatch } = useComposeStatus();
	const { mediaModal } = useManageAttachmentStore();
	const { onToggleMediaModal, resetAttachmentStore } =
		useManageAttachmentActions();

	const { mutate, isPending } = useComposeMutation({
		onSuccess: (response: Pathchwork.Status) => {
			// changeLastMsgInConversationChache(response, currentConversation?.id);
			composeDispatch({ type: 'clear' });
			resetAttachmentStore();
			playSound('send');
			changeTotalMsgList(response);
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
			payload.in_reply_to_id = lastMsg?.id;
			payload.status = removeOtherMentions(
				`@${account.acct} ${payload.status}`,
			);
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
			<View className="flex-row items-center p-2 bg-patchwork-grey-70">
				<Pressable
					className={'mr-3'}
					onPress={() => {
						onToggleMediaModal();
					}}
					children={<ComposeGalleryIcon {...{ colorScheme }} />}
				/>
				{/* <Pressable
					className={'mr-3'}
					children={<ComposeGifIcon {...{ colorScheme }} />}
				/> */}

				<View className="flex-1">
					<TextInput
						placeholder="Your message..."
						placeholderTextColor={'#fff'}
						multiline
						maxLength={4000}
						selectionColor={selectionColor}
						onChangeText={handleChangeText}
						autoCapitalize="none"
						autoCorrect={false}
						autoComplete="off"
						className="text-white leading-6 font-SourceSans3_Regular opacity-80"
						extraContainerStyle="w-auto"
					>
						<FormattedText text={composeState.text.raw} />
					</TextInput>
				</View>
				<Pressable
					disabled={!composeState.text.raw}
					onPress={sendMessage}
					className={cn(
						'rounded-full p-0 border ml-2',
						composeState.text.raw
							? ' border-white'
							: 'border-patchwork-grey-100 ',
					)}
				>
					<ThemeText
						className={cn(
							'py-[6] px-3 rounded-full',
							composeState.text.raw ? 'text-white' : 'text-patchwork-grey-100',
						)}
					>
						Send
					</ThemeText>
				</Pressable>
			</View>
			<ThemeModal
				hasNotch={false}
				{...{
					openThemeModal: mediaModal,
					onCloseThemeModal: () => onToggleMediaModal(),
				}}
				modalPositionStyle={{
					justifyContent: 'flex-end',
				}}
				containerStyle={{ borderRadius: 0 }}
			>
				<ManageAttachmentModal {...{ onToggleMediaModal }} />
			</ThemeModal>
		</View>
	);
};

export default InitialMessageActionsBar;
