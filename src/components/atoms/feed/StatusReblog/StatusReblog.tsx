import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { RePost } from '@/util/svg/icon.common';
import { TouchableOpacity } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

type Props = {
	count: number;
} & ViewProps;

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
