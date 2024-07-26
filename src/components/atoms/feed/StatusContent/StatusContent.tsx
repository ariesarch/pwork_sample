import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { View, ViewProps, ImageProps, Image } from 'react-native';

type Props = {
	status: Pathchwork.Status;
} & ViewProps;

const StatusContent = ({ status, ...props }: Props) => {
	return (
		<View>
			<ThemeText textBreakStrategy="balanced" className="flex-wrap" {...props}>
				{status.content}
			</ThemeText>
			{status.image && (
				<View className="mt-3 h-[200]">
					<Image
						source={status.image as ImageProps}
						className="rounded-md w-full h-[200]"
					/>
				</View>
			)}
		</View>
	);
};

export default StatusContent;
