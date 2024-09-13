import { RootStackParamList } from '@/types/navigation';
import { BackIcon } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';

type Props = {
	customOnPress?: () => void;
};
const BackButton = ({ customOnPress = undefined }: Props) => {
	const { colorScheme } = useColorScheme();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	return (
		<Pressable
			onPress={() => (customOnPress ? customOnPress() : navigation.goBack())}
			className="w-10 h-10 items-center justify-center rounded-full border-[1px] border-patchwork-grey-100"
		>
			<BackIcon colorScheme={colorScheme} />
		</Pressable>
	);
};

export default BackButton;
