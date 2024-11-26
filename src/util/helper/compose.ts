import { ComposeState } from '@/context/composeStatusContext/composeStatus.type';
import {
	ComposeMutationPayload,
	RepostMutationPayload,
} from '@/types/queries/feed.type';
import { Match } from 'linkify-it';
import { differenceWith, isEqual } from 'lodash';

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
	return {
		in_reply_to_id: undefined,
		language: 'en',
		sensitive: false,
		spoiler_text: '',
		status: state.text.raw,
		visibility: 'private',
		media_ids: [''],
	};
};

type RPPayloadCreatorType = (
	state: ComposeState,
	id: string,
) => RepostMutationPayload;
export const prepareRepostPayload: RPPayloadCreatorType = (state, id) => {
	return { ...prepareComposePayload(state), id };
};
