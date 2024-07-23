import { CheckboxOutlined, CheckboxSolid } from '@/util/svg/icon.common';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

type Props = {
	children: React.ReactElement;
};
const Checkbox = ({ children }: Props) => {
	const [isChecked, setIsChecked] = useState(false);

	return (
		<View>
			<Pressable
				onPress={() => setIsChecked(!isChecked)}
				className="flex flex-row"
			>
				{isChecked ? <CheckboxSolid /> : <CheckboxOutlined />}
				{children}
			</Pressable>
		</View>
	);
};

export default Checkbox;
