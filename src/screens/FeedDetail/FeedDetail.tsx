import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import Underline from '@/components/atoms/common/Underline/Underline';
import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import StatusItem from '@/components/organisms/feed/StatusItem/StatusItem';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { mockCommandStatusList, mockStatusList } from '@/mock/feed/statusList';
import { HomeStackScreenProps } from '@/types/navigation';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const FeedDetail = ({ navigation }: HomeStackScreenProps<'FeedDetail'>) => {
	const renderHeader = () => {
		return (
			<View>
				<View className="mx-4">
					<StatusHeader
						status={mockStatusList[0]}
						imageSize="w-8 h-8"
						showAvatarIcon
						showFollowIcon
					/>
					<StatusContent status={mockStatusList[0]} className="mt-2" />
					<StatusActionBar />
				</View>
				<Underline className="mt-3" />
				<ThemeText className="font-semibold ml-4 my-2">Replies</ThemeText>
				<Underline />
			</View>
		);
	};

	// const renderFooter = () => (
	// 	<View className="mx-3">
	// 		<TextInput placeholder="Reply To Account Name" />
	// 	</View>
	// );

	return (
		<SafeScreen>
			<KeyboardAwareScrollView
				className=" bg-patchwork-light-900 dark:bg-patchwork-dark-100"
				style={{ flex: 1 }}
			>
				<Header title="Post" leftCustomComponent={<BackButton />} />
				<FlatList
					data={mockCommandStatusList}
					ListHeaderComponent={renderHeader}
					ListHeaderComponentStyle={{ margin: 0, padding: 0 }}
					// ListFooterComponent={renderFooter}
					showsVerticalScrollIndicator={false}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => <StatusItem status={item} />}
					contentContainerStyle={{ flexGrow: 1 }}
					style={{ flex: 1 }}
				/>
				<View className="mx-6 my-3">
					<TextInput placeholder="Reply To Account Name" />
				</View>
			</KeyboardAwareScrollView>
		</SafeScreen>
	);
};

export default FeedDetail;
