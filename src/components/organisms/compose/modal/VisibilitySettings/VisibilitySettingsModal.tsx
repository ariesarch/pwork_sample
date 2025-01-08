import React from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Underline from '@/components/atoms/common/Underline/Underline';
import VisibilitySettingsItem from '@/components/molecules/compose/VisibilitySettingsItem/VisibilitySettingsItem';
import {
	VisibilitySettingsProps,
	visibilitySettingsData,
} from '@/mock/compose/visibilitySettings';
import {
	useVisibilitySettingsActions,
	useVisibilitySettingsStore,
} from '@/store/compose/visibilitySettings/visibilitySettingsStore';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';

interface VisibilitySettingsModalProps {
	visible: boolean;
	onClose: () => void;
}
const VisibilitySettingsModal = ({
	visible,
	onClose,
}: VisibilitySettingsModalProps) => {
	const visibility = useVisibilitySettingsStore(state => state.visibility);
	const { setVisibility } = useVisibilitySettingsActions();
	const { composeState, composeDispatch } = useComposeStatus();

	const onPressVisibilitySettings = (item: VisibilitySettingsProps) => {
		setVisibility(item.label);
		composeDispatch({ type: 'visibility_change', payload: item.icon });
		onClose();
	};

	const renderItem: ListRenderItem<VisibilitySettingsProps> = ({ item }) => (
		<VisibilitySettingsItem
			item={item}
			selectedOption={visibility}
			onPressVisibilitySettings={(val: VisibilitySettingsProps) => {
				onPressVisibilitySettings(val);
			}}
		/>
	);

	return (
		<ThemeModal
			hasNotch={false}
			parentPaddingEnabled={false}
			containerStyle={{
				marginHorizontal: 16,
				marginBottom: 20,
			}}
			{...{
				openThemeModal: visible,
				onCloseThemeModal: onClose,
			}}
		>
			<View>
				<ThemeText size={'md_16'} className="font-SourceSans3_Bold px-4">
					Who can see your post:
				</ThemeText>
				<FlatList
					data={visibilitySettingsData}
					renderItem={renderItem}
					keyExtractor={item => item.label}
					ItemSeparatorComponent={Underline}
				/>
			</View>
		</ThemeModal>
	);
};

export default VisibilitySettingsModal;
