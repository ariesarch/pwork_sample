import React, { useEffect, useState } from 'react';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { CloseIcon, DeleteIcon } from '@/util/svg/icon.common';
import { Dimensions, Pressable, TouchableOpacity, View } from 'react-native';
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
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { Button } from '@/components/atoms/common/Button/Button';
import BackButton from '@/components/atoms/common/BackButton/BackButton';

const { height } = Dimensions.get('window');

type Props = {
	openThemeModal: boolean;
	onClose: () => void;
	onPressAdd: (linkTitle: string, username: string) => void;
	onPressDelete: (linkTitle: string) => void;
	data: Pathchwork.Field[];
	formType: 'add' | 'edit';
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
	// { icon: <PenIcon colorScheme="light" />, title: 'Blog' },
	// { icon: <GlobeIcon colorScheme="light" />, title: 'Website' },
	// { icon: <PodcastIcon />, title: 'Podcast' },
	// { icon: <NewsletterIcon />, title: 'Newsletter' },
	// { icon: <ForumIcon />, title: 'Forum' },
	// { icon: <AppIcon />, title: 'App' },
	// { icon: <LinkIcon colorScheme="light" />, title: 'Custom URL' },
];

const SocialLink: React.FC<Props> = ({
	openThemeModal,
	onClose,
	onPressAdd,
	formType = 'add',
	data,
	onPressDelete,
}) => {
	const [selectedLink, setSelectedLink] = useState<SocialMediaLink | null>(
		null,
	);
	const [username, setUsername] = useState<string | null>(null);
	const Icons: Record<string, JSX.Element> = {
		Twitter: <TwitterIcon />,
		Youtube: <YoutubeIcon />,
		Instagram: <InstagramIcon />,
		Linkedin: <LinkedinIcon />,
		Facebook: <FacebookIcon />,
		Reddit: <RedditIcon />,
		TikTok: <TiktokIcon />,
		Twitch: <TwitchIcon />,
		Patreon: <PatreonIcon />,
	};
	const LinksToEdit: SocialMediaLink[] = data?.map(item => ({
		icon: Icons[item.name],
		title: item.name,
	}));

	const links =
		formType === 'edit'
			? LinksToEdit
			: SOCIAL_MEDIA_LINKS.filter(
					link => !data?.some(item => item.name === link.title),
			  );

	useEffect(() => {
		if (formType === 'edit' && data && selectedLink) {
			const relatedData = data.find(item => item.name === selectedLink.title);
			if (relatedData) {
				setUsername(relatedData.value);
			}
		}
	}, [formType, data, selectedLink]);

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
						<BackButton
							extraClass="border-0"
							customOnPress={() => {
								setSelectedLink(null);
								setUsername(null);
								setSelectedLink(null);
							}}
						/>
					)}
					<Pressable
						className="h-10 w-10 items-center justify-center rounded-full"
						onPress={() => {
							setSelectedLink(null);
							setUsername(null);
							onClose();
						}}
					>
						<CloseIcon />
					</Pressable>
				</View>
				{links.length > 0 ? (
					<ThemeText size="md_16" className="self-center">
						{formType === 'edit' ? 'Edit Link' : 'Add new link'}
					</ThemeText>
				) : null}
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
							onChangeText={text => setUsername(text.replace(/\s/g, '_'))}
							className="flex-1 text-patchwork-light-50"
							placeholder="@username"
							autoCapitalize={'none'}
						/>
						<Button
							onPress={() => {
								if (username) {
									onPressAdd(selectedLink.title, username);
								}
							}}
							className=" mt-5 w-full"
							variant={'outline'}
							disabled={!username}
						>
							<ThemeText>{formType === 'edit' ? 'Edit' : 'Add'}</ThemeText>
						</Button>
					</View>
				) : (
					<View className="flex-row flex-wrap mt-3">
						{links.length > 0 ? (
							links.map((link, index) => (
								<View
									className={`flex-row ${formType === 'edit' ? 'mr-3' : ''}`}
								>
									<Chip
										variant={'white'}
										key={index}
										className="bg-slate-50 m-1"
										startIcon={link.icon}
										title={link.title}
										onPress={() => setSelectedLink(link)}
									/>
									{formType === 'edit' && (
										<TouchableOpacity
											onPress={() => onPressDelete(link.title)}
											className="absolute -right-2 -top-3 bg-slate-50 rounded-full justify-center items-center w-7 h-7"
											activeOpacity={0.7}
										>
											<DeleteIcon />
										</TouchableOpacity>
									)}
								</View>
							))
						) : (
							<ThemeText size={'lg_18'} className="mx-auto">
								All social links have been added!
							</ThemeText>
						)}
					</View>
				)}
			</>
		</ThemeModal>
	);
};

export default SocialLink;
