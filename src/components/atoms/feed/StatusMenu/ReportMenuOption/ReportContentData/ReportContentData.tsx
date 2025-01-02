import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Underline from '@/components/atoms/common/Underline/Underline';
import { reportContentData } from '@/util/constant/reportItem';
import {
	PollRadioCheckedIcon,
	PollRadioOutlined,
} from '@/util/svg/icon.common';
import React from 'react';
import { View, FlatList, Pressable } from 'react-native';

const ReportContentData = ({
	selectedCategory,
	handleCategoryChange,
}: {
	selectedCategory: string;
	handleCategoryChange: (category: string) => void;
}) => {
	return (
		<View className="mt-3">
			<ThemeText size={'md_16'} className="opacity-80">
				Choose the best match
			</ThemeText>
			<FlatList
				data={reportContentData}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => (
					<Underline className="dark:border-patchwork-grey-400" />
				)}
				renderItem={({ item }) => (
					<Pressable
						key={item.category}
						className="flex-row items-center py-3"
						onPress={() => handleCategoryChange(item.category)}
					>
						<View>
							{item.category === selectedCategory ? (
								<PollRadioCheckedIcon />
							) : (
								<PollRadioOutlined />
							)}
						</View>
						<View className="ml-3">
							<ThemeText size={'lg_18'} className="font-SourceSans3_Medium">
								{item.title}
							</ThemeText>
							<ThemeText className="opacity-70">{item.desc}</ThemeText>
						</View>
					</Pressable>
				)}
			/>
		</View>
	);
};

export default ReportContentData;
