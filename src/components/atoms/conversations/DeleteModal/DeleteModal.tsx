import React from 'react';
import { View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import ThemeModal from '../../common/Modal/Modal';
import Underline from '../../common/Underline/Underline';

interface Props {
	visibile: boolean;
	onPressCancel: () => void;
	onPressDelete: () => void;
}
const DeleteModal = ({ visibile, onPressCancel, onPressDelete }: Props) => {
	return (
		<ThemeModal
			openThemeModal={visibile}
			parentPaddingEnabled={false}
			containerStyle={{ marginHorizontal: 36 }}
			modalPositionStyle={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
			hasNotch={false}
		>
			<View>
				<View className="px-6 pb-3">
					<ThemeText
						className="font-SourceSans3_Bold text-center"
						size={'md_16'}
					>
						Are you sure you want to delete this conversation?
					</ThemeText>
				</View>
				<Underline />
				<View className="flex-row items-center justify-around my-3">
					<ThemeText onPress={onPressDelete} size={'fs_15'}>
						Delete
					</ThemeText>
					<ThemeText
						onPress={onPressCancel}
						size={'fs_15'}
						variant={'textOrange'}
					>
						Cancel
					</ThemeText>
				</View>
			</View>
		</ThemeModal>
	);
};

export default DeleteModal;
