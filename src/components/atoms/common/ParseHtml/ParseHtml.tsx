/* eslint-disable no-case-declarations */
/* eslint-disable default-case */

import { useMemo, useRef } from 'react';
import { parseDocument, ElementType } from 'htmlparser2';
import type { ChildNode } from 'domhandler';
import { Platform, Pressable } from 'react-native';
import ParseEmojis from '../ParseEmojis/ParnseEmojis';
import { ThemeText } from '../ThemeText/ThemeText';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
	status: Pathchwork.Status;
	// numberOflines?: number;
	isMainStatus?: boolean;
};

const HTMLParser = ({ status, isMainStatus }: Props) => {
	const isFirstLink = useRef(true);
	const document = useMemo(() => {
		return parseDocument(status.content);
	}, [status.content]);
	const isImageMissing = useMemo(() => {
		return status?.media_attachments?.length !== 0;
	}, [status?.image_url]);
	const adaptedLineheight = Platform.OS === 'ios' ? 18 : undefined;

	const renderNode = (node: ChildNode, index: number) => {
		let classes;
		// let href: string;
		switch (node?.type) {
			case ElementType.Text:
				let content: string = node.data;

				if (node.data.trim().length) {
					content = node?.data.replace(/^\s+/, '');
				} else {
					content = node.data.trim();
				}
				return <ParseEmojis content={content} key={index} />;

			case ElementType.Tag:
				switch (node.name) {
					case 'a':
						classes = node.attribs.class;
						// href = node.attribs.href;

						if (classes) {
							if (classes.includes('hashtag')) {
								const children = node.children.map(unwrapNode).join('');

								return (
									<TouchableOpacity
										activeOpacity={0.8}
										onPress={() => {}}
										key={index}
									>
										<ThemeText
											className="font-bold"
											children={`${children} `}
										/>
									</TouchableOpacity>
								);
							}

							if (classes.includes('mention') && status?.mentions?.length) {
								const mentionedText = node.children.map(unwrapNode).join('');

								const matchedMention = (status?.mentions || []).find(
									(mention: Pathchwork.Mention) =>
										`@${mention.username}` === mentionedText,
								);

								// const sameAccount = currentUserId === matchedMention?.id;
								// const onRouteToUserProfile = () => {
								// 	return matchedMention && sameAccount
								// 		? navigation.navigate('Profile-Me-Root')
								// 		: navigation.navigate('Profile-User-Root', {
								// 				id: matchedMention?.id,
								// 				...('status?.is_rss_content' in status && {
								// 					queryKey: 'Following',
								// 				}),
								// 				queryKey: 'Following',
								// 		  });
								// };

								return (
									<ThemeText
										key={index}
										variant={matchedMention ? 'textOrange' : 'textGrey'}
										size={isMainStatus ? 'default' : 'fs_13'}
										onPress={() => {}}
										children={`${mentionedText} `}
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
									onPress={() => () => {}}
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
							<TouchableOpacity
								onPress={() => {}}
								activeOpacity={0.8}
								key={index}
							>
								<ThemeText
									size="fs_13"
									variant="textOrange"
									children={nodeContent}
								/>
							</TouchableOpacity>
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
									{node.children.map((c, i) => renderNode(c, i))}
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
								children={node.children.map((c, i) => renderNode(c, i))}
							/>
						);

					default:
						return (
							<ThemeText
								key={index}
								children={node.children.map((c, i) => renderNode(c, i))}
								variant="textOrange"
							/>
						);
				}
		}
		return null;
	};

	return <ThemeText children={document.children.map(renderNode)} />;
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
