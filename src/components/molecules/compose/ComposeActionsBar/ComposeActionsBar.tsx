import React from 'react';
import { View, Pressable } from 'react-native';
import { ComposeGlobeIcon, ComposeLinkIcon, GalleryIcon, GifIcon, LocationIcon, PlusIcon, PollIcon } from '@/util/svg/icon.compose';
import { useColorScheme } from 'nativewind';
import styles from './ComposeActionsBar.style';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

const ComposeActionsBar = () => {
	const { colorScheme } = useColorScheme();
	return (
		<View className={styles.container}>
			<Pressable className={'mr-3'} children={<GalleryIcon {...{ colorScheme }} />} />
			<Pressable className={'mr-3'} children={<GifIcon {...{ colorScheme }} />} />
			<Pressable className={'mr-3'} children={<LocationIcon {...{ colorScheme }} />} />
			<Pressable className={'mr-3'} children={<PollIcon {...{ colorScheme }} />} />
			<Pressable className={'mr-3'} children={<ComposeGlobeIcon {...{ colorScheme }} />} />
			<Pressable className={'mr-3'} children={<ComposeLinkIcon {...{ colorScheme }} />} />
      <View className='flex-1 items-end'>
        <View className='flex-row items-center'>
          <PlusIcon />
          <ThemeText className='ml-2 text-white' size={'fs_15'}>Long Post</ThemeText>
        </View>
      </View>
		</View>
	);
};

export default ComposeActionsBar;
