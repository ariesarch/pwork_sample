import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { Heart } from '@/util/svg/icon.common';
import { useState } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';

const StatusFavourtie = (props: ViewProps) => {
	const [isFavourite, setIsFavoruite] = useState(false);
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="flex flex-row items-center gap-1"
			{...props}
			onPress={() => setIsFavoruite(prev => !prev)}
		>
			<Heart fill={isFavourite ? 'red' : 'none'} />
			<ThemeText variant="textGrey">2</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusFavourtie;
