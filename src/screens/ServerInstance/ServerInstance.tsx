import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { Button } from '@/components/atoms/common/Button/Button';
import Header from '@/components/atoms/common/Header/Header';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { ServerInstanceLoading } from '@/components/atoms/loading/ServerInstanceLoading';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import useDebounce from '@/hooks/custom/useDebounce';
import { useRequestPermissionToInstanceMutation } from '@/hooks/mutations/auth.mutation';
import { useSearchServerInstance } from '@/hooks/queries/auth.queries';
import { GuestStackScreenProps } from '@/types/navigation';
import { formatNumber } from '@/util/helper/helper';
import { SearchIcon } from '@/util/svg/icon.common';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const ServerInstance: React.FC<
	GuestStackScreenProps<'ServerInstance'>
> = ({ navigation }) => {
	const [typedDomainName, setTypedDomainName] = useState('');
	const [finalKeyword, setFinalKeyword] = useState('');
	const startDebounce = useDebounce();
	const { data: searchInstanceRes, isFetching: isSearching } =
		useSearchServerInstance({
			domain: finalKeyword,
			enabled: finalKeyword.length > 0,
		});

	const { mutate, isPending } = useRequestPermissionToInstanceMutation({
		onSuccess: res => {
			const queryParams = new URLSearchParams({
				client_id: res.client_id,
				client_secret: res.client_secret,
				response_type: 'code',
				redirect_uri: 'patchwork://',
				scope: 'write read follow push',
			});
			const url = `https://${finalKeyword}/oauth/authorize?${queryParams.toString()}`;
			navigation.navigate('MastodonSignInWebView', {
				url,
				domain: finalKeyword,
				client_id: res.client_id,
				client_secret: res.client_secret,
			});
		},
	});

	useEffect(() => {
		startDebounce(() => {
			setFinalKeyword(typedDomainName);
		}, 800);
	}, [typedDomainName]);

	const onPressLogin = () => {
		if (searchInstanceRes && !isPending) {
			mutate({ domain: searchInstanceRes.domain });
		}
	};

	return (
		<SafeScreen>
			<Header hideUnderline title="" leftCustomComponent={<BackButton />} />
			<KeyboardAwareScrollView className="mx-6">
				<ThemeText className="font-SourceSans3_Bold text-2xl mb-2">
					Welcome Back
				</ThemeText>
				<ThemeText className="mb-4 text-md">
					Login with the server where you created your account
				</ThemeText>
				<TextInput
					placeholder="Enter your server"
					value={typedDomainName}
					maxLength={40}
					onChangeText={str => setTypedDomainName(str)}
					startIcon={<SearchIcon className="mt-[2]" />}
					autoCapitalize="none"
				/>
				{typedDomainName.length > 0 && (
					<>
						{!isSearching && searchInstanceRes && (
							<View className="mt-5 rounded-md border border-gray-500">
								<FastImage
									className="w-full h-[200] rounded-tl-md rounded-tr-md"
									source={{
										uri: searchInstanceRes.contact.account.avatar,
										priority: FastImage.priority.high,
										cache: FastImage.cacheControl.immutable,
									}}
									resizeMode={'cover'}
								/>
								<View className="m-4">
									<ThemeText className="mb-2">
										{searchInstanceRes.title} - {searchInstanceRes.domain}{' '}
									</ThemeText>
									<ThemeText className="mb-2">
										{searchInstanceRes.description}
									</ThemeText>
									<ThemeText>
										Monthly User -{' '}
										{formatNumber(searchInstanceRes.usage.users.active_month)}
									</ThemeText>
									<Button
										onPress={onPressLogin}
										className="my-3"
										variant="outline"
									>
										{isPending ? (
											<Flow size={15} color="#fff" />
										) : (
											<ThemeText className="text-white">Login</ThemeText>
										)}
									</Button>
								</View>
							</View>
						)}
						{isSearching && (
							<View className="mt-5 border border-patchwork-dark-50 rounded-md">
								<ServerInstanceLoading />
							</View>
						)}
					</>
				)}
			</KeyboardAwareScrollView>
		</SafeScreen>
	);
};

export default ServerInstance;
