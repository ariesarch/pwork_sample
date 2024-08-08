
import React from 'react';
import { View, Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { VisibilitySettingsProps } from '@/mock/compose/visibilitySettings';
import {
	ComposeCircleCheckIcon,
	ComposeGlobeIcon,
	ComposeLockIcon,
	ComposeMentionIcon,
	ComposePinIcon,
	ComposeUnlockIcon,
} from '@/util/svg/icon.compose';

type VisibilitySettingsItemProps = {
	item: VisibilitySettingsProps;
  selectedOption: string;
	onPressVisibilitySettings: (val: VisibilitySettingsProps) => void;
};

const VisibilitySettingsItem = ({
	item,
  selectedOption,
	onPressVisibilitySettings,
}: VisibilitySettingsItemProps) => {
	const { colorScheme } = useColorScheme();
	return (
		<Pressable
			className="flex-row items-center py-3 px-4"
			onPress={() => onPressVisibilitySettings(item)}
		>
			<View>
				{item.icon === 'public' ? (
					<ComposeGlobeIcon {...{ colorScheme }} />
				) : item.icon === 'local' ? (
					<ComposePinIcon {...{ colorScheme }} />
				) : item.icon === 'unlisted' ? (
					<ComposeUnlockIcon {...{ colorScheme }} />
				) : item.icon === 'private' ? (
					<ComposeLockIcon {...{ colorScheme }} />
				) : (
					<ComposeMentionIcon {...{ colorScheme }} />
				)}
			</View>
			<ThemeText className="mx-3" size={'md_16'}>
				{item.label}
			</ThemeText>
			{selectedOption === item.label && (
				<View className="ml-auto">
					<ComposeCircleCheckIcon />
				</View>
			)}
		</Pressable>
	);
};

export default VisibilitySettingsItem;
