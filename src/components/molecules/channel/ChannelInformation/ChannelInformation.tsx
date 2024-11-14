import { View, Text } from 'react-native';
import React from 'react';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { CalendarIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import dayjs from 'dayjs';
import HTMLParser from '@/components/atoms/common/ParseHtml/ParseHtml';
import ParseHTMLString from '@/components/atoms/common/ParseHtml/ParseNormalHtmlStr';

type Props = {
	channelAbout: Pathchwork.ChannelAbout | undefined;
	channelAdditionalInfo: Pathchwork.ChannelAdditionalInfo;
};
const ChannelInformation = ({ channelAbout, channelAdditionalInfo }: Props) => {
	const { colorScheme } = useColorScheme();
	const createdDate = dayjs(channelAbout?.contact.account.created_at).format(
		'YYYY-MM-DD',
	);
	return (
		<View className="p-4">
			<ThemeText className="font-bold mb-2">Channel information</ThemeText>
			{/* <ThemeText className="my-3 leading-[18px]"></ThemeText> */}
			<ParseHTMLString content={channelAdditionalInfo.content} />
			<View className="flex-row items-center">
				<CalendarIcon {...{ colorScheme }} />
				<ThemeText className="ml-2">
					Created at {createdDate} by{' '}
					<ThemeText className="text-patchwork-red-50">
						{`@${channelAbout?.contact.account.username}`}
					</ThemeText>
				</ThemeText>
			</View>
		</View>
	);
};

export default ChannelInformation;
