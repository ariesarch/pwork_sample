import { ComponentSeparator } from '@/components/atoms';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { RootStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Image, ViewProps, ImageProps, Pressable } from 'react-native';

type Props = {
	status: Pathchwork.Status;
} & ViewProps;

const StatusItem = ({ status, ...props }: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	return (
		<View>
			<View className="flex flex-row mx-4 my-4" {...props}>
				{status.replyedStatus && (
					<View className="absolute border-l-2  border-slate-200 left-[15] top-[30] h-full" />
				)}
				<Pressable onPress={() => navigation.navigate('Profile')}>
					<Image
						source={status.account.avatar as ImageProps}
						className="w-[33] h-[33] rounded-full bg-slate-300"
					/>
				</Pressable>
				<View className="ml-2 flex-1" {...props}>
					<StatusHeader status={status} />
					<View>
						<ThemeText textBreakStrategy="balanced" className="flex-wrap">
							{status.content}
						</ThemeText>
					</View>
					{status.image && (
						<View className="mt-3 h-[200]">
							<Image
								source={status.image as ImageProps}
								className="rounded-md w-full h-[200]"
							/>
						</View>
					)}
					{status.reblogedStatus && (
						<View className="border-2 border-slate-200 my-2 p-3 rounded-xl ">
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
						</View>
					)}
					<StatusActionBar />
				</View>
			</View>
			{status.replyedStatus && (
				<View className="flex flex-row mx-4 my-4">
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
				</View>
			)}
			<ComponentSeparator />
		</View>
	);
};

export default StatusItem;
