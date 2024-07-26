import { View } from 'react-native';
import AccountName from '@/components/atoms/profile/AccountName';
import Bio from '@/components/atoms/profile/Bio';
import UserName from '@/components/atoms/profile/UserName';

type VerticalInfoProps = {
	accountName: string;
	username: string;
	joinedDate?: string;
	profileInfo: string;
};

const VerticalInfo = ({
	accountName,
	username,
	joinedDate = '',
	profileInfo,
}: VerticalInfoProps) => {
	return (
		<View className="flex-col px-4 pt-4">
			{/* <Avatar
                src={avatarSrc}
                className="-mt-10 rounded-full w-20 h-20 border-patchwork-dark-100 border-[2.56px]"
            /> */}
			<AccountName name={accountName} />
			<UserName username={username} joinedDate={joinedDate} />
			<Bio info={profileInfo} />
		</View>
	);
};

export default VerticalInfo;
