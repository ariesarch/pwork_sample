import React from 'react';
import { ScrollView, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ComposeTextInput from '@/components/atoms/compose/ComposeTextInput/ComposeTextInput';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import { ComposeRepostInputExplorerIcon } from '@/util/svg/icon.compose';
import { LinkCard } from '@/components/atoms/compose/LinkCard/LinkCard';

const RepostStatus = ({ status }: { status: Pathchwork.Status }) => {
	const { colorScheme } = useColorScheme();
	return (
		<ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
			<View className="flex-row justify-between">
				<ThemeText size={'xs_12'} className="opacity-80">
					Re-posting <ThemeText>▸</ThemeText>{' '}
					<ThemeText size={'xs_12'} variant={'textOrange'}>
						@{status.account.display_name}
					</ThemeText>
				</ThemeText>
				<ComposeRepostInputExplorerIcon colorScheme={colorScheme} />
			</View>
			<ComposeTextInput />
			<LinkCard />
			<View className="border border-slate-200 dark:border-patchwork-grey-70 my-2 p-3 rounded-xl">
				<StatusHeader status={status} showAvatarIcon />
				<StatusContent status={status} />
			</View>
		</ScrollView>
	);
};

export default RepostStatus;
