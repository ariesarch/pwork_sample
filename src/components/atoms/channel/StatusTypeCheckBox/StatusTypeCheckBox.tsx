import { View } from 'react-native';
import Checkbox from '../../common/Checkbox/Checkbox';
import { ThemeText } from '../../common/ThemeText/ThemeText';

type Props = {
	title: string;
};

const StatusTypeCheckBox = ({ title }: Props) => {
	return (
		<View className="p-4 mt-3 rounded-sm border border-slate-200">
			<Checkbox>
				<ThemeText className="ml-2">{title}</ThemeText>
			</Checkbox>
		</View>
	);
};

export default StatusTypeCheckBox;
