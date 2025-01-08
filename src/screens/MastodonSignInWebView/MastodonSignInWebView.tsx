import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import { useAuthorizeInstanceMutation } from '@/hooks/mutations/auth.mutation';
import { verifyAuthToken } from '@/services/auth.service';
import { useAuthStoreAction } from '@/store/auth/authStore';
import { GuestStackScreenProps } from '@/types/navigation';
import { ensureHttp, saveAuthState } from '@/util/helper/helper';
import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { WebViewNavigation } from 'react-native-webview';
import { WebView } from 'react-native-webview';

const MastodonLoginWebView = ({
	route,
	navigation,
}: GuestStackScreenProps<'MastodonSignInWebView'>) => {
	const { url, domain, client_id, client_secret } = route.params;
	const { setAuthToken, setUserInfo, setUserOriginInstance } =
		useAuthStoreAction();

	const { mutate } = useAuthorizeInstanceMutation({
		onSuccess: async resp => {
			await saveAuthState(
				'AUTH_STATE',
				JSON.stringify({
					access_token: resp.access_token,
					domain: ensureHttp(domain),
				}),
			);
			const userInfo = await verifyAuthToken();
			setUserInfo(userInfo);
			setUserOriginInstance(domain);
			setAuthToken(resp.access_token);
		},
	});

	const onNavigationStateChange = (navigationState: WebViewNavigation) => {
		const authorizationCode = navigationState.url.match(/[?&]code=([^&]+)/);

		if (authorizationCode && authorizationCode[1]) {
			mutate({
				code: authorizationCode[1],
				domain,
				client_id,
				client_secret,
				redirect_uri: 'patchwork://',
				grant_type: 'authorization_code',
			});
		}
	};
	return (
		<SafeScreen>
			<Header
				title={''}
				leftCustomComponent={<BackButton extraClass="border-0" />}
				hideUnderline
			/>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
			>
				<WebView
					source={{ uri: url }}
					onNavigationStateChange={onNavigationStateChange}
				/>
			</KeyboardAvoidingView>
		</SafeScreen>
	);
};

export default MastodonLoginWebView;
