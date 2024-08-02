import { Image, ImageProps, Pressable, View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { Button } from '@/components/atoms/common/Button/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

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
	const navigation = useNavigation();
	return (
		<View className="flex flex-row items-center " {...props}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					navigation.navigate('Profile');
				}}
				className="flex-row items-center"
			>
				{showAvatarIcon === true && (
					<Image
						source={status.account.avatar as ImageProps}
						className={`w-5 h-5 rounded-full bg-slate-300 mr-2 ${imageSize}`}
					/>
				)}
				<ThemeText className="font-bold">{status.account.username}</ThemeText>
			</TouchableOpacity>
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
