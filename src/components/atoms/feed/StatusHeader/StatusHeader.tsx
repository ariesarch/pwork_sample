import { Image, ImageProps, Pressable, View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { Button } from '@/components/atoms/common/Button/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { timelineDateFormatter } from '@/util/helper/helper';

dayjs.extend(relativeTime);

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
		<View className="flex flex-row items-center mb-2" {...props}>
			<Pressable
				onPress={() => {
					navigation.navigate('ProfileOther', { id: status.account.id });
				}}
				className="flex-row items-center active:opacity-80"
			>
				{showAvatarIcon === true && (
					<Image
						source={{ uri: status.account.avatar }}
						className={`w-5 h-5 rounded-full bg-slate-300 mr-2 ${imageSize}`}
					/>
				)}
				<ThemeText className="font-bold">{status.account.username}</ThemeText>
			</Pressable>
			<ThemeText variant="textGrey" className="ml-2 mt-[2]" size="xs_12">
				{timelineDateFormatter(dayjs(status.created_at).fromNow())}
			</ThemeText>
			<View className="flex-1" />
			{showFollowIcon && (
				<Button variant="outline" className="rounded-full h-8 py-0 px-4">
					<ThemeText size="fs_13">Follow</ThemeText>
				</Button>
			)}
		</View>
	);
};

export default StatusHeader;
