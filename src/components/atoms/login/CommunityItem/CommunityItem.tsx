import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import styles from './CommunityItem.style';
import { Check } from '@/util/svg/icon.common';

type Props = {
	community: Pathchwork.Collection;
	// onPress?: (item: Pathchwork.Collection) => void;
};

const CommunityItem = ({ community }: Props) => {
	const [isSelected, setIsSelected] = useState(false);

	return (
		<Pressable
			onPress={() => {
				setIsSelected(prev => !prev);
			}}
			className={styles.commItemWrapper(isSelected)}
		>
			<View className="flex flex-row justify-center items-center">
				<ThemeText size="xs_12" className="text-white">
					{community.name}
				</ThemeText>
				{isSelected && <Check className="ml-2" />}
			</View>
		</Pressable>
	);
};

export default CommunityItem;
