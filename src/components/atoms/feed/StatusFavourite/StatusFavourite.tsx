import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { HeartOutlineIcon } from '@/util/svg/icon.common';
import { useState } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';

type Props = {
	count: number;
} & ViewProps;

const StatusFavourtie = ({ count, ...props }: Props) => {
	const [isFavourite, setIsFavoruite] = useState(false);
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="flex flex-row items-center gap-1"
			{...props}
			onPress={() => setIsFavoruite(prev => !prev)}
		>
			<HeartOutlineIcon fill={isFavourite ? 'red' : 'none'} />
			<ThemeText variant="textGrey">{count}</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusFavourtie;
