import React, { useState } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Underline from '@/components/atoms/common/Underline/Underline';
import VisibilitySettingsItem from '@/components/molecules/compose/VisibilitySettingsItem/VisibilitySettingsItem';
import {
	VisibilitySettingsProps,
	visibilitySettingsData,
} from '@/mock/compose/visibilitySettings';

const VisibilitySettings = ({ onClose }: { onClose: () => void }) => {
	const [selectedOption, setSelectedOption] = useState<string>('Local only');

	const onPressVisibilitySettings = (item: VisibilitySettingsProps) => {
		setSelectedOption(item.label);
		onClose();
	};
	const renderItem: ListRenderItem<VisibilitySettingsProps> = ({ item }) => (
		<VisibilitySettingsItem
			item={item}
			selectedOption={selectedOption}
			onPressVisibilitySettings={(val: VisibilitySettingsProps) => {
				onPressVisibilitySettings(val);
			}}
		/>
	);

	return (
		<View>
			<ThemeText size={'md_16'} className="font-bold px-4">
				Who can see your post:
			</ThemeText>
			<FlatList
				data={visibilitySettingsData}
				renderItem={renderItem}
				keyExtractor={item => item.label}
				ItemSeparatorComponent={Underline}
			/>
		</View>
	);
};

export default VisibilitySettings;
