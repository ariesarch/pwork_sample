/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable react/no-unescaped-entities */
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { MockCountryList } from '@/mock/login/countryList';
import { DownIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Pressable, View, Platform } from 'react-native';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import CountryModel from '../CountryModel/CountryModel';
import moment from 'moment';

const DOBPRogress = () => {
	const { colorScheme } = useColorScheme();
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(MockCountryList[0]);
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [currentDob, setCurrentDob] = useState(new Date('1999-09-09'));

	const onSelectDateOfBirth = (
		event: DateTimePickerEvent,
		selectedDate: Date | undefined,
	) => {
		setOpenDatePicker(false);
		// if (Platform.OS === 'android') {
		// 	setOpenDatePicker(false);
		// }
		setCurrentDob(selectedDate ?? currentDob);
	};

	return (
		<View>
			<ThemeText variant="textGrey">
				Tell us about yourself to start building your home feed.
			</ThemeText>
			<View className="mt-7 mb-5">
				<ThemeText className="font-semibold mb-2" size="md_16">
					What's your date of birth
				</ThemeText>
				<Pressable onPress={() => setOpenDatePicker(true)}>
					<View pointerEvents="none">
						<TextInput
							placeholder="Date of Birth"
							value={
								currentDob
									? moment(new Date(currentDob))?.format('MM / D / YYYY')
									: ''
							}
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
			{openDatePicker && (
				<DateTimePicker
					value={currentDob}
					mode="date"
					display={Platform.OS === 'ios' ? 'spinner' : 'default'}
					is24Hour
					themeVariant="light"
					onChange={onSelectDateOfBirth}
					locale="en-US"
					maximumDate={new Date()}
					minimumDate={new Date('1920-01-01')}
					// dateFormat="shortdate"
				/>
			)}
		</View>
	);
};

export default DOBPRogress;
