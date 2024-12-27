import { Modal, Pressable, View } from 'react-native';
import { ThemeText } from '../ThemeText/ThemeText';
import ThemeModal from '../Modal/Modal';
import Underline from '../Underline/Underline';

export type MenuProp = {
	title?: string;
	message: string;
	handleOk: () => void;
	handleCancel?: () => void;
	hasCancel?: boolean;
	confirmBtnText?: string;
	cancelBtnText?: string;
	type: 'error' | 'success' | 'info';
};

const CustomAlert = ({
	title,
	message,
	cancelBtnText,
	handleOk,
	hasCancel,
	handleCancel,
	confirmBtnText,
	type,
}: MenuProp) => {
	return (
		// <ThemeModal
		// 	openThemeModal={isVisible}
		// 	parentPaddingEnabled={false}
		// 	containerStyle={{ marginHorizontal: 36 }}
		// 	modalPositionStyle={{
		// 		flex: 1,
		// 		justifyContent: 'center',
		// 		alignItems: 'center',
		// 	}}
		// 	hasNotch={false}
		// >
		<>
			<Modal transparent={true}>
				<Pressable
					className="absolute top-0 bottom-0 left-0 right-0"
					onPress={handleCancel}
				>
					<View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-30"></View>
					<View className="flex-1 justify-center items-center">
						<View className="bg-patchwork-dark-50 rounded-lg pt-5 w-[250] shadow-sm">
							<View className="px-8 pb-5">
								{title && (
									<ThemeText
										variant={type === 'error' ? 'textOrange' : 'default'}
										size={'lg_18'}
										className="font-SourceSans3_Bold mb-3"
									>
										{title}
									</ThemeText>
								)}
								<ThemeText className="text-center" size={'md_16'}>
									{message}
								</ThemeText>
							</View>
							<Underline />
							<View className="flex-row items-center justify-around my-3">
								<ThemeText
									className="flex-1 text-center"
									variant={'textOrange'}
									onPress={handleOk}
									size={'fs_15'}
								>
									{confirmBtnText || 'OK'}
								</ThemeText>
								{hasCancel && (
									<ThemeText
										className="flex-1 text-center"
										onPress={handleCancel}
										size={'fs_15'}
									>
										{cancelBtnText || 'CANCEL'}
									</ThemeText>
								)}
							</View>
						</View>
					</View>
				</Pressable>
			</Modal>
		</>
		// </ThemeModal>
	);
};

export default CustomAlert;
