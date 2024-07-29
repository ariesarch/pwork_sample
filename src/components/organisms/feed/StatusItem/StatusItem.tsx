import Underline from '@/components/atoms/common/Underline/Underline';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { HomeStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Image, ViewProps, ImageProps, Pressable } from 'react-native';

type Props = {
	status: Pathchwork.Status;
} & ViewProps;

const StatusItem = ({ status, ...props }: Props) => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	return (
		<View>
			<View className="flex flex-row m-4" {...props}>
				{status.replyedStatus && (
					<View className="absolute border-l  border-slate-200 dark:border-patchwork-grey-70 left-[15] top-[30] h-full" />
				)}
				<Pressable onPress={() => navigation.navigate('Profile')}>
					<Image
						source={status.account.avatar as ImageProps}
						className="w-[33] h-[33] rounded-full bg-slate-300"
					/>
				</Pressable>
				<Pressable
					className="ml-2 flex-1"
					{...props}
					onPress={() => {
						navigation.navigate('FeedDetail', { statusId: status.id });
					}}
				>
					<StatusHeader status={status} />
					<StatusContent status={status} />
					{status.reblogedStatus && (
						<Pressable
							className="border border-slate-200 dark:border-patchwork-grey-70 my-2 p-3 rounded-xl"
							onPress={() => {
								navigation.navigate('FeedDetail', {
									statusId: status.reblogedStatus?.id,
								});
							}}
						>
							<StatusHeader status={status.reblogedStatus} showAvatarIcon />
							<View>
								<ThemeText textBreakStrategy="balanced" className="flex-wrap">
									{status.reblogedStatus.content}
								</ThemeText>
							</View>
							{status.reblogedStatus.image && (
								<View className="mt-3 h-[200]">
									<Image
										source={status.reblogedStatus.image as ImageProps}
										className="rounded-md w-full h-[200]"
									/>
								</View>
							)}
						</Pressable>
					)}
					<StatusActionBar />
				</Pressable>
			</View>
			{status.replyedStatus && (
				<Pressable
					className="flex flex-row mx-4 my-4"
					onPress={() => {
						navigation.navigate('FeedDetail', {
							statusId: status.replyedStatus?.id,
						});
					}}
				>
					<Image
						source={status.replyedStatus.account.avatar as ImageProps}
						className="w-[33] h-[33] rounded-full bg-slate-300"
					/>
					<View className="ml-2 flex-1" {...props}>
						<StatusHeader status={status.replyedStatus} />
						<View>
							<ThemeText textBreakStrategy="balanced" className="flex-wrap">
								{status.replyedStatus.content}
							</ThemeText>
						</View>
						{status.replyedStatus.image && (
							<View className="mt-3 h-[200]">
								<Image
									source={status.image as ImageProps}
									className="rounded-md w-full h-[200]"
								/>
							</View>
						)}
						<StatusActionBar />
					</View>
				</Pressable>
			)}
			<Underline />
		</View>
	);
};

export default StatusItem;
