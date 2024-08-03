import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import {
	ComposeGlobeIcon,
	ComposeLinkIcon,
	GalleryIcon,
	GifIcon,
	LocationIcon,
	PlusIcon,
	PollIcon,
} from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';
import styles from './ComposeActionsBar.style';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import CallToAction from '@/components/organisms/compose/CallToAction/CallToAction';

const ComposeActionsBar = () => {
	const { colorScheme } = useColorScheme();
	const [ctaModalVisible, setCTAModalVisible] = useState(false);

	return (
		<>
			<View className={styles.container}>
				<Pressable
					className={'mr-3'}
					children={<GalleryIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<GifIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<LocationIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<PollIcon {...{ colorScheme }} />}
				/>
				<Pressable
					className={'mr-3'}
					children={<ComposeGlobeIcon {...{ colorScheme }} />}
				/>
				<Pressable
					onPress={() => setCTAModalVisible(true)}
					className={'mr-3'}
					children={<ComposeLinkIcon {...{ colorScheme }} />}
				/>
				<View className="flex-1 items-end">
					<View className="flex-row items-center">
						<PlusIcon />
						<ThemeText className="ml-2 text-white" size={'fs_15'}>
							Long Post
						</ThemeText>
					</View>
				</View>
			</View>

			<ThemeModal
				isFlex
				hasNotch={false}
				{...{
					openThemeModal: ctaModalVisible,
					onCloseThemeModal: () => setCTAModalVisible(false),
				}}
				containerStyle={{ borderRadius: 24 }}
			>
				<CallToAction onClose={() => setCTAModalVisible(false)} />
			</ThemeModal>
		</>
	);
};

export default ComposeActionsBar;
