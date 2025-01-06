import { View, Text } from 'react-native';
import React from 'react';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { CalendarIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import dayjs from 'dayjs';
import HTMLParser from '@/components/atoms/common/ParseHtml/ParseHtml';
import ParseNormalHtmlStr from '@/components/atoms/common/ParseHtml/ParseNormalHtmlStr';
import { useNavigation } from '@react-navigation/native';

type Props = {
	channelAbout: Patchwork.ChannelAbout | undefined;
	channelAdditionalInfo: Patchwork.ChannelAdditionalInfo;
};
const ChannelInformation = ({ channelAbout, channelAdditionalInfo }: Props) => {
	const { colorScheme } = useColorScheme();
	const createdDate = dayjs(channelAbout?.contact?.account?.created_at).format(
		'YYYY-MM-DD',
	);
	const navigation = useNavigation();

	const handleOnPressUsername = () => {
		navigation.navigate('ProfileOther', {
			id: channelAbout?.contact?.account?.id!,
		});
	};

	return (
		<View className="p-4">
			<ThemeText className="font-SourceSans3_Bold mb-2" size={'fs_15'}>
				Channel information
			</ThemeText>
			{/* <ThemeText className="my-3 leading-[18px]"></ThemeText> */}
			<ParseNormalHtmlStr content={channelAdditionalInfo.content} />
			<View className="flex-row items-center">
				<CalendarIcon {...{ colorScheme }} />
				<ThemeText className="ml-2">
					Created at {createdDate} by{' '}
					<ThemeText
						onPress={handleOnPressUsername}
						className="text-patchwork-red-50"
					>
						{`@${channelAbout?.contact?.account?.username}`}
					</ThemeText>
				</ThemeText>
			</View>
		</View>
	);
};

export default ChannelInformation;
