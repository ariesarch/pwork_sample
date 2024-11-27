import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import useDebounce from '@/hooks/custom/useDebounce';
import { useSearchUsers } from '@/hooks/queries/conversations.queries';
import { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import BottomSheet, {
	BottomSheetFlatList,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import ThemeModal from '../../common/Modal/Modal';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { getReplacedMentionText } from '@/util/helper/compose';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { text } from 'stream/consumers';
import { count } from 'console';
import { Match } from 'linkify-it';

const UserSuggestionModal = () => {
	const { composeState, composeDispatch } = useComposeStatus();
	const [debounceVal, setDebounceVal] = useState('');
	const startDebounce = useDebounce();
	const [openModal, setModal] = useState(false);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const previousCurrentMentionStr = useRef('');

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
				setModal(true);
				setDebounceVal(composeState.currentMention?.raw || '');
			}, 1200);
		}
	}, [composeState.currentMention?.raw]);

	return (
		<View>
			<ThemeModal
				openThemeModal={openModal}
				onCloseThemeModal={() => {
					setModal(false);
				}}
			>
				<View className="h-[300]">
					<View className="flex flex-row justify-between mb-2">
						<Pressable
							onPress={() => {
								setModal(false);
							}}
						>
							<ThemeText variant="textGrey">Cancel</ThemeText>
						</Pressable>
						{/* <Pressable onPress={() => {}}>
							<ThemeText>Save</ThemeText>
						</Pressable> */}
					</View>
					{searchedUsers?.data && (
						<FlatList
							data={searchedUsers.data}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										setModal(false);
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
									<View className="p-4 flex-row">
										<FastImage
											className="w-10 h-10 rounded-full mr-3"
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
							)}
							keyExtractor={item => item.id.toString()}
							showsHorizontalScrollIndicator={false}
						/>
					)}
					{isLoading && (
						<View className="flex-1 items-center justify-center">
							<Flow size={30} color={customColor['patchwork-red-50']} />
						</View>
					)}
				</View>
			</ThemeModal>
		</View>
	);
};

export default UserSuggestionModal;
