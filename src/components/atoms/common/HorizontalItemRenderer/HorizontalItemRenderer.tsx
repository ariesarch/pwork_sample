import { View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

type Props<T> = {
	data: T[];
	renderItem: (item: T) => React.ReactElement;
};

const HorizontalItemRenderer = <T,>({ data, renderItem }: Props<T>) => {
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{data.map((item, idx) => (
				<View key={idx}>{renderItem(item)}</View>
			))}
		</ScrollView>
	);
};

export default HorizontalItemRenderer;
