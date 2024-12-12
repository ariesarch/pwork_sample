import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import customColor from '@/util/constant/color';
import { ReblogIcon } from '@/util/svg/icon.common';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = {
	count: number;
	alreadyReblogged: boolean | undefined;
} & TouchableOpacityProps;

const StatusReblogButton = ({ count, alreadyReblogged, ...props }: Props) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="flex flex-row items-center gap-1"
			{...props}
		>
			<ReblogIcon
				stroke={
					alreadyReblogged
						? customColor['patchwork-red-50']
						: customColor['patchwork-grey-100']
				}
			/>
			<ThemeText variant="textGrey">{count}</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusReblogButton;
