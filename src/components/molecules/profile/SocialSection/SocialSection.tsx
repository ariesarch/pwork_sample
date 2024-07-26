import React from 'react';
import { Pressable, ScrollView, View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import Chip from '@/components/atoms/common/Chip/Chip';
import {
	PenIcon,
	GlobeIcon,
	LinkIcon,
	RedditIcon,
	TwitterIcon,
} from '@/util/svg/icon.profile';
import { useColorScheme } from 'nativewind';
import { socialLinks } from '@/mock/profile/socialLinks';
import { scale } from '@/util/helper/helper';

type SocialSectionProps = {
	posts: string | number;
	following: string | number;
	followers: string | number;
};

const SocialSection = ({
	posts,
	following,
	followers,
	...props
}: SocialSectionProps & ViewProps) => {
	const { colorScheme, toggleColorScheme } = useColorScheme();

	const renderAccountSocialLink = () => {
		const renderSocialIcons = ({
			value,
			title,
		}: {
			value: string;
			title: string;
		}) => {
			switch (value) {
				case 'twitter':
					return <Chip startIcon={<TwitterIcon />} title={title} />;
				case 'reddit':
					return <Chip startIcon={<RedditIcon />} title={title} />;
				case 'blog':
					return (
						<Chip startIcon={<PenIcon {...{ colorScheme }} />} title={title} />
					);
				default:
					return (
						<Chip
							startIcon={<GlobeIcon {...{ colorScheme }} />}
							title={title}
						/>
					);
			}
		};

		return (
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: scale(24) }}
			>
				{socialLinks.map(field => (
					<View className="mr-1" key={field?.id}>
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
				<ThemeText className="ml-1" size={'fs_13'}>
					Links{' '}
					<ThemeText variant={'textGrey'} size={'fs_13'}>
						{'(5)'}
					</ThemeText>
				</ThemeText>
				<Pressable onPress={() => toggleColorScheme()}>
					<ThemeText> Change Theme</ThemeText>
				</Pressable>
			</View>
			<View className="flex-row pt-2" {...props}>
				{renderAccountSocialLink()}
			</View>
		</View>
	);
};

export default SocialSection;
