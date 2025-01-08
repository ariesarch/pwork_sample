import { AccountListIcon } from '@/util/svg/icon.common';
import { View, ViewProps } from 'react-native';
import { ThemeText } from '../ThemeText/ThemeText';

type Props = {
	title?: string;
	subtitle?: string;
} & ViewProps;

const ListEmptyComponent = ({ title, subtitle, ...props }: Props) => {
	return (
		<View className="flex items-center justify-center mt-20" {...props}>
			<AccountListIcon />
			<ThemeText className="font-SourceSans3_Bold mt-2">
				{title ?? 'No Status Found'}
			</ThemeText>
			{subtitle && (
				<ThemeText
					style={{ maxWidth: '65%' }}
					className="text-center mt-2 text-gray-400"
				>
					{subtitle}
				</ThemeText>
			)}
		</View>
	);
};

export default ListEmptyComponent;
