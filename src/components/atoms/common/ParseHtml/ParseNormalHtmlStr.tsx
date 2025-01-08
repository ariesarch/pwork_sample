/* eslint-disable no-case-declarations */
import React, { useState } from 'react';
import { Linking, Platform, View } from 'react-native';
import { parseDocument, ElementType } from 'htmlparser2';
import { useNavigation } from '@react-navigation/native';
import type { ChildNode } from 'domhandler';
import { moderateScale } from 'react-native-size-matters';
import ParseEmojis from '../ParseEmojis/ParnseEmojis';
import { ThemeText } from '../ThemeText/ThemeText';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@/types/navigation';

interface Props {
	content: string;
	numberOfLines?: number;
	emojis?: Patchwork.Emoji[];
	mentions?: Patchwork.Mention[];
}
const MAX_ALLOWED_LINES = 2;

const ParseNormalHtmlStr: React.FC<Props> = ({
	content,
	numberOfLines = 10,
	emojis,
}) => {
	const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
	const [totalLines, setTotalLines] = useState<number>();
	const [expanded] = useState(false);
	const adaptedLineheight = Platform.OS === 'ios' ? 18 : undefined;

	const onRouteToWebMeta = (url: string) => {
		Linking.openURL(url);
	};

	const onStatusHashTagPress = (tag: string) => {
		// navigation.navigate('Tab-Shared-HashTag-Timeline', {
		// 	name: tag.replace(/#/g, '')?.toLowerCase(),
		// });
	};

	const document = parseDocument(content);

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
						return (
							node.children.map(child => unwrapNode(child)).join('') + '...'
						);
				}

				return node.children.map(child => unwrapNode(child)).join('');
			default:
				return '';
		}
	};

	const renderNode = (node: ChildNode, index: number) => {
		let classes, href: string;
		switch (node?.type) {
			case ElementType.Text:
				let content: string = node.data;

				if (node.data.trim().length) {
					content = node?.data.replace(new RegExp(/^\s+/), '');
				} else {
					content = node.data.trim();
				}

				return <ParseEmojis key={index} content={content} emojis={emojis} />;

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
										variant={'textOrange'}
										className="font-SourceSans3_Bold"
										onPress={() => {}}
										children={`${children} `}
									/>
								);
							}

							if (classes.includes('mention')) {
								const children = node.children.map(unwrapNode).join('');

								return (
									<ThemeText
										key={index}
										variant={'textOrange'}
										onPress={() => {}}
										children={`${children} `}
									/>
								);
							}
						} else {
							const content = node.children
								.map(child => unwrapNode(child))
								.join('');
							return (
								<ThemeText
									key={index}
									variant={'textOrange'}
									onPress={() => onRouteToWebMeta(href)}
									style={{
										textDecorationLine: 'underline',
										lineHeight: 16,
									}}
									children={content}
								/>
							);
						}
						break;

					case 'br':
						return (
							<ThemeText key={index} style={{ lineHeight: moderateScale(16) }}>
								{'\n\n'}
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
						} else {
							return (
								<ThemeText
									key={index}
									children={node.children.map((c, i) => renderNode(c, i))}
								/>
							);
						}
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
		<View style={{ overflow: 'hidden' }}>
			<ThemeText
				children={document.children.map(renderNode)}
				onTextLayout={({ nativeEvent }) => {
					if (
						numberOfLines === 1 ||
						nativeEvent.lines.length >= numberOfLines + 8
					) {
						setTotalLines(nativeEvent.lines.length);
					}
				}}
				style={{
					lineHeight: 16,
					height: numberOfLines === 1 && !expanded ? 0 : undefined,
				}}
				numberOfLines={
					typeof totalLines === 'number'
						? expanded
							? 999
							: numberOfLines
						: Math.max(MAX_ALLOWED_LINES, numberOfLines)
				}
			/>
		</View>
	);
};

export default ParseNormalHtmlStr;
