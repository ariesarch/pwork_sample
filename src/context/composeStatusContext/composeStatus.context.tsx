import React, { createContext, useContext, useReducer } from 'react';
import { composeReducer, initialState } from './composeStatus.reducer';
import {
	ComposeContextType,
	ComposeStateProviderProps,
} from './composeStatus.type';

const ComposeContext = createContext<ComposeContextType | undefined>(undefined);

export const ComposeStatusProvider: React.FC<ComposeStateProviderProps> = ({
	children,
}) => {
	const [composeState, composeDispatch] = useReducer(
		composeReducer,
		initialState,
	);

	return (
		<ComposeContext.Provider value={{ composeState, composeDispatch }}>
			{children}
		</ComposeContext.Provider>
	);
};

export const useComposeStatus = () => {
	const context = useContext(ComposeContext);
	if (!context) {
		throw new Error('useComposeStatus must be used within a Compose Provider');
	}
	return context;
};
