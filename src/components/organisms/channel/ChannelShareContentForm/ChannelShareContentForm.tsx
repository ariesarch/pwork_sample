import { View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import InputFieldName from '@/components/atoms/common/InputFieldName/InputFieldName';
import TextInput from '@/components/atoms/common/TextInput/TextInput';

const ChannelShareContentForm = () => {
	return (
		<View>
			<ThemeText className="font-semibold" size="md_16">
				Share content
			</ThemeText>
			<ThemeText variant="textGrey">
				Lorem ipsum dolor sit amet consectetur. Fermentum ac proin sed elementum
				erat.
			</ThemeText>
			<View className="border border-slate-300 dark:border-gray-600 p-4 my-8">
				<InputFieldName title="Add post hashtags" />
				<ThemeText variant="textGrey" size="fs_13" className="mb-2">
					Add up to three hashtags which will be added to posts made from this
					channel.
				</ThemeText>
				<InputFieldName title="Hashtag" isRequired className="mt-2" />
				<TextInput
					startIcon={<ThemeText>#</ThemeText>}
					extraContainerStyle="mt-3 pl-6"
				/>
				<TextInput
					startIcon={<ThemeText>#</ThemeText>}
					extraContainerStyle="mt-3 pl-6"
				/>
				<TextInput
					startIcon={<ThemeText>#</ThemeText>}
					extraContainerStyle="mt-3 pl-6"
				/>
			</View>
		</View>
	);
};

export default ChannelShareContentForm;
