import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { RePost } from '@/util/svg/icon.common';
import { TouchableOpacity, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

const StatusReblog = (props: ViewProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="flex flex-row items-center gap-1"
			{...props}
		>
			<RePost />
			<ThemeText variant="textGrey">2</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusReblog;
