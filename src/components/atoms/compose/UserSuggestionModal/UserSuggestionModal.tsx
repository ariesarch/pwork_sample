import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import useDebounce from '@/hooks/custom/useDebounce';
import { useSearchUsers } from '@/hooks/queries/conversations.queries';
import { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import BottomSheet, {
	BottomSheetScrollView,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import { getReplacedMentionText } from '@/util/helper/compose';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';

const UserSuggestionModal = () => {
	const { composeState, composeDispatch } = useComposeStatus();
	const [debounceVal, setDebounceVal] = useState('');
	const startDebounce = useDebounce();
	const previousCurrentMentionStr = useRef('');
	const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

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

	const openDrawer = () => {
		setIsThemeModalOpen(true);
	};

	const closeDrawer = () => {
		setIsThemeModalOpen(false);
	};

	useEffect(() => {
		if (composeState?.currentMention?.raw === previousCurrentMentionStr.current)
			return;
		if (composeState.currentMention?.raw?.length! > 3) {
			startDebounce(() => {
				openDrawer();
				setDebounceVal(composeState.currentMention?.raw || '');
			}, 1200);
		}
		if (
			composeState?.currentMention?.raw === undefined ||
			composeState?.currentMention?.raw.length! === 0
		) {
			startDebounce(() => {
				closeDrawer();
				setDebounceVal('');
			}, 1200);
		}
	}, [composeState.currentMention?.raw]);

	return (
		<Modal
			animationType="fade"
			transparent
			visible={isThemeModalOpen}
			onRequestClose={closeDrawer}
		>
			<View className="flex-grow h-48 content-end">
				<TouchableOpacity
					activeOpacity={1}
					onPress={closeDrawer}
					className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/60"
				/>
				<BottomSheet
					snapPoints={['50%']}
					index={0}
					backgroundStyle={{ backgroundColor: 'rgba(64, 75, 82, 1)' }}
					handleIndicatorStyle={{ backgroundColor: '#fff' }}
				>
					<BottomSheetView style={{ flexGrow: 1 }}>
						<Pressable
							className="px-3 self-start rounded-md py-1 mb-3"
							onPress={closeDrawer}
						>
							<ThemeText variant="textGrey">Cancel</ThemeText>
						</Pressable>
						{isLoading ? (
							<View className="flex-1 items-center justify-center">
								<Flow size={30} color={customColor['patchwork-red-50']} />
							</View>
						) : searchedUsers?.data?.length > 0 ? (
							<BottomSheetScrollView
								keyboardShouldPersistTaps="handled"
								contentContainerStyle={{
									flexGrow: 1,
									backgroundColor: 'rgba(64, 75, 82, 1)',
								}}
							>
								{searchedUsers.data.map(item => (
									<TouchableOpacity
										key={item.id}
										className="p-1"
										onPress={() => {
											closeDrawer();
											const newString = getReplacedMentionText(
												composeState.text.raw,
												composeState.currentMention?.index ?? 0,
												item.acct,
											);
											previousCurrentMentionStr.current = '@' + item.acct;
											composeDispatch({
												type: 'replaceMentionText',
												payload: {
													raw: newString,
													count: newString.length,
												},
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
						) : (
							<ThemeText className="mx-auto mt-5">No user is found!</ThemeText>
						)}
					</BottomSheetView>
				</BottomSheet>
			</View>
		</Modal>
	);
};

export default UserSuggestionModal;
