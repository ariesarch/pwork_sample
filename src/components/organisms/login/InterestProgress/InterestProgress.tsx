import CommunityItem from '@/components/atoms/login/CommunityItem/CommunityItem';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import {
	mockCommunityCollection,
	MockCommunityList,
} from '@/mock/login/communityList';
import { ScrollView, View } from 'react-native';

const InterestProgress = () => {
	return (
		<View className="pb-28">
			<ThemeText variant="textGrey" className="my-2">
				Pick Things you'd like to see in your home feed.
			</ThemeText>
			<ScrollView showsVerticalScrollIndicator={false} className="mb-12">
				<View className="">
					{mockCommunityCollection.map((item, idx) => (
						<View key={idx} className="my-3">
							<ThemeText size="md_16" className="font-bold">
								{item}
							</ThemeText>
							<View className="flex flex-row flex-wrap mt-3">
								{MockCommunityList.map((communityItem, commIdx) => {
									return (
										<CommunityItem community={communityItem} key={commIdx} />
									);
								})}
							</View>
						</View>
					))}
				</View>
				{/* <View className="mb-20" /> */}
			</ScrollView>
		</View>
	);
};

export default InterestProgress;
