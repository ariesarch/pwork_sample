import axios from 'axios';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Image,
	Pressable,
	TouchableOpacity,
	View,
} from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { CloseIcon } from '@/util/svg/icon.common';
import customColor from '@/util/constant/color';
import { Flow } from 'react-native-animated-spinkit';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import useDebounce from '@/hooks/custom/useDebounce';
import { fetchLinkPreview } from '@/services/feed.service';

export const LinkCard = () => {
	const [previewData, setPreviewData] = useState<Pathchwork.LinkPreview>();
	const [loading, setLoading] = useState(true);
	const [isLinkError, setLinkError] = useState(false);
	const { composeState, composeDispatch } = useComposeStatus();
	const startDebounce = useDebounce();

	useEffect(() => {
		if (composeState.link.firstLinkUrl) {
			startDebounce(() => getLinkPreview(), 500);
		}
	}, [composeState.link.firstLinkUrl]);

	const getLinkPreview = async () => {
		//refactor_later
		await fetchLinkPreview(composeState.link.firstLinkUrl)
			.then(res => {
				setPreviewData(res);
				setLoading(false);
				setLinkError(false);
			})
			.catch(() => {
				setLoading(false);
				setLinkError(true);
			});
	};

	const handleLinkCardClose = () => {
		composeDispatch({
			type: 'link',
			payload: {
				isLinkInclude: composeState.link.isLinkInclude,
				showLinkCard: false,
				firstLinkUrl: composeState.link.firstLinkUrl,
			},
		});
	};

	if (!composeState.link.showLinkCard || !composeState.link.isLinkInclude) {
		return <></>;
	}

	if (loading || isLinkError) {
		return (
			<View className="mt-8 pb-2 rounded-xl border-slate-600 border">
				<View className="w-full h-[220] bg-patchwork-dark-50 rounded-tl-xl rounded-tr-xl items-center justify-center">
					{loading && (
						<Flow size={25} color={customColor['patchwork-red-50']} />
					)}
				</View>
				<View className="p-3">
					<ThemeText>
						{isLinkError ? 'Failed to Fetch Link Preview' : '....'}
					</ThemeText>
					<ThemeText size="xs_12" className="mt-1 underline">
						{composeState.link.firstLinkUrl}
					</ThemeText>
				</View>
			</View>
		);
	}

	return (
		<View className="mt-8 pb-2 rounded-xl border-slate-600 border">
			{previewData && (
				<View>
					<Image
						source={{ uri: previewData.images[0].src }}
						className="w-full h-[220] bg-patchwork-dark-50 rounded-tl-xl rounded-tr-xl"
					/>
					<View className="p-3">
						<ThemeText>{previewData.title}</ThemeText>
						<ThemeText size="xs_12" className="mt-1 underline">
							{previewData.url}
						</ThemeText>
					</View>
					<Pressable
						onPress={() => handleLinkCardClose()}
						className="bg-black opacity-50 w-[20] h-[20] p-1 items-center rounded-full justify-center absolute right-2 top-2 active:opacity-40"
					>
						<CloseIcon />
					</Pressable>
				</View>
			)}
		</View>
	);
};
