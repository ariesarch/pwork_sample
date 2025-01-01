/* eslint-disable no-case-declarations */
/* eslint-disable default-case */

import { useMemo, useRef } from 'react';
import { parseDocument, ElementType } from 'htmlparser2';
import type { ChildNode } from 'domhandler';
import { Platform } from 'react-native';
import ParseEmojis from '../ParseEmojis/ParnseEmojis';
import { ThemeText } from '../ThemeText/ThemeText';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { useAuthStore } from '@/store/auth/authStore';

type Props = {
	status: Pathchwork.Status;
	isMainStatus?: boolean;
	handleSeeMorePress?: () => void;
	isFeedDetail?: boolean;
};

const MAX_CHAR_COUNT = 280;

const HTMLParser = ({
	status,
	isMainStatus,
	handleSeeMorePress,
	isFeedDetail,
}: Props) => {
	const isFirstLink = useRef(true);
	const domain_name = useSelectedDomain();
	const document = useMemo(
		() => parseDocument(status.content),
		[status.content],
	);
	const adaptedLineheight = Platform.OS === 'ios' ? 18 : undefined;
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const { userInfo } = useAuthStore();

	const handleHashTahPress = (tag: string) => {
		const specialTag = tag.replace(/#/g, '');
		navigation.navigate('HashTagDetail', {
			hashtag: specialTag?.toLowerCase(),
			hashtagDomain: domain_name,
		});
	};

	const handleMentionPress = (mention: Pathchwork.Mention) => {
		if (mention.id === userInfo?.id!) {
			navigation.navigate('Profile', { id: userInfo?.id! });
		} else {
			navigation.navigate('ProfileOther', { id: mention.id });
		}
	};

	// Get unwrapped text content for truncation
	const unwrappedContent = useMemo(
		() => document.children.map(unwrapNode).join(''),
		[document],
	);

	const isTruncated = unwrappedContent.length > MAX_CHAR_COUNT;

	// Render the parsed nodes with mentions and hashtags
	const renderContent = () =>
		document.children.map((node, index) => renderNode(node, index));

	const renderNode = (node: ChildNode, index: number) => {
		switch (node.type) {
			case ElementType.Text:
				return <ParseEmojis content={node.data.trim()} key={index} />;

			case ElementType.Tag:
				switch (node.name) {
					case 'a':
						const classes = node.attribs.class;
						const children = node.children.map(unwrapNode).join('');

						if (classes?.includes('hashtag')) {
							return (
								<ThemeText
									key={index}
									size="fs_13"
									className="font-SourceSans3_SemiBold"
									children={`${children} `}
									onPress={() => handleHashTahPress(children)}
								/>
							);
						}

						if (classes?.includes('mention') && status?.mentions?.length) {
							const mentionedText = children;
							const matchedMention = status.mentions.find(
								mention => `@${mention.username}` === mentionedText,
							);

							return (
								<ThemeText
									key={index}
									variant={matchedMention ? 'textOrange' : 'textGrey'}
									size={isMainStatus ? 'default' : 'fs_13'}
									children={`${mentionedText} `}
									onPress={() =>
										matchedMention && handleMentionPress(matchedMention)
									}
								/>
							);
						}
						return (
							<ThemeText
								key={index}
								variant="textOrange"
								size="fs_13"
								children={`${children} `}
							/>
						);

					case 'br':
						return (
							<ThemeText
								key={index}
								style={{
									lineHeight: adaptedLineheight
										? adaptedLineheight / 2
										: undefined,
								}}
							>
								{'\n'}
							</ThemeText>
						);

					default:
						return (
							<ThemeText
								key={index}
								children={node.children.map((c, i) => renderNode(c, i))}
							/>
						);
				}
		}
		return null;
	};

	return (
		<ThemeText>
			{!isFeedDetail && isTruncated
				? `${unwrappedContent.slice(0, MAX_CHAR_COUNT)}...`
				: renderContent()}
			{isTruncated && !isFeedDetail && (
				<ThemeText
					variant="textOrange"
					size="fs_13"
					className="p-3"
					onPress={handleSeeMorePress}
				>
					{'  '}
					See More
				</ThemeText>
			)}
		</ThemeText>
	);
};

export default HTMLParser;

const unwrapNode = (node: ChildNode): string => {
	switch (node.type) {
		case ElementType.Text:
			return node.data;
		case ElementType.Tag:
			if (node.name === 'span') {
				if (node.attribs.class?.includes('invisible')) {
					return '';
				}
				if (node.attribs.class?.includes('ellipsis'))
					return `${node.children.map(child => unwrapNode(child)).join('')}...`;
			}

			return node.children.map(child => unwrapNode(child)).join('');
		default:
			return '';
	}
};
