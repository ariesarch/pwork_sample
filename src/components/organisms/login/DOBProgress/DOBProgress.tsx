/* eslint-disable react/no-unescaped-entities */
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { MockCountryList } from '@/mock/login/countryList';
import { DownIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import CountryModel from '../CountryModel/CountryModel';

const DOBPRogress = () => {
	const { colorScheme } = useColorScheme();
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(MockCountryList[0]);
	return (
		<View>
			<ThemeText variant="textGrey">
				Tell us about yourself to start building your home feed.
			</ThemeText>
			<View className="mt-7 mb-5">
				<ThemeText className="font-semibold mb-2" size="md_16">
					What's your date of birth
				</ThemeText>
				<Pressable onPress={() => {}}>
					<View pointerEvents="none">
						<TextInput
							placeholder="Date of Birth"
							// value={
							// 	selectedDob
							// 		? moment(new Date(selectedDob)).format('MM / D / YYYY')
							// 		: ''
							// }
							// value="25"
						/>
					</View>
				</Pressable>
			</View>
			<View>
				<ThemeText className="font-semibold mb-2" size="md_16">
					Select your country
				</ThemeText>
				<Pressable onPress={() => setModalOpen(true)}>
					<View pointerEvents="none">
						<TextInput
							placeholder="Select a country"
							endIcon={<DownIcon colorScheme={colorScheme} className="mt-1" />}
							value={selectedCountry.common_name}
						/>
					</View>
				</Pressable>
			</View>
			<CountryModel
				isOpen={isModalOpen}
				onCloseThemeModal={() => setModalOpen(false)}
				selectedCountry={selectedCountry}
				onSelectCountry={(country: Pathchwork.Country) =>
					setSelectedCountry(country)
				}
			/>
		</View>
	);
};

export default DOBPRogress;
