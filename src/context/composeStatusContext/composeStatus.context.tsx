import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { composeReducer, initialState } from './composeStatus.reducer';
import {
	ComposeContextType,
	ComposeStateProviderProps,
} from './composeStatus.type';
import { useNavigation } from '@react-navigation/native';
import { useCTAactions } from '@/store/compose/callToAction/callToActionStore';
import { useManageAttachmentActions } from '@/store/compose/manageAttachments/manageAttachmentStore';

const ComposeContext = createContext<ComposeContextType | undefined>(undefined);

export const ComposeStatusProvider: React.FC<ComposeStateProviderProps> = ({
	children,
	type,
}) => {
	const [composeState, composeDispatch] = useReducer(
		composeReducer,
		initialState,
	);
	const navigation = useNavigation();
	const { onChangeCTAText } = useCTAactions();
	const { resetAttachmentStore } = useManageAttachmentActions();
	const { onSelectMedia } = useManageAttachmentActions();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (type === 'create') {
				composeDispatch({ type: 'clear' });
				onChangeCTAText('');
				resetAttachmentStore();
			}
			// composeDispatch({ type: 'maxCount', payload: 500 });
		});

		return () => unsubscribe();
	}, [navigation, type]);

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
