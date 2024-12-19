import { cn } from '@/util/helper/twutil';
import { MessageRequestsIcon } from '@/util/svg/icon.conversations';
import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import BackButton from '../../common/BackButton/BackButton';

type Props = {
	customOnPress?: () => void;
	extraClass?: string;
	isThereData?: boolean;
};
const NofiReqButton = ({
	customOnPress = undefined,
	extraClass,
	isThereData,
}: Props) => {
	const navigation = useNavigation();

	return (
		<Pressable
			onPress={() => (customOnPress ? customOnPress() : navigation.goBack())}
			className={cn(
				'w-10 h-10 items-center justify-center rounded-full border-[1px] border-patchwork-grey-100',
				extraClass,
			)}
		>
			{isThereData && (
				<View className="w-2 h-2 bg-patchwork-red-50 rounded-full absolute right-0 top-0" />
			)}
			<MessageRequestsIcon />
		</Pressable>
	);
};

export default NofiReqButton;
