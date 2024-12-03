import { useUploadComposeImageMutation } from '@/hooks/mutations/feed.mutation';
import {
	useManageAttachmentActions,
	useManageAttachmentStore,
} from '@/store/compose/manageAttachments/manageAttachmentStore';
import { calculateImageWidth } from '@/util/helper/compose';
import { cn } from '@/util/helper/twutil';
import { CloseIcon } from '@/util/svg/icon.common';
import { useEffect, useRef } from 'react';
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Asset } from 'react-native-image-picker';
import ImageProgressBar from '../ImageProgressBar/ImageProgressBar';
import Toast from 'react-native-toast-message';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';

// ***** Type Guard ***** //
function isAsset(item: Asset | Pathchwork.Attachment): item is Asset {
	return 'uri' in item && !!item.uri;
}
// ***** Type Guard ***** //

const ImageCard = () => {
	const { composeDispatch } = useComposeStatus();
	const previousImageCount = useRef(0);

	const selectedMedia = useManageAttachmentStore(state => state.selectedMedia);
	const progressInfo = useManageAttachmentStore(state => state.progress);

	const {
		onremoveMedia,
		onProgressIndexChange,
		onProgressChange,
		resetAttachmentStore,
	} = useManageAttachmentActions();

	const { mutateAsync, isPending } = useUploadComposeImageMutation({
		onSuccess: async response => {
			onProgressChange(100);
			onProgressIndexChange(undefined);
			composeDispatch({
				type: 'media_add',
				payload: [response.id],
			});
		},
		onError: error => {
			Toast.show({
				type: 'errorToast',
				text1: 'Something went wrong',
				position: 'top',
				topOffset: 50,
			});
			resetAttachmentStore();
		},
	});

	useEffect(() => {
		const currentImageCount = selectedMedia.length;
		if (currentImageCount > previousImageCount.current) {
			const newImageList = selectedMedia.slice(
				previousImageCount.current,
				currentImageCount,
			);
			startImageUploading(newImageList);
		}
		previousImageCount.current = currentImageCount;
	}, [selectedMedia]);

	const startImageUploading = async (newImageList: Asset[]) => {
		for (const image of newImageList) {
			const currentIdx = selectedMedia.findIndex(
				(item): item is Asset => 'uri' in item && item.uri === image.uri,
			);
			if (currentIdx !== -1) {
				onProgressIndexChange(currentIdx);
				await mutateAsync({ image, onProgressChange });
			}
		}
	};

	const handleImageRemove = (index: number) => {
		composeDispatch({
			type: 'media_remove',
			payload: index,
		});
		onremoveMedia(index);
	};

	return (
		<View className="my-5">
			<View className={cn('flex-row flex-wrap rounded-xl overflow-hidden')}>
				{selectedMedia.map((item, index) => {
					const imageUri = isAsset(item) ? item.uri : item.url;
					return (
						<View
							key={index}
							className={cn(
								'border-patchwork-dark-100 border-4 rounded-xl',
								calculateImageWidth(selectedMedia, index),
							)}
						>
							<FastImage
								className={cn('w-full h-full rounded-xl')}
								source={{
									uri: imageUri,
									priority: FastImage.priority.high,
									cache: FastImage.cacheControl.immutable,
								}}
								resizeMode={'cover'}
							/>
							<Pressable
								disabled={isPending}
								onPress={() => handleImageRemove(index)}
								className="bg-black opacity-50 w-[20] h-[20] p-1 items-center rounded-full justify-center absolute right-2 top-2 active:opacity-40"
							>
								<CloseIcon />
							</Pressable>

							{progressInfo?.currentIndex != undefined && (
								<>
									{progressInfo?.currentIndex <= index && (
										<View className="bg-slate-100 absolute opacity-50 top-0 bottom-0 right-0 left-0 rounded-xl" />
									)}

									{progressInfo?.currentIndex == index && (
										<View className="absolute top-0 bottom-0 right-0 left-0 rounded-xl flex items-center justify-center">
											<ImageProgressBar />
										</View>
									)}
								</>
							)}
						</View>
					);
				})}
			</View>
		</View>
	);
};

export default ImageCard;
