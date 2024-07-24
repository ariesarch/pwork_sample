import { Image, ImageProps, View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';

type Props = {
	status: Pathchwork.Status;
	showAvatarIcon?: boolean;
} & ViewProps;

const StatusHeader = ({ status, showAvatarIcon = false, ...props }: Props) => {
	return (
		<View className="flex flex-row items-center " {...props}>
			{showAvatarIcon === true && (
				<Image
					source={status.account.avatar as ImageProps}
					className="w-[18] h-[18] rounded-full bg-slate-300 mr-2"
				/>
			)}
			<ThemeText className="font-bold">{status.account.username}</ThemeText>
			<ThemeText variant="textGrey" className="ml-2 mt-[2]" size="xs_12">
				{status.created_at}
			</ThemeText>
		</View>
	);
};

export default StatusHeader;
