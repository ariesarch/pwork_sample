import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { SwitchOffIcon, SwitchOnIcon } from '@/util/svg/icon.common';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { View, Pressable } from 'react-native';

interface ReportContentWithCommentProps {
	control: Control<
		{
			comment: string;
			forward?: boolean | undefined;
		},
		any
	>;
	isOtherServerUser: boolean;
	otherServerUserDomain: string;
}
const ReportContentWithComment = ({
	control,
	isOtherServerUser,
	otherServerUserDomain,
}: ReportContentWithCommentProps) => {
	return (
		<View>
			<View className="my-4 ">
				<Controller
					control={control}
					name="comment"
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								placeholder={'Additional comments'}
								multiline
								maxLength={4000}
								textArea
								value={value}
								onChangeText={value => onChange(value)}
								autoCapitalize="none"
								spellCheck
								className="text-white leading-6 font-SourceSans3_Regular opacity-80"
							/>
						</>
					)}
				/>
			</View>
			{isOtherServerUser && (
				<View>
					<ThemeText size={'md_16'}>
						The account is from another server. Send an anonymized copy of the
						report there as well?
					</ThemeText>

					<View className="flex-row items-center mt-3">
						<Controller
							control={control}
							name="forward"
							render={({ field: { onChange, value } }) => (
								<>
									<Pressable
										onPress={() => {
											onChange(!value);
										}}
									>
										{value ? <SwitchOnIcon /> : <SwitchOffIcon />}
									</Pressable>
								</>
							)}
						/>
						<ThemeText
							size={'md_16'}
							className="ml-2"
						>{`Forward to ${otherServerUserDomain}`}</ThemeText>
					</View>
				</View>
			)}
		</View>
	);
};

export default ReportContentWithComment;
