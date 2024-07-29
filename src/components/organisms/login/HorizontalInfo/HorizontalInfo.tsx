import Avatar from '@/components/atoms/profile/Avatar';
import { View } from 'react-native';
import VerticalInfo from '@/components/molecules/profile/VerticalInfo/VerticalInfo';
import Chip from '@/components/atoms/common/Chip/Chip';
import { CheckIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';

const HorizontalInfo = () => {
	const { colorScheme } = useColorScheme();

	return (
		<View className="flex-row items-center">
			<View className="flex-row items-center flex-1">
				<View className="">
					<Avatar
						src={require('../../../../../assets/images/mock/profile/profile_img.jpeg')}
						className="rounded-full w-[60] h-[60] border-patchwork-dark-100 border-[2.56px]"
					/>
				</View>
				<View className="-ml-1">
					<VerticalInfo
						accountName="Account name"
						username="iwashere"
						profileInfo="Some description subtitle goes here if any added"
					/>
				</View>
			</View>
			<Chip
				title="Following"
				variant="outline"
				endIcon={<CheckIcon {...{ colorScheme }} />}
				className="mb-9"
			/>
		</View>
	);
};

export default HorizontalInfo;
