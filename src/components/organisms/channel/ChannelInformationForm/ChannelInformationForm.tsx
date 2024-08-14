import { Button } from '@/components/atoms/common/Button/Button';
import InputFieldName from '@/components/atoms/common/InputFieldName/InputFieldName';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { DownIcon, UpalodImageIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import { View, Image, TouchableOpacity, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ChannelInformationForm = () => {
	const { colorScheme } = useColorScheme();
	return (
		<View>
			<ThemeText size="md_16" className="mb-1 font-bold">
				Channel Information
			</ThemeText>
			<ThemeText variant="textGrey">
				Fill out the basic details for your channel.
			</ThemeText>
			<View className="flex-row items-center">
				<View className="flex-1">
					<ThemeText className="mt-7 font-bold">Avatar</ThemeText>
					<ThemeText size="xs_12" variant="textGrey" className="mt-1">
						SVG, PNG, JPG (max:800x800px)
					</ThemeText>
					<View className="flex-row mt-3">
						<Button variant="outline" className="rounded-3xl mr-3">
							<ThemeText size="xs_12">Change</ThemeText>
						</Button>
						<Button variant="outline" className="rounded-3xl">
							<ThemeText size="xs_12">Remove</ThemeText>
						</Button>
					</View>
				</View>
				<View>
					<TouchableOpacity
						className="w-[80] h-[80] rounded-full bg-patchwork-dark-50"
						onPress={() => {}}
					/>
				</View>
			</View>
			<View className="my-5">
				<InputFieldName title="Username" isRequired />
				<TextInput startIcon={<ThemeText>/</ThemeText>} styleNW="pl-6" />
			</View>
			<View className="mb-5">
				<InputFieldName title="Collection" isRequired />
				<Pressable onPress={() => {}}>
					<View pointerEvents="none">
						<TextInput
							endIcon={
								<DownIcon colorScheme={colorScheme} className="mt-1 mr-2" />
							}
							placeholder="Choose a collection"
						/>
					</View>
				</Pressable>
			</View>
			<View className="mb-5">
				<InputFieldName title="Bio" />
				<TextInput textArea placeholder="Enter Channel Bio" numberOfLines={3} />
			</View>
			<View className="mb-5">
				<InputFieldName title="Banner Image" />
				<TouchableOpacity activeOpacity={0.8}>
					<View className="border-dashed border border-gray-500 px-11 py-4 items-center">
						<UpalodImageIcon colorScheme={colorScheme} />
						<ThemeText className="mx-3 my-1">
							Tap here to upload a file
						</ThemeText>
						<ThemeText variant="textGrey" size={'xs_12'}>
							1080 * 300 recommeded dimesions, up to 5 MB
						</ThemeText>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ChannelInformationForm;
