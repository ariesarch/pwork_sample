import React, { useEffect } from 'react';
import { View } from 'react-native';
import PollForm from '../PollForm/PollForm';
import ComposeTextInput from '@/components/atoms/compose/ComposeTextInput/ComposeTextInput';
import { LinkCard } from '@/components/atoms/compose/LinkCard/LinkCard';
import ImageCard from '@/components/atoms/compose/ImageCard/ImageCard';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { useManageAttachmentActions } from '@/store/compose/manageAttachments/manageAttachmentStore';
import { POLL_DURATION_OPTIONS } from '@/util/constant/pollOption';

const findClosestDuration = (expiresIn: number) => {
	return POLL_DURATION_OPTIONS.reduce((prev, curr) =>
		Math.abs(curr.value - expiresIn) < Math.abs(prev.value - expiresIn)
			? curr
			: prev,
	);
};
const EditComposeStatus = ({ status }: { status: Pathchwork.Status }) => {
	const { composeState, composeDispatch } = useComposeStatus();
	const { onSelectMedia, resetAttachmentStore } = useManageAttachmentActions();

	useEffect(() => {
		if (status.text) {
			composeDispatch({
				type: 'text',
				payload: {
					count: status.text.length,
					raw: status.text,
				},
			});
		}

		if (status.text && status.text.length > 500) {
			composeDispatch({ type: 'maxCount', payload: 4000 });
		}

		if (status.poll) {
			const expiresIn = Math.floor(
				(new Date(status.poll.expires_at!).getTime() -
					new Date(status.created_at).getTime()) /
					1000,
			);
			const closestDuration = findClosestDuration(expiresIn);

			composeDispatch({
				type: 'poll',
				payload: {
					options: status.poll.options.map(option => option.title),
					expires_in: closestDuration.value,
					multiple: status.poll.multiple,
				},
			});
		}

		if (status.media_attachments.length > 0) {
			composeDispatch({
				type: 'media_add',
				payload: status.media_attachments.map(media => media.id),
			});
			onSelectMedia(status.media_attachments.map(media => media));
		}

		return () => {
			composeDispatch({ type: 'clear' });
			resetAttachmentStore();
		};
	}, [status]);

	return (
		<View className="px-4">
			<ComposeTextInput />

			<PollForm composeType="create" />

			<LinkCard composeType="edit" />
			<ImageCard composeType="edit" />
		</View>
	);
};

export default EditComposeStatus;
