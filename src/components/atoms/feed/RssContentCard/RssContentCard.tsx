/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewProps,
	ViewStyle,
} from 'react-native';
import ThemeImage from '../../common/ThemeImage/ThemeImage';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import { cn } from '@/util/helper/twutil';

type Props = {
	meta: any;
	extraStyle?: string;
	isFeedDetail?: boolean;
};
const RssContentCard = ({ meta, extraStyle, isFeedDetail }: Props) => {
	const navigation =
		useNavigation<StackNavigationProp<RootStackParamList, 'WebViewer'>>();
	const regex = /(<([^>]+)>)/gi;
	const metaCardTitle = meta?.title?.replace(regex, '');

	const navigateToWebView = (url: string) => {
		navigation.navigate('WebViewer', { url });
	};

	return (
		<View
			className={cn(
				'border border-gray-800 rounded-lg overflow-hidden',
				extraStyle,
			)}
		>
			<Pressable
				onPress={() => navigateToWebView(meta?.url ?? '')}
				className="rounded-xl"
			>
				<ThemeImage
					url={meta?.image}
					imageStyle={{
						height: 180,
						width: '100%',
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
					}}
					blurHash={meta?.blurhash}
					isFeedDetail={isFeedDetail}
				/>

				<View className="p-3">
					<ThemeText size="fs_13">{metaCardTitle || meta?.title}</ThemeText>
					<ThemeText numberOfLines={1} className="mt-1 underline">
						{meta?.url?.split('/')?.slice(0, 3)?.join('/')}
					</ThemeText>
				</View>
			</Pressable>
		</View>
	);
};

export default RssContentCard;
