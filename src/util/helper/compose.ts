import { ComposeState } from '@/context/composeStatusContext/composeStatus.type';
import {
	ComposeMutationPayload,
	MediaOrPoll,
	RepostMutationPayload,
} from '@/types/queries/feed.type';
import { Match } from 'linkify-it';
import { differenceWith, isEqual } from 'lodash';
import { Asset } from 'react-native-image-picker';
import { mediaUploadAction } from './mediaUploadActions';

export const showLinkCardIfNotManuallyClose = (
	currentUrl: string,
	previousUrl: string,
	showLinkCard: boolean,
) => {
	return previousUrl == currentUrl ? showLinkCard : true;
};

export const findFirstLink = (matches: Match[]) => {
	const firstMatch = matches.find(
		item => item.schema === '' || item.schema === 'https:',
	);
	return firstMatch ? firstMatch.url : '';
};

export const findMentionChanges = (
	mentionList: Match[] | undefined,
	prevMentionList: Match[] | undefined,
) => {
	return differenceWith(mentionList, prevMentionList ?? [], isEqual);
};

export const getReplacedMentionText = (
	originalString: string,
	startIndex: number,
	fullDisplayName: string,
) => {
	const endIndex =
		originalString.indexOf(' ', startIndex) === -1
			? originalString.length
			: originalString.indexOf(' ', startIndex);

	return (
		originalString.slice(0, startIndex) +
		'@' +
		fullDisplayName +
		originalString.slice(endIndex)
	);
};

type CPPayloadCreatorType = (state: ComposeState) => ComposeMutationPayload;
export const prepareComposePayload: CPPayloadCreatorType = state => {
	const pollOrMedia: MediaOrPoll =
		state.media_ids.length > 0 ? { media_ids: state.media_ids } : { poll: [] };

	return {
		in_reply_to_id: state.in_reply_to_id,
		language: 'en',
		sensitive: false,
		spoiler_text: '',
		status: state.text.raw,
		visibility: state.visibility == 'local' ? 'public' : state.visibility,
		...pollOrMedia,
	};
};

type RPPayloadCreatorType = (
	state: ComposeState,
	id: string,
) => RepostMutationPayload;
export const prepareRepostPayload: RPPayloadCreatorType = (state, id) => {
	return { ...prepareComposePayload(state), id };
};

type ReplyPayloadCreatorType = (
	state: ComposeState,
	id: string,
) => ComposeMutationPayload;
export const prepareReplyPayload: ReplyPayloadCreatorType = (state, id) => {
	return { ...prepareComposePayload(state), in_reply_to_id: id };
};

export const calculateImageWidth = (selectedMedia: Asset[], index: number) => {
	if (selectedMedia.length == 1) return 'w-full h-[220]';
	if (selectedMedia.length > 1) {
		return index === 2 && selectedMedia.length == 3
			? 'w-full h-[140]'
			: 'w-1/2 h-[140]';
	}
};

export const prepareMediaUploadOption = (
	currentNoOfImage: number,
	mediaType: 'photo' | 'video' | 'mixed' = 'mixed',
) => {
	const maxNoOfImage = 4;
	return {
		...mediaUploadAction,
		options: {
			selectionLimit: maxNoOfImage - currentNoOfImage,
			mediaType: mediaType,
			includeExtra: false,
		},
	};
};
