import LinkifyIt, { Match } from 'linkify-it';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { Linking } from 'react-native';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { debounce, differenceWith, isEqual } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	findFirstLink,
	findMentionChanges,
	showLinkCardIfNotManuallyClose,
} from '@/util/helper/helper';
import { useSSR } from 'react-i18next';
const linkify = new LinkifyIt();

linkify
	.add('@', {
		validate: function (text, pos, self) {
			const tail = text.slice(pos);

			if (!self.re.mention) {
				self.re.mention = new RegExp('^\\S+');
			}
			if (self.re.mention.test(tail)) {
				return tail.match(self.re.mention)![0].length;
			}
			return 0;
		},
	})
	.add('#', {
		validate: function (text, pos, self) {
			const tail = text.slice(pos);

			if (!self.re.hashtag) {
				self.re.hashtag = new RegExp('^[\\S]+');
			}
			if (self.re.hashtag.test(tail)) {
				return tail.match(self.re.hashtag)![0].length;
			}
			return 0;
		},
	})
	.add(':', {
		validate: function (text, pos, self) {
			const tail = text.slice(pos);

			if (!self.re.emoji) {
				self.re.emoji = new RegExp('^(?:([^:]+):)');
			}
			if (self.re.emoji.test(tail)) {
				return tail.match(self.re.emoji)![0].length;
			}
			return 0;
		},
	});

export const FormattedText = ({ text }: { text: string }) => {
	const matches = useMemo(() => linkify.match(text), [text]);
	const mentionList = matches?.filter(item => item.schema == '@');
	const prevMentionList = useRef<Match[]>();
	const mentionRegex = /@(\w+)/g;
	const { composeState, composeDispatch } = useComposeStatus();
	const elements = [];
	let lastIndex = 0;

	useEffect(() => {
		const firstLink = !!matches ? findFirstLink(matches) : '';
		const mentionChanges = findMentionChanges(
			mentionList,
			prevMentionList.current,
		);
		prevMentionList.current = mentionList;
		dispatchMentionChanges(mentionChanges);
		dispatchFirstLink(firstLink);
	}, [matches]);

	const dispatchFirstLink = (firstLink: string) => {
		composeDispatch({
			type: 'link',
			payload: {
				isLinkInclude: !!firstLink,
				showLinkCard:
					!!firstLink &&
					!!matches &&
					showLinkCardIfNotManuallyClose(
						matches[0].url,
						composeState.link.firstLinkUrl,
						composeState.link.showLinkCard,
					),
				firstLinkUrl: !!firstLink ? firstLink : '',
			},
		});
	};

	const dispatchMentionChanges = (mentionChanges: Match[]) => {
		return composeDispatch({
			type: 'currentMention',
			payload: mentionChanges.length > 0 ? mentionChanges[0] : undefined,
		});
	};

	if (!matches) {
		return <ThemeText>{text}</ThemeText>;
	}
	matches.forEach((match, index) => {
		// push plain text that comes before each link or hashtag or mention
		if (match.index > lastIndex) {
			elements.push(
				<ThemeText key={`text-${index}`}>
					{text.slice(lastIndex, match.index)}
				</ThemeText>,
			);
		}

		// push each link or hashtag or mention
		elements.push(
			<ThemeText key={`link-${index}`} onPress={() => {}} variant="textOrange">
				{match.raw}
			</ThemeText>,
		);

		lastIndex = match.lastIndex;
	});

	// add remaining plain text after all link or mention or hashtag are rendered
	if (lastIndex < text.length) {
		elements.push(
			<ThemeText key="remaining-text">{text.slice(lastIndex)}</ThemeText>,
		);
	}

	return <ThemeText>{elements}</ThemeText>;
};
