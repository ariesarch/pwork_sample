import React, { useState } from 'react';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { BackIcon, CloseIcon } from '@/util/svg/icon.common';
import { Dimensions, View } from 'react-native';
import Chip from '@/components/atoms/common/Chip/Chip';
import {
	TwitterIcon,
	FacebookIcon,
	InstagramIcon,
	LinkedinIcon,
	RedditIcon,
	YoutubeIcon,
	TiktokIcon,
	TwitchIcon,
	PatreonIcon,
	PenIcon,
	GlobeIcon,
	PodcastIcon,
	NewsletterIcon,
	ForumIcon,
	AppIcon,
	LinkIcon,
} from '@/util/svg/icon.profile';
import { useColorScheme } from 'nativewind';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { Button } from '@/components/atoms/common/Button/Button';

const { height } = Dimensions.get('window');

type Props = {
	openThemeModal: boolean;
	onClose: () => void;
	onPressAdd: (link: SocialMediaLink, username: string) => void;
};

export type SocialMediaLink = {
	icon: JSX.Element;
	title: string;
};

const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
	{ icon: <TwitterIcon />, title: 'Twitter' },
	{ icon: <FacebookIcon />, title: 'Facebook' },
	{ icon: <InstagramIcon />, title: 'Instagram' },
	{ icon: <LinkedinIcon />, title: 'Linkedin' },
	{ icon: <RedditIcon />, title: 'Reddit' },
	{ icon: <YoutubeIcon />, title: 'Youtube' },
	{ icon: <TiktokIcon />, title: 'TikTok' },
	{ icon: <TwitchIcon />, title: 'Twitch' },
	{ icon: <PatreonIcon />, title: 'Patreon' },
	{ icon: <PenIcon colorScheme="light" />, title: 'Blog' },
	{ icon: <GlobeIcon colorScheme="light" />, title: 'Website' },
	{ icon: <PodcastIcon />, title: 'Podcast' },
	{ icon: <NewsletterIcon />, title: 'Newsletter' },
	{ icon: <ForumIcon />, title: 'Forum' },
	{ icon: <AppIcon />, title: 'App' },
	{ icon: <LinkIcon colorScheme="light" />, title: 'Custom URL' },
];

const AddNewLink: React.FC<Props> = ({
	openThemeModal,
	onClose,
	onPressAdd,
}) => {
	const [selectedLink, setSelectedLink] = useState<SocialMediaLink | null>(
		null,
	);
	const [username, setUsername] = useState<string | null>(null);

	return (
		<ThemeModal
			containerStyle={{
				minHeight: height * 0.8,
				justifyContent: 'flex-start',
			}}
			openThemeModal={openThemeModal}
			hasNotch={false}
		>
			<>
				<View className="flex-row justify-between items-center">
					{selectedLink && (
						<BackIcon
							onPress={() => {
								setSelectedLink(null);
								setUsername(null);
							}}
							colorScheme={'dark'}
						/>
					)}
					<CloseIcon onPress={onClose} />
				</View>
				<ThemeText size="md_16" className="self-center">
					Add new link
				</ThemeText>
				{selectedLink ? (
					<View className="items-start">
						<Chip
							variant={'white'}
							className="bg-slate-50 m-1 w-auto mb-3"
							startIcon={selectedLink.icon}
							title={selectedLink.title}
							disabled
						/>
						<TextInput
							value={username || ''}
							onChangeText={setUsername}
							className="flex-1 text-patchwork-light-50"
							placeholder="@username"
							autoCapitalize={'none'}
						/>
						<Button
							onPress={() => {
								if (username) onPressAdd(selectedLink, username);
							}}
							className=" mt-5 w-full"
							variant={'outline'}
							disabled={!username}
						>
							<ThemeText>Add</ThemeText>
						</Button>
					</View>
				) : (
					<View className="flex-row flex-wrap mt-3">
						{SOCIAL_MEDIA_LINKS.map((link, index) => (
							<Chip
								variant={'white'}
								key={index}
								className="bg-slate-50 m-1"
								startIcon={link.icon}
								title={link.title}
								onPress={() => setSelectedLink(link)}
							/>
						))}
					</View>
				)}
			</>
		</ThemeModal>
	);
};

export default AddNewLink;
