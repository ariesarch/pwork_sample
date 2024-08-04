import Avatar from '@/components/atoms/profile/Avatar';
import { View, StyleSheet } from 'react-native';
import Chip from '@/components/atoms/common/Chip/Chip';
import { CheckIcon } from '@/util/svg/icon.common';
import { useColorScheme } from 'nativewind';
import VerticalInfo from '@/components/molecules/common/VerticalInfo/VerticalInfo';

const HorizontalInfo = () => {
	const { colorScheme } = useColorScheme();

	return (
		<View className="flex-row items-center">
			<Avatar
				src={require('../../../../../assets/images/mock/profile/profile_img.jpeg')}
				className="rounded-full w-[60] h-[60] border-patchwork-dark-100 border-[2.56px]"
			/>
			<View className="flex-1">
				<VerticalInfo
					accountName="Account name"
					acctNameTextStyle="text-[15px] w-1/2"
					username="iwashere"
					userBio="Some description subtitle goes here if any added"
					userBioTextStyle="text-[13px] opacity-80"
				/>
			</View>
			<Chip
				title="Following"
				variant="outline"
				endIcon={<CheckIcon {...{ colorScheme }} />}
				className="absolute top-0 right-0 "
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		backgroundColor: '#14171A',
		borderRadius: 10,
	},
	profileImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	textContainer: {
		flex: 1,
		// marginRight: 10,
	},
	accountName: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 16,
		width: '50%',
	},
	username: {
		color: '#8899a6',
		fontSize: 14,
	},
	description: {
		color: '#8899a6',
		fontSize: 13,
	},
	followButton: {
		position: 'absolute',
		right: 10,
		top: 20,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1DA1F2',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 20,
	},
	followButtonText: {
		color: '#ffffff',
		fontSize: 14,
		fontWeight: 'bold',
	},
	checkmarkContainer: {
		marginLeft: 5,
	},
	checkmark: {
		color: '#ffffff',
		fontSize: 14,
	},
});
export default HorizontalInfo;
