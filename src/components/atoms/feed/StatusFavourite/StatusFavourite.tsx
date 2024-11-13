import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import customColor from '@/util/constant/color';
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
			<HeartOutlineIcon
				stroke={
					isFavourite
						? customColor['patchwork-red-50']
						: customColor['patchwork-grey-100']
				}
				fill={isFavourite ? customColor['patchwork-red-50'] : 'none'}
			/>
			<ThemeText variant="textGrey">{count}</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusFavourtie;
