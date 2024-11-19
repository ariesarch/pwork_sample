import { tags } from 'react-native-svg/lib/typescript/xml';
import { ComposeAction, ComposeState } from './composeStatus.type';

export const initialState: ComposeState = {
	type: 'create',
	text: {
		count: 0,
		raw: '',
	},
	maxCount: 500,
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
		default:
			throw new Error(`Unhandled action type:`);
	}
}
