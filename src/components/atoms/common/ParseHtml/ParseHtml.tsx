/* eslint-disable no-case-declarations */
/* eslint-disable default-case */

import { useMemo, useRef, useState } from 'react';
import { parseDocument, ElementType } from 'htmlparser2';
import type { ChildNode } from 'domhandler';
import { Platform, Pressable, View } from 'react-native';
import ParseEmojis from '../ParseEmojis/ParnseEmojis';
import { ThemeText } from '../ThemeText/ThemeText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelectedDomain } from '@/store/feed/activeDomain';
import { layoutAnimation } from '@/util/helper/timeline';
import { useAuthStore } from '@/store/auth/authStore';
import { useStatusContext } from '@/context/statusItemContext/statusItemContext';
import { useActiveFeedAction } from '@/store/feed/activeFeed';

type Props = {
	status: Patchwork.Status;
	numberOfLines?: number;
	isMainStatus?: boolean;
};

const MAX_ALLOWED_LINES = 35;
const MAX_CHAR_COUNT = 150;

const HTMLParser = ({ status, numberOfLines = 10, isMainStatus }: Props) => {
	const [totalLines, setTotalLines] = useState<number>();
	const [expanded, setExpanded] = useState(false);

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
	const isImageMissing = useMemo(
		() => status?.media_attachments?.length !== 0,
		[status?.image_url],
	);
	const { currentPage } = useStatusContext();
	const { setActiveFeed } = useActiveFeedAction();
	const isFeedDetail = currentPage === 'FeedDetail';

	const handleMentionPress = (mention: Patchwork.Mention) => {
		if (mention.id === userInfo?.id!) {
			navigation.navigate('Profile', { id: userInfo?.id! });
		} else {
			navigation.navigate('ProfileOther', {
				id: mention.id,
			});
		}
	};

	const navigateToWebView = (url: string) => {
		navigation.navigate('WebViewer', { url });
	};

	const handleSeeMorePress = () => {
		setActiveFeed(status);
		navigation.navigate('FeedDetail', { id: status.id });
	};

	const renderNode = (
		node: ChildNode,
		index: number,
		isTruncated: boolean = false,
	) => {
		let classes, href: string;
		switch (node?.type) {
			case ElementType.Text:
				let content: string = node.data;

				if (node.data.trim().length) {
					content = node?.data.replace(/^\s+/, '');
				} else {
					content = node.data.trim();
				}
				if (isTruncated && content.length > MAX_CHAR_COUNT) {
					content = content.slice(0, MAX_CHAR_COUNT) + '...';
				}
				return <ParseEmojis content={content} key={index} />;

			case ElementType.Tag:
				switch (node.name) {
					case 'a':
						classes = node.attribs.class;
						href = node.attribs.href;

						if (classes) {
							if (classes.includes('hashtag')) {
								const children = node.children.map(unwrapNode).join('');

								return (
									<ThemeText
										key={index}
										size={'fs_13'}
										// className="font-SourceSans3_SemiBold"
										children={`${children} `}
										variant="textOrange"
										onPress={() => handleHashTahPress(children)}
									/>
								);
							}

							if (classes.includes('mention') && status?.mentions?.length) {
								const mentionedText = node.children.map(unwrapNode).join('');

								const matchedMention = (status?.mentions || []).find(
									(mention: Patchwork.Mention) =>
										`@${mention.username}` === mentionedText,
								);

								return (
									<ThemeText
										key={index}
										variant={matchedMention ? 'textOrange' : 'textGrey'}
										size={isMainStatus ? 'default' : 'fs_13'}
										children={`${mentionedText} `}
										onPress={() => {
											if (matchedMention) handleMentionPress(matchedMention);
										}}
									/>
								);
							}
						}

						if (isImageMissing) {
							const contentNode = node.children
								.map(child => unwrapNode(child))
								.join('');

							return (
								<ThemeText
									key={index}
									variant="textOrange"
									size="fs_13"
									children={`${contentNode} `}
									onPress={() => navigateToWebView(href)}
								/>
							);
						}
						const nodeContent = node.children
							.map(child => unwrapNode(child))
							.join('');
						if (isFirstLink && status?.is_meta_preview && status?.card) {
							isFirstLink.current = false;
							return null;
						}
						return (
							<ThemeText
								key={index}
								size="fs_13"
								variant="textOrange"
								children={nodeContent}
								onPress={() => navigateToWebView(href)}
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

					case 'p':
						if (index < document.children.length - 1) {
							return (
								<ThemeText key={index}>
									{node.children.map((c, i) => renderNode(c, i, isTruncated))}
									<ThemeText
										style={{
											lineHeight: adaptedLineheight
												? adaptedLineheight / 2
												: undefined,
										}}
									>
										{'\n'}
									</ThemeText>
								</ThemeText>
							);
						}
						return (
							<ThemeText
								key={index}
								children={node.children.map((c, i) =>
									renderNode(c, i, isTruncated),
								)}
							/>
						);

					default:
						return (
							<ThemeText
								key={index}
								children={node.children.map((c, i) =>
									renderNode(c, i, isTruncated),
								)}
								variant="textOrange"
							/>
						);
				}
		}
		return null;
	};

	const renderContentWithSeeMore = () => {
		const fullTextContent = document.children
			.map(node => unwrapNode(node))
			.join('');
		if (fullTextContent.length > MAX_CHAR_COUNT && !isFeedDetail) {
			return (
				<ThemeText>
					{document.children.map((node, index) =>
						renderNode(node, index, true),
					)}
					<ThemeText
						onPress={handleSeeMorePress}
						variant="textOrange"
						size="fs_13"
					>
						{' '}
						See More
					</ThemeText>
				</ThemeText>
			);
		}

		return (
			<>{document.children.map((node, index) => renderNode(node, index))}</>
		);
	};

	return <>{renderContentWithSeeMore()}</>;
};

export default HTMLParser;

// Utility function to unwrap content from child nodes
const unwrapNode = (node: ChildNode): string => {
	switch (node.type) {
		case ElementType.Text:
			return node.data;
		case ElementType.Tag:
			if (node.name === 'span') {
				if (node.attribs.class?.includes('invisible')) return '';
				if (node.attribs.class?.includes('ellipsis'))
					return `${node.children.map(child => unwrapNode(child)).join('')}...`;
			}
			return node.children.map(child => unwrapNode(child)).join('');
		default:
			return '';
	}
};
