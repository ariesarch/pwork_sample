import { queryClient } from '@/App';
import { Button } from '@/components/atoms/common/Button/Button';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useComposeMutation } from '@/hooks/mutations/feed.mutation';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import {
	prepareComposePayload,
	prepareReplyPayload,
} from '@/util/helper/compose';
import {
	ComposeGalleryIcon,
	ComposeGifIcon,
	ComposeLocationIcon,
	ComposePollIcon,
} from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import Toast from 'react-native-toast-message';

type Props = {
	currentStatus: Pathchwork.Status;
};

const ReplyActionBar = ({ currentStatus }: Props) => {
	const { colorScheme } = useColorScheme();
	const domain_name = useSelectedDomain();
	const { composeState, composeDispatch } = useComposeStatus();

	useEffect(() => {
		if (composeState.in_reply_to_id === undefined) {
			composeDispatch({ type: 'reply_id_change', payload: currentStatus.id });
		}
	}, [composeState]);

	const { mutate, isPending } = useComposeMutation({
		onSuccess: (response: Pathchwork.Status) => {
			const queryKey = [
				'feed-replies',
				{ id: composeState.in_reply_to_id, domain_name },
			];
			queryClient.invalidateQueries({ queryKey });
			// queryClient.setQueryData(queryKey, (prev: Pathchwork.TimelineReplies) => {
			// 	return {
			// 		...prev.ancestors,
			// 		descendants: [...prev.descendants, response],
			// 	};
			// });
			composeDispatch({ type: 'clear' });
		},
		onError: e => {
			Toast.show({
				type: 'errorToast',
				text1: 'Currently, reply is only available for main channel.',
				position: 'top',
				topOffset: 50,
			});
		},
	});

	const handlePublish = () => {
		if (
			composeState.text.count < composeState.maxCount ||
			composeState.in_reply_to_id !== undefined
		) {
			const payload = prepareComposePayload(composeState);
			mutate(payload);
		}
	};

	return (
		<View className="flex-row items-center pt-2">
			<View className="flex-row flex-1">
				<Pressable
					disabled={true}
					className={'mr-3'}
					children={
						<ComposeGalleryIcon {...{ colorScheme }} stroke={'#6D7276'} />
					}
				/>
				<Pressable
					disabled
					className={'mr-3'}
					children={<ComposeGifIcon {...{ colorScheme }} stroke={'#6D7276'} />}
				/>
				<Pressable
					className={'mr-3'}
					children={
						<ComposeLocationIcon {...{ colorScheme }} stroke={'#6D7276'} />
					}
				/>
				<Pressable
					disabled={true}
					className={'mr-3'}
					children={<ComposePollIcon {...{ colorScheme }} stroke={'#6D7276'} />}
				/>
			</View>
			<Button
				variant="outline"
				disabled={composeState.text.count == 0 || isPending}
				onPress={handlePublish}
				className="rounded-2xl h-7"
				size="sm"
			>
				{isPending ? (
					<Flow size={20} color={'#fff'} className="my-2" />
				) : (
					<ThemeText className="m-0" size="xs_12">
						Publish
					</ThemeText>
				)}
			</Button>
		</View>
	);
};

export default ReplyActionBar;
