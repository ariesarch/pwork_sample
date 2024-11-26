import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { composeReducer, initialState } from './composeStatus.reducer';
import {
	ComposeContextType,
	ComposeStateProviderProps,
} from './composeStatus.type';
import { useNavigation } from '@react-navigation/native';

const ComposeContext = createContext<ComposeContextType | undefined>(undefined);

export const ComposeStatusProvider: React.FC<ComposeStateProviderProps> = ({
	children,
}) => {
	const [composeState, composeDispatch] = useReducer(
		composeReducer,
		initialState,
	);
	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			composeDispatch({ type: 'clear' });
		});

		return () => unsubscribe();
	}, [navigation]);

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
