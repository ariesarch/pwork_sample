import Image from '@/components/atoms/common/Image/Image';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { RootStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable, View, ViewProps } from 'react-native';

type Props = {
	account: Pathchwork.Account;
	size: number;
	dotAlert?: boolean;
} & ViewProps;

const AccountAvatar = ({
	account,
	size,
	dotAlert = false,
	...props
}: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	return (
		<Pressable
			className="flex flex-row"
			{...props}
			onPress={() => {
				navigation.navigate('Profile');
			}}
		>
			<View className="items-center ">
				<Image uri={account.avatar} className="w-[100] h-[100] rounded-full" />
				<ThemeText className="mt-2">{account.username}</ThemeText>
				{dotAlert && (
					<View className="absolute border-2 border-white dark:border-patchwork-dark-100 bg-patchwork-red-50 top-[4] right-[12] w-[13] h-[13] rounded-full" />
				)}
			</View>
		</Pressable>
	);
};

export default AccountAvatar;
