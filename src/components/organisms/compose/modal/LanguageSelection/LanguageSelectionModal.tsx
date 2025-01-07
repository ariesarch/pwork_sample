import ThemeModal from '@/components/atoms/common/Modal/Modal';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Underline from '@/components/atoms/common/Underline/Underline';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import {
	useLanguageSelectionActions,
	useLanguageSelectionStore,
} from '@/store/compose/languageSelection/languageSelection';
import { languages } from '@/util/constant/languages';
import { ComposeCircleCheckIcon } from '@/util/svg/icon.compose';
import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

interface LanguageSelectionModalProps {
	openThemeModal: boolean;
	onCloseThemeModal: () => void;
}
const LanguageSelectionModal = ({
	openThemeModal,
	onCloseThemeModal,
}: LanguageSelectionModalProps) => {
	const { composeState, composeDispatch } = useComposeStatus();

	const selectedLanguage = useLanguageSelectionStore(
		state => state.selectedLanguage,
	);
	const { setSelectedLanguage } = useLanguageSelectionActions();
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredData, setFilteredData] = useState(Object.entries(languages));

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		const lowerCaseQuery = query.toLowerCase();
		const filtered = Object.entries(languages).filter(
			([key, [language, native]]) =>
				language.toLowerCase().includes(lowerCaseQuery) ||
				native.toLowerCase().includes(lowerCaseQuery),
		);
		setFilteredData(filtered);
	};

	const onPressLanguageChange = (key: string) => {
		composeDispatch({ type: 'language', payload: key });
		setSelectedLanguage(key);
		onCloseThemeModal();
	};

	return (
		<ThemeModal isFlex openThemeModal={openThemeModal} hasNotch={false}>
			<View className="flex-1">
				<View className="items-center">
					<Pressable className="absolute left-0" onPress={onCloseThemeModal}>
						<ThemeText size={'lg_18'} variant={'textOrange'}>
							Cancel
						</ThemeText>
					</Pressable>
					<ThemeText size={'lg_18'}>Select Language</ThemeText>
				</View>
				<TextInput
					placeholder="Search"
					onChangeText={handleSearch}
					value={searchQuery}
					extraContainerStyle="mt-4"
				/>
				<FlashList
					showsVerticalScrollIndicator={false}
					data={filteredData}
					renderItem={({ item: [key, [language, native]] }) => (
						<Pressable
							onPress={() => onPressLanguageChange(key)}
							className="py-4 px-3 rounded"
						>
							<View className="flex-row items-center justify-between">
								<ThemeText size={'md_16'}>
									{native} ({language})
								</ThemeText>
								{key === selectedLanguage && <ComposeCircleCheckIcon />}
							</View>
						</Pressable>
					)}
					ItemSeparatorComponent={Underline}
					estimatedItemSize={300}
				/>
			</View>
		</ThemeModal>
	);
};

export default LanguageSelectionModal;
