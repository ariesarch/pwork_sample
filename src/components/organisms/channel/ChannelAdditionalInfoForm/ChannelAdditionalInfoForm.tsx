import ChannelAdditionalInformation from '@/components/atoms/channel/ChannelAdditionalInformation/ChannelAdditionalInformation';
import ChannelRuleCircle from '@/components/atoms/channel/ChannelRuleCircle/ChannelRuleCircle';
import { Button } from '@/components/atoms/common/Button/Button';
import InputFieldName from '@/components/atoms/common/InputFieldName/InputFieldName';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { View } from 'react-native';

const ChannelAdditionalInfoForm = () => {
	return (
		<View>
			<ThemeText className="font-semibold" size="md_16">
				Additional channel information
			</ThemeText>
			<ThemeText variant="textGrey" className="mt-1">
				Lorem ipsum dolor sit amet consectetur. Fermentum ac proin sed elementum
				erat.
			</ThemeText>
			<View className="border border-slate-300 dark:border-gray-600 p-4 my-8">
				<InputFieldName title="Channel rules" />

				<View className="flex-row items-center flex-1">
					<ChannelRuleCircle count={1} className="mr-3" />
					<View className="flex-1">
						<TextInput
							extraInputStyle="w-fill"
							extraContainerStyle="w-fill"
							placeholder="This is some text for a channel rule"
						/>
					</View>
				</View>
				<View className="flex-row items-center mt-3">
					<ChannelRuleCircle count={1} className="mr-3" />
					<View className="flex-1">
						<TextInput placeholder="Enter rule text here" />
					</View>
				</View>
				<Button variant="outline" className="rounded-3xl mt-5" size="xl">
					<ThemeText>Add another</ThemeText>
				</Button>
			</View>
			<View className="border border-slate-300 dark:border-gray-600 p-4 my-8">
				<InputFieldName title="Additional Information" />
				<ChannelAdditionalInformation />
			</View>
		</View>
	);
};

export default ChannelAdditionalInfoForm;
