import { MediaState } from '@/store/profile/useProfileMediaStore';
import React from 'react';
import { Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Asset } from 'react-native-image-picker';

interface HeaderMediaProps {
	header: MediaState;
	actions: {
		onToggleMediaModal: (type: 'header' | 'avatar') => void;
		onSelectMedia: (type: 'header' | 'avatar', media: Asset[] | string) => void;
	};
}

const HeaderMedia: React.FC<HeaderMediaProps> = ({ header, actions }) => (
	<Pressable onPress={() => actions.onToggleMediaModal('header')}>
		<FastImage
			className="bg-patchwork-dark-50 h-36 w-full"
			source={{
				uri:
					typeof header.selectedMedia === 'string'
						? header?.selectedMedia
						: header?.selectedMedia[0]?.uri,
				priority: FastImage.priority.normal,
			}}
			resizeMode={FastImage.resizeMode.cover}
		/>
	</Pressable>
);

export default HeaderMedia;
