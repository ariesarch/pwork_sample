import { create } from 'zustand';

type LanguageSelectionState = {
	languageSelectionModalVisible: boolean;
	selectedLanguage: string;
	isTranslated: boolean;
	actions: {
		onToggleLanguageSelectionModal: () => void;
		setSelectedLanguage: (language: string) => void;
		onToggleTranslated: () => void;
	};
};

export const useLanguageSelectionStore = create<LanguageSelectionState>()(
	set => ({
		languageSelectionModalVisible: false,
		selectedLanguage: 'en',
		isTranslated: false,
		actions: {
			onToggleLanguageSelectionModal: () =>
				set(state => ({
					languageSelectionModalVisible: !state.languageSelectionModalVisible,
				})),
			setSelectedLanguage: selectedLanguage => set({ selectedLanguage }),
			onToggleTranslated: () =>
				set(prev => ({
					isTranslated: !prev.isTranslated,
				})),
		},
	}),
);

export const useLanguageSelectionActions = () =>
	useLanguageSelectionStore(state => state.actions);
