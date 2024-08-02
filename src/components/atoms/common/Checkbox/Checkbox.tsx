import { CheckboxOutlined, CheckboxSolid } from '@/util/svg/icon.common';
import { useState } from 'react';
import { Pressable, View, ViewProps } from 'react-native';

type Props = {
	children: React.ReactElement;
} & ViewProps;
const Checkbox = ({ children, ...props }: Props) => {
	const [isChecked, setIsChecked] = useState(false);

	return (
		<View>
			<Pressable
				onPress={() => setIsChecked(!isChecked)}
				className="flex flex-row items-center"
			>
				{isChecked ? <CheckboxSolid /> : <CheckboxOutlined />}
				{children}
			</Pressable>
		</View>
	);
};

export default Checkbox;
