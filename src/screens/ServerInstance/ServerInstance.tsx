import BackButton from '@/components/atoms/common/BackButton/BackButton';
import { Button } from '@/components/atoms/common/Button/Button';
import Header from '@/components/atoms/common/Header/Header';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { ServerInstanceLoading } from '@/components/atoms/loading/ServerInstanceLoading';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import useDebounce from '@/hooks/custom/useDebounce';
import {
	useAuthorizeInstanceMutation,
	useRequestPermissionToInstanceMutation,
} from '@/hooks/mutations/auth.mutation';
import { useSearchServerInstance } from '@/hooks/queries/auth.queries';
import { GuestStackScreenProps } from '@/types/navigation';
import { ensureHttp, formatNumber, saveAuthState } from '@/util/helper/helper';
import { SearchIcon } from '@/util/svg/icon.common';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { verifyAuthToken } from '@/services/auth.service';
import { useAuthStoreAction } from '@/store/auth/authStore';
import customColor from '@/util/constant/color';

export const ServerInstance: React.FC<
	GuestStackScreenProps<'ServerInstance'>
> = ({ navigation }) => {
	const [typedDomainName, setTypedDomainName] = useState('');
	const [finalKeyword, setFinalKeyword] = useState('');
	const startDebounce = useDebounce();
	const { setAuthToken, setUserInfo, setUserOriginInstance } =
		useAuthStoreAction();
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
			if (Platform.OS == 'android') {
				return navigation.navigate('MastodonSignInWebView', {
					url,
					domain: finalKeyword,
					client_id: res.client_id,
					client_secret: res.client_secret,
				});
			}
			handleAuthForIos(url, res.client_id, res.client_secret);
		},
	});

	const { mutate: authorizeUser, isPending: isAuthroizing } =
		useAuthorizeInstanceMutation({
			onSuccess: async resp => {
				await saveAuthState(
					'AUTH_STATE',
					JSON.stringify({
						access_token: resp.access_token,
						domain: ensureHttp(finalKeyword),
					}),
				);
				const userInfo = await verifyAuthToken();
				setUserInfo(userInfo);
				setUserOriginInstance(finalKeyword);
				setAuthToken(resp.access_token);
			},
		});

	const handleAuthForIos = async (
		url: string,
		client_id: string,
		client_secret: string,
	) => {
		InAppBrowser.close();
		const result = await InAppBrowser.openAuth(url, 'patchwork://', {
			ephemeralWebSession: false,
			showTitle: false,
			enableUrlBarHiding: true,
			enableDefaultShare: false,
			showInRecents: true,
			forceCloseOnRedirection: false,
		});

		if (result.type === 'success') {
			const REGEX_FOR_CODE = /[?&]code=([^&]+)/;

			const authorizationCode = result.url.match(REGEX_FOR_CODE);

			if (authorizationCode && authorizationCode[1]) {
				authorizeUser({
					code: authorizationCode[1],
					domain: finalKeyword,
					client_id,
					client_secret,
					redirect_uri: 'patchwork://',
					grant_type: 'authorization_code',
				});
			}
		}
	};

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
			<KeyboardAwareScrollView
				className="mx-6"
				contentContainerStyle={{ flex: 1 }}
			>
				<ThemeText className="font-bold text-2xl mb-2">Welcome Back</ThemeText>
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
			{isAuthroizing && (
				<>
					<View className="flex-1 items-center justify-center absolute top-0 right-0 bottom-0 left-0 bg-black opacity-70"></View>
					<View className="items-center justify-center absolute top-0 right-0 bottom-0 left-0">
						<Flow size={35} color={customColor['patchwork-red-50']} />
					</View>
				</>
			)}
		</SafeScreen>
	);
};

export default ServerInstance;
