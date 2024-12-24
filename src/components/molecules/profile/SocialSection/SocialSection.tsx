import { Linking, ScrollView, View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Chip from '@/components/atoms/common/Chip/Chip';
import {
	PenIcon,
	LinkIcon,
	PlusIcon,
	GlobeIcon,
} from '@/util/svg/icon.profile';
import { useColorScheme } from 'nativewind';
import { scale } from '@/util/helper/helper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icons } from '@/util/constant/socialMediaLinks';
import { generateSocialLinkURL } from '@/util/helper/generateSocialLinkURL';
import { cleanText } from '@/util/helper/cleanText';

type SocialSectionProps = {
	fields: Pathchwork.Field[];
	isMyAccount?: boolean;
	onPressPlusIcon?: () => void;
	onPressEditIcon?: () => void;
};

const SocialSection = ({
	fields,
	isMyAccount,
	onPressEditIcon,
	onPressPlusIcon,
}: SocialSectionProps) => {
	const { colorScheme } = useColorScheme();

	const renderAccountSocialLink = () => {
		const renderSocialIcons = (field: Pathchwork.Field) => {
			const { name, value } = field;
			if (!value) return null;
			const Icon = Icons[name] || <GlobeIcon colorScheme={colorScheme} />;
			const hrefValue = generateSocialLinkURL(name, value);
			const link = value.includes('href') ? cleanText(value) : value;

			return (
				<Chip
					className="mx-1"
					startIcon={Icon}
					title={link}
					onPress={() => Linking.openURL(hrefValue)}
				/>
			);
		};

		return (
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: scale(24),
					paddingVertical: 15,
				}}
			>
				{isMyAccount && (
					<>
						<TouchableOpacity
							className="rounded-full p-2.5 bg-slate-200 dark:bg-patchwork-grey-70 mr-1"
							onPress={onPressPlusIcon}
						>
							<PlusIcon />
						</TouchableOpacity>
						{fields?.find(v => v.value) && (
							<TouchableOpacity
								className="rounded-full p-2.5 bg-slate-200 dark:bg-patchwork-grey-70 mr-1"
								onPress={onPressEditIcon}
							>
								<PenIcon colorScheme={colorScheme} />
							</TouchableOpacity>
						)}
					</>
				)}
				{fields?.map((field, i) => (
					<View key={field.name}>{renderSocialIcons(field)}</View>
				))}
			</ScrollView>
		);
	};
	return (
		<View className="pt-2">
			<View className="flex-row items-center pl-4">
				<LinkIcon colorScheme={colorScheme} />
				<ThemeText className="ml-1" size="fs_13">
					Links{' '}
					<ThemeText variant="textGrey" size="fs_13">
						({fields?.filter(v => v.value)?.length})
					</ThemeText>
				</ThemeText>
			</View>
			<View>{renderAccountSocialLink()}</View>
		</View>
	);
};

export default SocialSection;
