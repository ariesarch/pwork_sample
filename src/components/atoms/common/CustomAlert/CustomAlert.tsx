import { Modal, Platform, Pressable, Text, View } from 'react-native';
import { ThemeText } from '../ThemeText/ThemeText';
import { cn } from '@/util/helper/twutil';

export type MenuProp = {
	title: string;
	message: string;
	handleOk: () => void;
	handleCancel: () => void;
	hasCancel?: boolean;
	confirmBtnText?: string;
	cancelBtnText?: string;
};

const CustomAlert = ({
	title,
	message,
	cancelBtnText,
	handleOk,
	hasCancel,
	handleCancel,
	confirmBtnText,
}: MenuProp) => {
	return (
		<>
			<Modal transparent={true}>
				<Pressable
					className="absolute top-0 bottom-0 left-0 right-0"
					onPress={() => handleCancel()}
				>
					<View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-30"></View>
					<View className="flex-1 justify-center items-center">
						<View className="bg-white rounded-lg pt-5 w-[250] shadow-sm">
							{title && (
								<View className="items-center">
									<ThemeText className="text-lg font-bold text-black">
										{title}
									</ThemeText>
								</View>
							)}
							<View className="pt-1 pb-4 px-5">
								<ThemeText className="text-center text-black ">
									{message}
								</ThemeText>
							</View>
							<View className="flex-row justify-between">
								{hasCancel && (
									<Pressable
										onPress={() => handleCancel()}
										className="w-1/2 mt-3 py-3 items-center border-t border-t-gray-300 border-r border-r-gray-300 rounded-bl-lg active:bg-red-50"
									>
										<ThemeText className="text-red-500">
											{cancelBtnText ?? 'Cancel'}
										</ThemeText>
									</Pressable>
								)}
								<Pressable
									onPress={handleOk}
									className={cn(
										'w-1/2 mt-3 py-3 items-center rounded-br-lg border-t border-t-gray-300 active:bg-green-50',
										!hasCancel && 'w-full rounded-b-lg',
									)}
								>
									<ThemeText className="text-green-500">
										{confirmBtnText ?? 'OK'}
									</ThemeText>
								</Pressable>
							</View>
						</View>
					</View>
				</Pressable>
			</Modal>
		</>
	);
};

export default CustomAlert;
