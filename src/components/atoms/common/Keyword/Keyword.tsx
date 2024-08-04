import { TouchableOpacity, View } from 'react-native';
import { ThemeText } from '../ThemeText/ThemeText';

const Keyword = () => {
	return (
		<View className="flex-row m-3">
			<View className="flex-1">
				<ThemeText>Keyword</ThemeText>
				<ThemeText>21 posts</ThemeText>
			</View>
			<View className="flex-row items-center">
				<TouchableOpacity activeOpacity={0.8}>
					<ThemeText variant="textRedUnderline" className="mr-2">
						Edit
					</ThemeText>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.8}>
					<ThemeText variant="textRedUnderline">Remove</ThemeText>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Keyword;
