import React from 'react';
import { View, ScrollView ,ViewProps} from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import AccountAvatar from '@/components/molecules/feed/AccountAvatar/AccountAvatar';
import { useNavigation } from '@react-navigation/native';
import { mockUserList } from '@/mock/feed/statusList';

const SeggestedPeopleList = ({ ...props }: ViewProps)  => {
	const navigation = useNavigation();
	return (
		<View>
			<View className="ml-6 my-2">
				<View className="flex flex-row items-center">
					<ThemeText className="font-bold my-2 flex-1" size="lg_18">
						Suggested people
					</ThemeText>
				</View>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}  {...props}>
					{mockUserList.map((item, idx) => (
						<View key={idx}>
							<AccountAvatar
								account={item}
								size={40}  
								dotAlert={item.hasNoti}
								className="mr-3"
							/>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	);
};

export default SeggestedPeopleList;
