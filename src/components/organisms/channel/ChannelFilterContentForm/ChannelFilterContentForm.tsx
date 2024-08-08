import { View } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import InputFieldName from '@/components/atoms/common/InputFieldName/InputFieldName';
import StatusTypeCheckBox from '@/components/atoms/channel/StatusTypeCheckBox/StatusTypeCheckBox';
import Underline from '@/components/atoms/common/Underline/Underline';
import Keyword from '@/components/atoms/common/Keyword/Keyword';
import { Button } from '@/components/atoms/common/Button/Button';
import HorizontalItemRenderer from '@/components/atoms/common/HorizontalItemRenderer/HorizontalItemRenderer';
import { mockUserList } from '@/mock/feed/statusList';
import ContributorProfile from '@/components/molecules/channel/ContributorProfile/ContributorProfile';

const ChannelFilterContentForm = () => {
	return (
		<View>
			<ThemeText className="font-semibold" size="md_16">
				Filter content
			</ThemeText>
			<ThemeText variant="textGrey">
				Lorem ipsum dolor sit amet consectetur. Fermentum ac proin sed elementum
				erat.
			</ThemeText>
			<View className="border border-slate-300 dark:border-gray-600 p-4 my-8">
				<InputFieldName title="Type of posts" />
				<ThemeText variant="textGrey" size="fs_13" className="mb-2">
					This selection will determine the type of content displayed within
					this channel.
				</ThemeText>
				<StatusTypeCheckBox title="Posts" />
				<StatusTypeCheckBox title="Reposts" />
				<StatusTypeCheckBox title="Replies" />
			</View>
			<View className="border border-slate-300 dark:border-gray-600 p-4 mb-8">
				<InputFieldName title="Keyword filtering" />
				<ThemeText variant="textGrey" size="fs_13" className="mb-2">
					Lorem ipsum dolor sit amet consectetur. Fermentum ac proin sed
					elementum erat.
				</ThemeText>
				<Underline className="mt-1" />
				<Keyword />
				<Underline className="mt-1" />
				<Keyword />
				<Underline className="mt-1" />
				<Keyword />
				<Underline className="mt-1" />
				<Button variant="outline" className="rounded-3xl mt-5" size="xl">
					<ThemeText>Add new keyword</ThemeText>
				</Button>
			</View>
			<View className="border border-slate-300 dark:border-gray-600 p-4 mb-8">
				<InputFieldName title="Muted contributors (5)" />
				<HorizontalItemRenderer
					data={mockUserList}
					renderItem={item => (
						<ContributorProfile account={item} className="mr-4" />
					)}
				/>
				<Button variant="outline" className="rounded-3xl mt-5" size="xl">
					<ThemeText>Search For Contributors</ThemeText>
				</Button>
			</View>
		</View>
	);
};

export default ChannelFilterContentForm;
