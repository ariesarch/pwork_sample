import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import Underline from '@/components/atoms/common/Underline/Underline';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { HomeStackScreenProps } from '@/types/navigation';
import { View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	useFeedDetailQuery,
	useFeedRepliesQuery,
} from '@/hooks/queries/feed.queries';
import { useSelectedDomain } from '@/store/feed/activeDomain';

const FeedDetail = ({
	navigation,
	route,
}: HomeStackScreenProps<'FeedDetail'>) => {
	const domain_name = useSelectedDomain();
	const { id } = route.params;
	const { data: feedDetail } = useFeedDetailQuery({
		domain_name,
		id,
	});

	const { data: statusReplies } = useFeedRepliesQuery({
		domain_name,
		id,
	});

	// const renderFooter = () => (
	// 	<View className="mx-3">
	// 		<TextInput placeholder="Reply To Account Name" />
	// 	</View>
	// );

	return (
		<SafeScreen>
			<View className="flex-1">
				{statusReplies ? (
					<KeyboardAwareScrollView className=" bg-patchwork-light-900 dark:bg-patchwork-dark-100 flex-1">
						<Header title="Post" leftCustomComponent={<BackButton />} />
						{feedDetail ? (
							<View>
								<View className="mx-4">
									<StatusHeader
										status={feedDetail as Pathchwork.Status}
										imageSize="w-8 h-8"
										showAvatarIcon
										showFollowIcon
									/>
									<StatusContent
										status={feedDetail as Pathchwork.Status}
										className="mt-2"
									/>
									<StatusActionBar status={feedDetail as Pathchwork.Status} />
								</View>
							</View>
						) : (
							<></>
						)}
						<View className="flex-1">
							<Underline className="mt-3" />
							<ThemeText className="font-semibold ml-4 my-2">Replies</ThemeText>
							<Underline />
						</View>
					</KeyboardAwareScrollView>
				) : (
					<></>
				)}
				<View className="mx-6 my-3">
					<TextInput placeholder="Reply To Account Name" />
				</View>
			</View>
		</SafeScreen>
	);
};

export default FeedDetail;
