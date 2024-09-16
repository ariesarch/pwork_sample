import { TouchableOpacity, View } from 'react-native';
import { ThemeText } from '../ThemeText/ThemeText';
import { ChevronRightIcon } from '@/util/svg/icon.common';
import Underline from '../Underline/Underline';

const HashtagLists = () => {
	return (
		<View>
			<View className="flex-row mb-2">
				<View className="flex-1">
					<ThemeText className="font-bold" size="md_16">
						#BreakingNews
					</ThemeText>
					<ThemeText>1,278 posts</ThemeText>
				</View>
				<View className="flex-row items-center right-5">
					<TouchableOpacity activeOpacity={0.8}>
						<ChevronRightIcon />
					</TouchableOpacity>
				</View>
			</View>
			<Underline className="mt-1 mr-5 mb-1" />
			<View className="flex-row mb-2">
				<View className="flex-1">
					<ThemeText className="font-bold" size="md_16">
					#IsraelGaza
					</ThemeText>
					<ThemeText>1,278 posts</ThemeText>
				</View>
				<View className="flex-row items-center right-5">
					<TouchableOpacity activeOpacity={0.8}>
						<ChevronRightIcon />
					</TouchableOpacity>
				</View>
			</View>
			<Underline className="mt-1 mr-5 mb-1" />
			<View className="flex-row mb-2">
				<View className="flex-1">
					<ThemeText className="font-bold" size="md_16">
					#GeneralElection
					</ThemeText>
					<ThemeText>1,278 posts</ThemeText>
				</View>
				<View className="flex-row items-center right-5">
					<TouchableOpacity activeOpacity={0.8}>
						<ChevronRightIcon />
					</TouchableOpacity>
				</View>
			</View>
			<Underline className="mt-1 mr-5 mb-1" />
			<View className="flex-row mb-2">
				<View className="flex-1">
					<ThemeText className="font-bold" size="md_16">
					#Ukraine
					</ThemeText>
					<ThemeText>423 posts</ThemeText>
				</View>
				<View className="flex-row items-center right-5">
					<TouchableOpacity activeOpacity={0.8}>
						<ChevronRightIcon />
					</TouchableOpacity>
				</View>
			</View>
			
		</View>
	);
};

export default HashtagLists;
