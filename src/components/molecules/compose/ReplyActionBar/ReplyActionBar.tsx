import { Button } from '@/components/atoms/common/Button/Button';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import {
	ComposeGalleryIcon,
	ComposeGifIcon,
	ComposeLocationIcon,
	ComposePollIcon,
} from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';
import { Pressable, View } from 'react-native';

const ReplyActionBar = () => {
	const { colorScheme } = useColorScheme();

	return (
		<View className="flex-row mb-1 mt-2">
			<View className="flex-row flex-1">
				<Pressable
					className={'mr-3'}
					children={<ComposeGalleryIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<ComposeGifIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<ComposeLocationIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<ComposePollIcon {...{ colorScheme }} />}
				/>
			</View>
			<Button variant="outline" disabled className="rounded-2xl h-8" size="sm">
				<ThemeText className="m-0" size="xs_12">
					Publish
				</ThemeText>
			</Button>
		</View>
	);
};

export default ReplyActionBar;
