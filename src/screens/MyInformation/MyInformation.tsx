import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import MyInfoItem from '@/components/atoms/muteblock/MyInfoItem/MyInfoItem';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useAuthStore } from '@/store/auth/authStore';
import { PhoneIcon, ProfileEmailIcon } from '@/util/svg/icon.common';
import { View } from 'react-native';

const MyInformation = () => {
	const { userInfo } = useAuthStore();
	console.log('userInfo::', userInfo);

	return (
		<SafeScreen>
			<Header title="My Information" leftCustomComponent={<BackButton />} />
			<View>
				<MyInfoItem
					label="Email"
					value={userInfo?.email}
					icon={<ProfileEmailIcon />}
				/>
				<MyInfoItem
					label="Phone Number"
					value={userInfo?.phone}
					icon={<PhoneIcon />}
				/>
			</View>
		</SafeScreen>
	);
};

export default MyInformation;
