import { Linking, ScrollView, View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Chip from '@/components/atoms/common/Chip/Chip';
import {
	PenIcon,
	GlobeIcon,
	LinkIcon,
	RedditIcon,
	TwitterIcon,
	FacebookIcon,
	InstagramIcon,
	LinkedinIcon,
	YoutubeIcon,
	TiktokIcon,
	TwitchIcon,
	PatreonIcon,
	PodcastIcon,
	NewsletterIcon,
	ForumIcon,
	AppIcon,
	PlusIcon,
} from '@/util/svg/icon.profile';
import { useColorScheme } from 'nativewind';
import { scale } from '@/util/helper/helper';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
			const SocialIcons = {
				Twitter: <TwitterIcon />,
				Reddit: <RedditIcon />,
				Facebook: <FacebookIcon />,
				Instagram: <InstagramIcon />,
				Linkedin: <LinkedinIcon />,
				Youtube: <YoutubeIcon />,
				TikTok: <TiktokIcon />,
				Twitch: <TwitchIcon />,
				Patreon: <PatreonIcon />,
				// Podcast: <PodcastIcon />,
				// Forum: <ForumIcon />,
				// Newsletter: <NewsletterIcon />,
				// App: <AppIcon />,
				// Blog: <PenIcon {...{ colorScheme }} />,
				// Default: <GlobeIcon {...{ colorScheme }} />,
			};

			const Icon = SocialIcons[name];

			let hrefValue = `https://www.${name.toLocaleLowerCase()}.com/${value}`;
			if (name === 'Reddit') {
				hrefValue = `https://www.${name.toLocaleLowerCase()}.com/u/${value}`;
			}
			if (name === 'Linkedin') {
				hrefValue = `https://www.${name.toLocaleLowerCase()}.com/in/${value}`;
			}

			if (name === 'Youtube' || name === 'TikTok') {
				hrefValue = `https://www.${name.toLocaleLowerCase()}.com/@${value}`;
			}
			if (name === 'Twitch') {
				hrefValue = `https://www.${name.toLocaleLowerCase()}.tv/${value}`;
			}

			return (
				<Chip
					className="mx-1"
					startIcon={Icon}
					title={value}
					onPress={() => Linking.openURL(hrefValue)}
				/>
			);
		};

		return (
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: scale(24) }}
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
			<View className="flex-row pt-2 mt-1">{renderAccountSocialLink()}</View>
		</View>
	);
};

export default SocialSection;
