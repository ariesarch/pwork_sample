import ThemeModal from '@/components/atoms/common/Modal/Modal';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { MockCountryList } from '@/mock/login/countryList';
import {
	RadioCheckedIcon,
	RadioOutlined,
	SearchIcon,
} from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { View, Pressable, FlatList } from 'react-native';

type Props = {
	isOpen: boolean;
	onCloseThemeModal: () => void;
	selectedCountry?: Pathchwork.Country;
	onSelectCountry: (selectedCountry: Pathchwork.Country) => void;
};

const CountryModel = ({
	isOpen,
	onCloseThemeModal,
	selectedCountry = undefined,
	onSelectCountry,
}: Props) => {
	const { colorScheme } = useColorScheme();

	return (
		<ThemeModal
			isFlex
			{...{
				openThemeModal: isOpen,
				onCloseThemeModal,
			}}
		>
			<View className="flex-1">
				<View className="flex flex-row justify-between mb-2">
					<Pressable onPress={onCloseThemeModal}>
						<ThemeText variant="textGrey">Cancel</ThemeText>
					</Pressable>
					<Pressable onPress={onCloseThemeModal}>
						<ThemeText>Save</ThemeText>
					</Pressable>
				</View>
				<ThemeText className="font-bold" size="md_16">
					Please select your country
				</ThemeText>
				<TextInput
					placeholder="Search ..."
					styleNW="h-11 mt-3 mx-3"
					startIcon={<SearchIcon />}
				/>
				<View className="mx-3">
					<FlatList
						data={MockCountryList}
						showsVerticalScrollIndicator={false}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) => (
							<Pressable
								className="flex flex-row flex-1 items-center py-4"
								onPress={() => onSelectCountry(item)}
							>
								<ThemeText className="mr-2">{item.emoji_flag}</ThemeText>
								<ThemeText>{item.common_name}</ThemeText>
								<View className="flex-1" />
								<View className="justify-end">
									{item?.alpha2 === selectedCountry?.alpha2 ? (
										<RadioCheckedIcon colorScheme={colorScheme} />
									) : (
										<RadioOutlined />
									)}
								</View>
							</Pressable>
						)}
					/>
				</View>
			</View>
		</ThemeModal>
	);
};

export default CountryModel;
