import CommunityItem from '@/components/atoms/login/CommunityItem/CommunityItem';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import {
	mockCommunityCollection,
	MockCommunityList,
} from '@/mock/login/communityList';
import { ScrollView, View } from 'react-native';

const InterestProgress = () => {
	return (
		<ScrollView showsVerticalScrollIndicator={false} className="mb-10">
			<ThemeText variant="textGrey" >
				Pick Things you'd like to see in your home feed.
			</ThemeText>
			<View className="mt-5">
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
			<View className="mb-10" />
		</ScrollView>
	);
};

export default InterestProgress;
