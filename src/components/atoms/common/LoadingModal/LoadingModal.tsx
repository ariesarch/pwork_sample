import customColor from '@/util/constant/color';
import React from 'react';
import { View, ActivityIndicator, Text, Modal } from 'react-native';

interface LoadingModalProps {
	isVisible: boolean;
	message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible, message }) => {
	return (
		<Modal transparent visible={isVisible} animationType="fade">
			<View className="flex-1 bg-black/50 justify-center items-center">
				<View className=" px-6 py-4 rounded-lg items-center">
					<ActivityIndicator
						size="large"
						color={customColor['patchwork-red-600']}
					/>
					{message && (
						<Text className="text-lg font-medium text-white mt-4">
							{message}
						</Text>
					)}
				</View>
			</View>
		</Modal>
	);
};

export default LoadingModal;
