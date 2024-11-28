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
	maxCount: 500,
	poll: null,
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
		case 'poll':
			return { ...state, poll: action.payload };
		case 'clear': {
			return initialState;
		}
		default:
			throw new Error(`Unhandled action type:`);
	}
}
