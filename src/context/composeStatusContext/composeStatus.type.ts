import { Dispatch, ReactNode } from 'react';
import { tags } from 'react-native-svg/lib/typescript/xml';
export type ComposeType = 'create' | 'repost' | 'reply' | 'edit';

export type ComposeState = {
	type: ComposeType;
	text: {
		count: number;
		raw: string;
	};
	tag?: {
		schema: '@' | '#' | ':' | string;
		index: number;
		lastIndex: number;
		raw: string;
	};
	maxCount: number;
};

export type ComposeAction =
	| { type: 'text'; payload: ComposeState['text'] }
	| { type: 'tag'; payload: ComposeState['tag'] }
	| { type: 'maxCount'; payload: number }
	| { type: 'link'; payload: ComposeState['link'] }
	| { type: 'currentMention'; payload: ComposeState['currentMention'] }
	| { type: 'replaceMentionText'; payload: ComposeState['text'] }
	| { type: 'clear' };

export type ComposeContextType = {
	composeState: ComposeState;
	composeDispatch: Dispatch<ComposeAction>;
};

export type ComposeStateProviderProps = {
	children: ReactNode;
	type: ComposeType;
};
