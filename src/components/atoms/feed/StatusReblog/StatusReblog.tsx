import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { RePost } from '@/util/svg/icon.common';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = {
	count: number;
} & TouchableOpacityProps;

const StatusReblog = ({ count, ...props }: Props) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="flex flex-row items-center gap-1"
			{...props}
		>
			<RePost />
			<ThemeText variant="textGrey">{count}</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusReblog;
