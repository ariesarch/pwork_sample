/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import ThemeImage from '../../common/ThemeImage/ThemeImage';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

type Props = {
	meta: any;
	overrideStyle?: StyleProp<ViewStyle>;
};
const RssContentCard = ({ meta, overrideStyle }: Props) => {
	const navigation =
		useNavigation<StackNavigationProp<RootStackParamList, 'WebViewer'>>();
	const regex = /(<([^>]+)>)/gi;
	const metaCardTitle = meta?.title?.replace(regex, '');

	const navigateToWebView = (url: string) => {
		navigation.navigate('WebViewer', { url });
	};

	return (
		<View style={[styles.metaRoot, overrideStyle]}>
			<Pressable onPress={() => navigateToWebView(meta?.url ?? '')}>
				<ThemeImage
					url={meta?.image}
					imageStyle={styles.metaImage}
					blurHash={meta?.blurhash}
				/>

				<View style={styles.metaContent}>
					<ThemeText size="fs_13">{metaCardTitle || meta?.title}</ThemeText>
					<ThemeText numberOfLines={1} className="mt-1 underline">
						{meta?.url?.split('/')?.slice(0, 3)?.join('/')}
					</ThemeText>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	metaRoot: {
		borderWidth: 1,
		borderColor: '#222',
		borderRadius: 5,
	},
	metaContent: {
		padding: 12,
	},
	metaImage: {
		width: '100%',
		height: 180,
		borderTopRightRadius: 2,
		borderTopLeftRadius: 2,
	},
});

export default RssContentCard;
