import { MediaState } from '@/store/profile/useProfileMediaStore';
import { cn } from '@/util/helper/twutil';
import { ComposeCameraIcon } from '@/util/svg/icon.compose';
import React from 'react';
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Asset } from 'react-native-image-picker';

interface AvatarMediaProps {
	avatar: MediaState;
	actions: {
		onToggleMediaModal: (type: 'header' | 'avatar') => void;
		onSelectMedia: (type: 'header' | 'avatar', media: Asset[] | string) => void;
	};
}

const AvatarMedia: React.FC<AvatarMediaProps> = ({ avatar, actions }) => (
	<View className="mx-auto">
		<Pressable
			className="p-1 "
			onPress={() => actions.onToggleMediaModal('avatar')}
		>
			<View className="z-10 absolute bottom-2 right-2 rounded-full bg-slate-50 p-1">
				<ComposeCameraIcon className="" />
			</View>
			<FastImage
				className={cn(
					'w-[100] h-[100] mt-[-25] bg-patchwork-dark-50 border-patchwork-dark-100 border-4 rounded-full',
				)}
				source={{
					uri:
						typeof avatar.selectedMedia === 'string'
							? avatar?.selectedMedia
							: avatar?.selectedMedia[0]?.uri,
					priority: FastImage.priority.normal,
				}}
				resizeMode={FastImage.resizeMode.cover}
			/>
		</Pressable>
	</View>
);

export default AvatarMedia;
