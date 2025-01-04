import React from 'react';
import { Image } from 'react-native';
import type { TextStyle } from 'react-native';
import { ThemeText } from '../ThemeText/ThemeText';
import { moderateScale } from 'react-native-size-matters';

const regexEmoji = /(:[A-Za-z0-9_]+:)/;

export interface Props {
	content?: string;
	emojis?: Patchwork.Emoji[];
	style?: TextStyle;
	color?: string;
}

const ParseEmojis: React.FC<Props> = ({ content, emojis, style, color }) => {
	if (!content) return null;
	return (
		<ThemeText style={style}>
			{emojis ? (
				content
					.split(regexEmoji)
					.filter(f => f)
					.map((str, i) => {
						if (str.match(regexEmoji)) {
							const emojiShortcode = str.split(regexEmoji)[1];
							const emojiIndex = emojis.findIndex(emoji => {
								return emojiShortcode === `:${emoji.shortcode}:`;
							});

							if (emojiIndex === -1) {
								return (
									<ThemeText key={emojiShortcode + i}>
										{emojiShortcode}
									</ThemeText>
								);
							} else {
								const uri = emojis[emojiIndex].url;
								return (
									<ThemeText key={emojiShortcode + i}>
										{i === 0 ? ' ' : undefined}
										<Image
											source={{ uri }}
											style={{
												resizeMode: 'contain',
												width: moderateScale(14),
												height: moderateScale(14),
											}}
										/>
									</ThemeText>
								);
							}
						} else {
							return <ThemeText key={i}>{str}</ThemeText>;
						}
					})
			) : (
				<ThemeText>{content}</ThemeText>
			)}
		</ThemeText>
	);
};

export default ParseEmojis;
