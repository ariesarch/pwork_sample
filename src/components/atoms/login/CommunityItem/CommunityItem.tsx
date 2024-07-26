import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Check } from '@/util/svg/icon.common';
import styles from './CommunityItem.style';

type Props = {
	community: Pathchwork.Collection;
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
