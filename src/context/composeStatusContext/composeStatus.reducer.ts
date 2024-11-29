import { tags } from 'react-native-svg/lib/typescript/xml';
import { ComposeAction, ComposeState } from './composeStatus.type';

export const initialState: ComposeState = {
	type: 'create',
	text: {
		count: 0,
		raw: '',
	},
	link: {
		isLinkInclude: false,
		firstLinkUrl: '',
		showLinkCard: false,
	},
	media_ids: [],
	maxCount: 500,
	visibility: 'public',
	in_reply_to_id: undefined,
};

export function composeReducer(
	state: ComposeState,
	action: ComposeAction,
): ComposeState {
	switch (action.type) {
		case 'text':
			return { ...state, text: action.payload };
		case 'tag':
			return { ...state, tag: action.payload };
		case 'maxCount':
			return { ...state, maxCount: action.payload };
		case 'link':
			return { ...state, link: action.payload };
		case 'currentMention':
			return { ...state, currentMention: action.payload };
		case 'replaceMentionText':
			return { ...state, text: action.payload };
		case 'media_add':
			return { ...state, media_ids: [...state.media_ids, action.payload] };
		case 'media_remove':
			return {
				...state,
				media_ids: state.media_ids.filter(
					(_, index) => index !== action.payload,
				),
			};
		case 'visibility_change':
			return { ...state, visibility: action.payload };
		case 'reply_id_change':
			return { ...state, in_reply_to_id: action.payload };
		case 'clear': {
			return initialState;
		}
		default:
			throw new Error(`Unhandled action type:`);
	}
}
