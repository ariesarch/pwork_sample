import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import useDebounce from '@/hooks/custom/useDebounce';
import { useSearchUsers } from '@/hooks/queries/conversations.queries';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import BottomSheet, {
	BottomSheetScrollView,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import { getReplacedMentionText } from '@/util/helper/compose';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const UserSuggestionModal = () => {
	const { composeState, composeDispatch } = useComposeStatus();
	const [debounceVal, setDebounceVal] = useState('');
	const startDebounce = useDebounce();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const previousCurrentMentionStr = useRef('');
	const snapPoints = useMemo(() => ['80%'], []);

	const {
		data: searchedUsers,
		isLoading,
		error,
	} = useSearchUsers({
		query: debounceVal,
		resolve: false,
		limit: 4,
		options: { enabled: debounceVal.length > 3 },
	});

	useEffect(() => {
		if (composeState?.currentMention?.raw === previousCurrentMentionStr.current)
			return;
		if (composeState.currentMention?.raw?.length! > 3) {
			startDebounce(() => {
				bottomSheetRef.current?.expand();
				setDebounceVal(composeState.currentMention?.raw || '');
			}, 300);
		}
		if (
			composeState?.currentMention?.raw === undefined ||
			composeState?.currentMention?.raw.length! === 0
		) {
			startDebounce(() => {
				bottomSheetRef.current?.close();
				setDebounceVal('');
			}, 300);
		}
	}, [composeState.currentMention?.raw]);
	return (
		<GestureHandlerRootView className="flex-1 z-10">
			<BottomSheet
				enableDynamicSizing={false}
				enablePanDownToClose
				enableContentPanningGesture
				index={-1}
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				backgroundStyle={{ backgroundColor: 'rgba(64, 75, 82, 1)' }}
				handleIndicatorStyle={{ backgroundColor: '#fff' }}
			>
				<BottomSheetView style={{ flexGrow: 1 }}>
					{isLoading ? (
						<View className="flex-1 items-center justify-center">
							<Flow size={30} color={customColor['patchwork-red-50']} />
						</View>
					) : searchedUsers?.data?.length > 0 ? (
						<BottomSheetScrollView
							keyboardShouldPersistTaps="handled"
							contentContainerStyle={{
								backgroundColor: 'rgba(64, 75, 82, 1)',
							}}
						>
							{searchedUsers.data.map(item => (
								<TouchableOpacity
									key={item.id}
									className="pb-1"
									onPress={() => {
										bottomSheetRef.current?.close();
										const newString = getReplacedMentionText(
											composeState.text.raw,
											composeState.currentMention?.index ?? 0,
											item.acct,
										);
										previousCurrentMentionStr.current = '@' + item.acct;
										composeDispatch({
											type: 'replaceMentionText',
											payload: { raw: newString, count: newString.length },
										});
									}}
								>
									<View className="px-3 flex-row items-center">
										<FastImage
											className="w-8 h-8 rounded-full mr-3"
											source={{ uri: item.avatar }}
											resizeMode={FastImage.resizeMode.contain}
										/>
										<View>
											<ThemeText className="text-white">
												{item.display_name}
											</ThemeText>
											<ThemeText className="text-white">
												@{item.username}
											</ThemeText>
										</View>
									</View>
								</TouchableOpacity>
							))}
						</BottomSheetScrollView>
					) : null}
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
};

export default UserSuggestionModal;
