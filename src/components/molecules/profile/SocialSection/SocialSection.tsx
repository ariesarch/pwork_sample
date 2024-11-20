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

			const SocialIcons = {
				Twitter: <TwitterIcon />,
				Reddit: <RedditIcon />,
				Facebook: <FacebookIcon />,
				Instagram: <InstagramIcon />,
				Linkedin: <LinkedinIcon />,
				Youtube: <YoutubeIcon />,
				Tikok: <TiktokIcon />,
				Twitch: <TwitchIcon />,
				Patreon: <PatreonIcon />,
				Podcast: <PodcastIcon />,
				Forum: <ForumIcon />,
				Newsletter: <NewsletterIcon />,
				App: <AppIcon />,
				Blog: <PenIcon {...{ colorScheme }} />,
				Default: <GlobeIcon {...{ colorScheme }} />,
			};

			const getTitle = (name: string, value: string) => {
				if (name === 'Reddit') {
					return `u/${value.split('user/')[1]?.split('/')[0] || ''}`;
				}
				if (name === 'Email' || name === 'Website') {
					return value;
				}
				if (name === 'Blog') {
					return value.split('//')[1];
				}
				return value.split('.com/')[1];
			};

			const Icon = SocialIcons[name] || SocialIcons.Default;
			return (
				<Chip
					startIcon={Icon}
					title={getTitle(name, value)}
					onPress={() => Linking.openURL(value)}
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
						<TouchableOpacity
							className="rounded-full p-2.5 bg-slate-200 dark:bg-patchwork-grey-70 mr-1"
							onPress={onPressEditIcon}
						>
							<PenIcon colorScheme={colorScheme} />
						</TouchableOpacity>
					</>
				)}
				{fields?.map((field: Pathchwork.Field) => (
					<View className="mr-1" key={field.value}>
						{renderSocialIcons(field)}
					</View>
				))}
			</ScrollView>
		);
	};
	return (
		<View className="pt-2">
			<View className="flex-row items-center pl-4">
				<LinkIcon {...{ colorScheme }} />
				<ThemeText className="ml-1" size="fs_13">
					Links{' '}
					<ThemeText variant="textGrey" size="fs_13">
						({fields?.length})
					</ThemeText>
				</ThemeText>
			</View>
			<View className="flex-row pt-2 mt-1">{renderAccountSocialLink()}</View>
		</View>
	);
};

export default SocialSection;
