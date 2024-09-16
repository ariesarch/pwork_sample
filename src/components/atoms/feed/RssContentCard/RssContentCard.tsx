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

type Props = {
	meta: any;
	overrideStyle?: StyleProp<ViewStyle>;
};
const RssContentCard = ({ meta, overrideStyle }: Props) => {
	const renderMetaSEO = (previewData: any) => {
		const regex = /(<([^>]+)>)/gi;
		const metaCardTitle = previewData?.title?.replace(regex, '');

		return (
			<View style={[styles.metaRoot, overrideStyle]}>
				<Pressable onPress={() => {}}>
					<ThemeImage
						url={previewData?.image}
						imageStyle={styles.metaImage}
						blurHash={previewData?.blurhash}
					/>

					<View style={styles.metaContent}>
						<ThemeText size="fs_13">
							{metaCardTitle || previewData?.title}
						</ThemeText>
						<ThemeText numberOfLines={1} className="mt-1 underline">
							{previewData?.url?.split('/')?.slice(0, 3)?.join('/')}
						</ThemeText>
					</View>
				</Pressable>
			</View>
		);
	};

	return renderMetaSEO(meta);
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
