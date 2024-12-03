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

type Props = {
	composeType: 'create' | 'reblog' | 'reply';
};

const ImageCard = ({ composeType }: Props) => {
	const selectedMedia = useManageAttachmentStore(state => state.selectedMedia);
	const progressInfo = useManageAttachmentStore(state => state.progress);
	const previousImageCount = useRef(0);
	const { composeState, composeDispatch } = useComposeStatus();
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
				payload: response.id,
			});
		},
		onError: error => {
			Toast.show({
				type: 'errorToast',
				text1: 'Image Upload Failed',
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
		if (isPending) return;
		for (const image of newImageList) {
			const currentIdx = selectedMedia.findIndex(
				item => item.uri === image.uri,
			);
			onProgressIndexChange(currentIdx);
			await mutateAsync({ image, onProgressChange });
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
		<View>
			{composeType == 'reply' ? (
				<View>
					<View className="flex-row flex-wrap rounded-xl overflow-hidden">
						{selectedMedia.map((item, index) => {
							return (
								<View
									className="w-1/4 h-16 rounded-md border-patchwork-dark-400 border-2 mb-2"
									key={index}
								>
									<FastImage
										className={cn('w-full h-full rounded-xl')}
										source={{
											uri: item.uri,
											priority: FastImage.priority.high,
											cache: FastImage.cacheControl.immutable,
										}}
										resizeMode={'cover'}
									/>
									<Pressable
										disabled={isPending}
										onPress={() => handleImageRemove(index)}
										className="bg-black opacity-50 w-[16] h-[16] p-1 items-center rounded-full justify-center absolute right-2 top-2 active:opacity-40"
									>
										<CloseIcon width={17} height={17} />
									</Pressable>
									{progressInfo?.currentIndex != undefined && (
										<>
											{progressInfo?.currentIndex <= index && (
												<View className="bg-slate-100 absolute opacity-50 top-0 bottom-0 right-0 left-0 rounded-xl" />
											)}

											{progressInfo?.currentIndex == index && (
												<View className="absolute top-0 bottom-0 right-0 left-0 rounded-xl flex items-center justify-center">
													<ImageProgressBar size={25} />
												</View>
											)}
										</>
									)}
								</View>
							);
						})}
					</View>
				</View>
			) : (
				<View className="my-5">
					<View className="flex-row flex-wrap rounded-xl overflow-hidden">
						{selectedMedia.map((item, index) => {
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
											uri: item.uri,
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
			)}
		</View>
	);
};

export default ImageCard;
