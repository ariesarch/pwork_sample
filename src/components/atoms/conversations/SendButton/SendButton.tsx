import { cn } from '@/util/helper/twutil';
import { SendIcon } from '@/util/svg/icon.conversations';
import { useColorScheme } from 'nativewind';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
	onPress?: () => void;
	extraClass?: string;
	disabled?: boolean;
};
const SendButton = ({ onPress, extraClass, disabled }: Props) => {
	const { colorScheme } = useColorScheme();

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			className={cn(
				'w-10 h-10 items-center justify-center rounded-full border-[1px] border-patchwork-grey-100',
				extraClass,
			)}
		>
			<SendIcon colorScheme={colorScheme} />
		</TouchableOpacity>
	);
};

export default SendButton;
