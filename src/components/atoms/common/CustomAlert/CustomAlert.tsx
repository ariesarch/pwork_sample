import { View } from 'react-native';
import { ThemeText } from '../ThemeText/ThemeText';
import ThemeModal from '../Modal/Modal';
import Underline from '../Underline/Underline';
import { ClassValue } from 'clsx';
import { cn } from '@/util/helper/twutil';

export type MenuProp = {
	title?: string;
	message: string;
	handleOk: () => void;
	handleCancel?: () => void;
	hasCancel?: boolean;
	confirmBtnText?: string;
	cancelBtnText?: string;
	extraTitleStyle?: ClassValue;
	extraOkBtnStyle?: ClassValue;
	extraCancelBtnStyle?: ClassValue;
	isVisible: boolean;
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
	extraTitleStyle,
	extraOkBtnStyle,
	extraCancelBtnStyle,
	isVisible,
	type,
}: MenuProp) => {
	return (
		<ThemeModal
			openThemeModal={isVisible}
			parentPaddingEnabled={false}
			containerStyle={{ marginHorizontal: 36 }}
			modalPositionStyle={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
			hasNotch={false}
		>
			<>
				<View className="px-8 pb-5 min-w-[250]">
					{title && (
						<ThemeText
							variant={type === 'error' ? 'textOrange' : 'default'}
							size={'lg_18'}
							className={cn(
								'font-SourceSans3_Bold mb-3 text-center',
								extraTitleStyle,
							)}
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
						variant={'textOrange'}
						className={cn(
							'flex-1 text-center active:opacity-80',
							extraOkBtnStyle,
						)}
						onPress={handleOk}
						size={'fs_15'}
					>
						{confirmBtnText || 'Ok'}
					</ThemeText>
					{hasCancel && (
						<ThemeText
							className={cn(
								'flex-1 text-center active:opacity-80',
								extraCancelBtnStyle,
							)}
							onPress={handleCancel}
							size={'fs_15'}
						>
							{cancelBtnText || 'Cancel'}
						</ThemeText>
					)}
				</View>
			</>
		</ThemeModal>
	);
};

export default CustomAlert;
