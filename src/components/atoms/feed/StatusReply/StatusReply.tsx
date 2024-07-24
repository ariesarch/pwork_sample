import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { Reply } from '@/util/svg/icon.common';
import { TouchableOpacity } from 'react-native';
import { ViewProps } from 'react-native';

const StatusReply = (props: ViewProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="flex flex-row items-center"
			{...props}
		>
			<Reply />
			<ThemeText variant="textGrey">2</ThemeText>
		</TouchableOpacity>
	);
};

export default StatusReply;
