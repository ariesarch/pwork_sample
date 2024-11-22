import Image from '@/components/atoms/common/Image/Image';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { RootStackParamList } from '@/types/navigation';
import { cn } from '@/util/helper/twutil';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable, View, ViewProps } from 'react-native';

type Props = {
	account: Pathchwork.Account;
	size?: 'md' | 'lg';
	dotAlert?: boolean;
} & ViewProps;

const sizeMapping = {
	md: 'w-[100] h-[100]',
	lg: 'w-[149] h-[149]',
};

const AccountAvatar = ({
	account,
	size = 'md',
	dotAlert = false,
	...props
}: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	return (
		<Pressable className="flex flex-row" {...props} onPress={() => {}}>
			<View className="items-center ">
				<Image
					uri={account.avatar}
					className={cn('rounded-full', sizeMapping[size])}
				/>
				<ThemeText className="mt-2">{account.username}</ThemeText>
				{dotAlert && (
					<View
						className={cn(
							'absolute border-2 border-white dark:border-patchwork-dark-100 bg-patchwork-red-50 w-[13] h-[13] rounded-full',
							size == 'md' ? 'top-[4] right-[12]' : 'top-[8] right-[25]',
						)}
					/>
				)}
			</View>
		</Pressable>
	);
};

export default AccountAvatar;
