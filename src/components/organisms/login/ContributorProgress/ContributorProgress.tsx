import { Avatar } from '@/components/atoms';
import { ActionButtons, VerticalInfo } from '@/components/molecules';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { View } from 'react-native';
import HorizontalInfo from '../HorizontalInfo/HorizontalInfo';

type ContributorProgressProps = {
	avatarSrc: string;
	accountName: string;
	username: string;
	joinedDate: string;
	profileInfo: string;
};

const ContributorProgress = ({
	avatarSrc,
	accountName,
	username,
	joinedDate,
	profileInfo,
}: ContributorProgressProps) => {
	return (
		<View>
			<View className="mb-10">
				<ThemeText>
					We’ve pre-selected the best contributors to follow based on your
					chosen interests.
				</ThemeText>
			</View>
			<View className="flex flex-row">
				<HorizontalInfo
					avatarSrc={require('@/assets/images/profile/profile_img.jpeg')}
					accountName="Account name"
					username="iwashere"
					joinedDate="Dec 2022"
					profileInfo="Some description subtitle goes here if any added."
				/>
				<ActionButtons />
			</View>
			<View className="flex flex-row">
				<HorizontalInfo
					avatarSrc={require('@/assets/images/profile/profile_img.jpeg')}
					accountName="Account name"
					username="iwashere"
					joinedDate="Dec 2022"
					profileInfo="Some description subtitle goes here if any added."
				/>
				<ActionButtons />
			</View>
			<View className="flex flex-row">
				<HorizontalInfo
					avatarSrc={require('@/assets/images/profile/profile_img.jpeg')}
					accountName="Account name"
					username="iwashere"
					joinedDate="Dec 2022"
					profileInfo="Some description subtitle goes here if any added."
				/>
				<ActionButtons />
			</View>
			<View className="flex flex-row">
				<HorizontalInfo
					avatarSrc={require('@/assets/images/profile/profile_img.jpeg')}
					accountName="Account name"
					username="iwashere"
					joinedDate="Dec 2022"
					profileInfo="Some description subtitle goes here if any added."
				/>
				<ActionButtons />
			</View>
		</View>
	);
};

export default ContributorProgress;
