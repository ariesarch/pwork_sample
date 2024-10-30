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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	useFeedDetailQuery,
	useFeedRepliesQuery,
} from '@/hooks/queries/feed.queries';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { useMemo } from 'react';
import { useGetChannelFeed } from '@/hooks/queries/channel.queries';

const FeedDetail = ({
	navigation,
	route,
}: HomeStackScreenProps<'FeedDetail'>) => {
	const domain_name = useSelectedDomain();
	const { id, selectedFeedIndex } = route.params;
	const { data: fetchedFeedDetail } = useFeedDetailQuery({
		domain_name,
		id,
		options: {
			enabled: !selectedFeedIndex,
		},
	});
	const { data: statusReplies, isLoading: isLoadingReplies } =
		useFeedRepliesQuery({
			domain_name,
			id,
		});

	const { data: cachedTimeline } = useGetChannelFeed({
		domain_name,
		remote: false,
		only_media: false,
		options: {
			enabled: false,
		},
	});

	const cachedFeedDetail = useMemo(() => {
		if (selectedFeedIndex !== undefined && cachedTimeline) {
			const cachedFeeds = cachedTimeline.pages.flatMap(page => page.data);
			return cachedFeeds[selectedFeedIndex];
		}
	}, [selectedFeedIndex, cachedTimeline]);

	const feedDetail = useMemo(
		() => cachedFeedDetail ?? fetchedFeedDetail,
		[cachedFeedDetail, fetchedFeedDetail],
	);

	return (
		<SafeScreen>
			{feedDetail ? (
				<View className="flex-1">
					<KeyboardAwareScrollView className=" bg-patchwork-light-900 dark:bg-patchwork-dark-100 flex-1">
						<Header title="Post" leftCustomComponent={<BackButton />} />
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
						<View className="flex-1">
							<Underline className="mt-3" />
							<ThemeText className="font-semibold ml-4 my-2">Replies</ThemeText>
							<Underline />
							{
								isLoadingReplies && (
									<View className="flex items-center justify-center flex-1 mt-3">
										<Flow size={50} color={customColor['patchwork-red-50']} />
									</View>
								)
								// if(statusReplies && !isLoadingReplies) => return status replies
							}
						</View>
					</KeyboardAwareScrollView>
					<View className="mx-6 my-3">
						<TextInput placeholder="Reply To Account Name" />
					</View>
				</View>
			) : (
				<View className="flex items-center justify-center flex-1">
					<Flow size={50} color={customColor['patchwork-red-50']} />
				</View>
			)}
		</SafeScreen>
	);
};

export default FeedDetail;
