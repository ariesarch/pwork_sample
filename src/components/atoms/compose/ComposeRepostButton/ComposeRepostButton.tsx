import { cn } from '@/util/helper/twutil';
import { ComposeRepostSendIcon } from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';

type Props = {
	onPress: () => void;
	extraClass?: string;
};
const ComposeRepostButton = ({ onPress, extraClass }: Props) => {
	const { colorScheme } = useColorScheme();

	return (
		<Pressable
			onPress={onPress}
			className={cn(
				'w-10 h-10 items-center justify-center rounded-full border-[1px] border-patchwork-grey-100',
				extraClass,
			)}
		>
			<ComposeRepostSendIcon colorScheme={colorScheme} />
		</Pressable>
	);
};

export default ComposeRepostButton;
