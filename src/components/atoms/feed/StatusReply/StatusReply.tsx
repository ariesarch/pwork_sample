import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { Reply } from '@/util/svg/icon.common';
import { TouchableOpacity, ViewProps } from 'react-native';

type Props = {
	count: number;
} & ViewProps;

const StatusReply = ({ count, ...props }: Props) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="flex flex-row items-center gap-1"
			{...props}
		>
			<Reply />
			<ThemeText variant="textGrey">{count}</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusReply;
