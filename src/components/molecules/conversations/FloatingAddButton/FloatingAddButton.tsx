import { PlusIcon } from '@/util/svg/icon.conversations';
import { Pressable } from 'react-native';

export const FloatingAddButton = ({ onPress }: { onPress: () => void }) => (
	<Pressable
		onPress={onPress}
		className="bg-patchwork-red-50 rounded-full p-3 absolute bottom-5 right-5"
	>
		<PlusIcon />
	</Pressable>
);
