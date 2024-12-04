import React from 'react';
import { View } from 'react-native';
import ThemeModal from '../Modal/Modal';
import { ThemeText } from '../ThemeText/ThemeText';
import Underline from '../Underline/Underline';

interface StatusDeleteModalProps {
	openDeleteModal: boolean;
	onPressHideDeleteModal: () => void;
	handleDeleteStatus: () => void;
}
const StatusDeleteModal = ({
	openDeleteModal,
	onPressHideDeleteModal,
	handleDeleteStatus,
}: StatusDeleteModalProps) => {
	return (
		<ThemeModal
			openThemeModal={openDeleteModal}
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
				<View className="px-6">
					<ThemeText
						className="font-SourceSans3_Bold text-center"
						size={'md_16'}
					>
						Are you sure you want to delete post?
					</ThemeText>
					<ThemeText className="text-center mt-1 mb-4 px-8" size={'fs_15'}>
						All the comments, re-posts and likes will be lost
					</ThemeText>
				</View>
				<Underline />
				<View className="flex-row items-center justify-around my-3">
					<ThemeText onPress={handleDeleteStatus} size={'md_16'}>
						Delete this Post
					</ThemeText>
					<ThemeText
						onPress={onPressHideDeleteModal}
						size={'md_16'}
						variant={'textOrange'}
					>
						Cancel
					</ThemeText>
				</View>
			</View>
		</ThemeModal>
	);
};

export default StatusDeleteModal;
