import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { cn } from '@/util/helper/twutil';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import moment from 'moment';
import { useColorScheme } from 'nativewind';
import { VerifyIcon } from '@/util/svg/icon.conversations';
import { appendInstance } from '@/util/helper/appendInstance';

type Props = {
	userInfo: Pathchwork.Account;
};

const ProfileInfo = ({ userInfo }: Props) => {
	const { colorScheme } = useColorScheme();

	return (
		<View className="-mt-3 mb-4">
			{/* <FastImage
				className="w-full h-28 rounded-b-md"
				source={{ uri: userInfo?.header_static }}
				resizeMode={FastImage.resizeMode.cover}
			/> */}
			<View className="w-full h-28"></View>
			<FastImage
				className={cn(
					'w-[80] h-[80] mt-[-50] bg-patchwork-grey-50  border-patchwork-grey-50 border-2 rounded-full mx-auto',
				)}
				source={{ uri: userInfo?.avatar }}
				resizeMode={FastImage.resizeMode.contain}
			/>
			<View className="mx-auto items-center px-5">
				<View className="flex-row my-3 items-center mb-0">
					<ThemeText className="font-bold text-lg mr-3">
						{userInfo?.display_name}
					</ThemeText>
					<VerifyIcon colorScheme={colorScheme} />
				</View>
				<View className="flex-row items-center mb-1 flex-wrap justify-center">
					<ThemeText>{appendInstance(`@${userInfo?.acct}`)}</ThemeText>
					<ThemeText className="text-2xl align-middle mx-2">▸</ThemeText>
					<ThemeText className="">
						Joined on {moment(userInfo?.created_at).format('MM YYYY')}
					</ThemeText>
				</View>
				{/* <Pressable
					onPress={() => {}}
					className="border-[1] border-[1px] border-patchwork-grey-100 py-[6] px-3 rounded-full"
				>
					<ThemeText>Follow</ThemeText>
				</Pressable> */}
			</View>
		</View>
	);
};

export default ProfileInfo;

const styles = StyleSheet.create({});
