import { RootStackParamList } from '@/types/navigation';
import { cn } from '@/util/helper/twutil';
import { BackIcon } from '@/util/svg/icon.common';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';

type Props = {
	customOnPress?: () => void;
	extraClass?: string;
};
const BackButton = ({ customOnPress = undefined, extraClass }: Props) => {
	const { colorScheme } = useColorScheme();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	return (
		<Pressable
			onPress={() => (customOnPress ? customOnPress() : navigation.goBack())}
			className={cn(
				'w-10 h-10 items-center justify-center rounded-full border-[1px] border-patchwork-grey-100',
				extraClass,
			)}
		>
			<BackIcon colorScheme={colorScheme} />
		</Pressable>
	);
};

export default BackButton;
