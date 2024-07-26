import { Image, ImageProps, View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { Button } from '@/components/ui/Button/Button';

type Props = {
	status: Pathchwork.Status;
	showAvatarIcon?: boolean;
	showFollowIcon?: boolean;
	imageSize?: string;
} & ViewProps;

const StatusHeader = ({
	status,
	showAvatarIcon = false,
	showFollowIcon = false,
	imageSize = '',
	...props
}: Props) => {
	return (
		<View className="flex flex-row items-center " {...props}>
			{showAvatarIcon === true && (
				<Image
					source={status.account.avatar as ImageProps}
					className={`w-5 h-5 rounded-full bg-slate-300 mr-2 ${imageSize}`}
				/>
			)}
			<ThemeText className="font-bold">{status.account.username}</ThemeText>
			<ThemeText variant="textGrey" className="ml-2 mt-[2]" size="xs_12">
				{status.created_at}
			</ThemeText>
			<View className="flex-1" />
			{showFollowIcon && (
				<Button variant="outline" className="rounded-full">
					<ThemeText>Follow</ThemeText>
				</Button>
			)}
		</View>
	);
};

export default StatusHeader;
