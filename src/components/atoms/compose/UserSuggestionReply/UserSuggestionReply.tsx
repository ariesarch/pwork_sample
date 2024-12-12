import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import useDebounce from '@/hooks/custom/useDebounce';
import { useSearchUsers } from '@/hooks/queries/conversations.queries';
import { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import UserSuggestionLoading from '../../loading/UserSuggestionLoading';

const UserSuggestionReply = () => {
	const { composeState, composeDispatch } = useComposeStatus();
	const [debounceVal, setDebounceVal] = useState('');
	const startDebounce = useDebounce();
	const [showUserSuggestion, setUserSuggView] = useState(false);
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
		if (
			composeState.disableUserSuggestionsModal &&
			composeState?.currentMention?.raw === previousCurrentMentionStr.current
		)
			return;
		if (composeState.currentMention?.raw?.length! > 3) {
			startDebounce(() => {
				setUserSuggView(true);
				setDebounceVal(composeState.currentMention?.raw || '');
			}, 1200);
		}
	}, [
		composeState.currentMention?.raw,
		composeState.disableUserSuggestionsModal,
	]);
	if (!showUserSuggestion) return <></>;
	return (
		<View>
			{searchedUsers?.data && (
				<FlatList
					data={searchedUsers.data}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps={'always'}
					horizontal
					renderItem={({ item }) => (
						<Pressable
							onPress={() => {
								setUserSuggView(false);
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
							className="active:opacity-80"
						>
							<View className="pr-5 py-2 flex-row items-center">
								<FastImage
									className="w-8 h-8 rounded-full mr-3 bg-patchwork-dark-50"
									source={{ uri: item.avatar }}
									resizeMode={FastImage.resizeMode.contain}
								/>
								<View>
									<ThemeText className="text-white">
										{item.display_name}
									</ThemeText>
									<ThemeText className="text-white">@{item.username}</ThemeText>
								</View>
							</View>
						</Pressable>
					)}
					keyExtractor={item => item.id.toString()}
					showsHorizontalScrollIndicator={false}
				/>
			)}
			{isLoading && <UserSuggestionLoading />}
		</View>
	);
};

export default UserSuggestionReply;
