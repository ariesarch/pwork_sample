import { useState } from 'react';
import { Pressable } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { StatusMenuIcon } from '@/util/svg/icon.status_actions';
import customColor from '@/util/constant/color';
import { useAuthStore } from '@/store/auth/authStore';
import {
	useActiveFeedAction,
	useActiveFeedStore,
} from '@/store/feed/activeFeed';
import { useNavigation } from '@react-navigation/native';
import { useActiveDomainStore } from '@/store/feed/activeDomain';
import { useSubchannelStatusActions } from '@/store/feed/subChannelStatusStore';
import { useStatusContext } from '@/context/statusItemContext/statusItemContext';
import { useTranslationLanguageStore } from '@/store/compose/translationLanguage/translationLanguage';
import MenuOptionsForOtherUser from '../../../atoms/feed/StatusMenu/MenuOptionsForOtherUser/MenuOptionsForOtherUser';
import AccountShieldMenuOptions from '@/components/molecules/profile/AccountShieldMenuOptions/AccountShieldMenuOptions';

const AccountShield = ({ account }: { account: Patchwork.Account }) => {
	const navigation = useNavigation();

	const [menuVisible, setMenuVisible] = useState(false);
	const hideMenu = () => setMenuVisible(false);
	const showMenu = () => setMenuVisible(true);

	return (
		<>
			<Menu opened={menuVisible} onBackdropPress={hideMenu}>
				<MenuTrigger>
					<Pressable onPress={showMenu}>
						<StatusMenuIcon fill={'#FFFFFF'} />
					</Pressable>
				</MenuTrigger>
				<MenuOptions
					customStyles={{
						optionsContainer: {
							backgroundColor: customColor['patchwork-dark-400'],
							borderRadius: 10,
							shadowOpacity: 0.1,
							elevation: 2,
						},
					}}
				>
					<AccountShieldMenuOptions
						account={account}
						hideMenu={hideMenu}
						navigation={navigation}
					/>
				</MenuOptions>
			</Menu>
		</>
	);
};

export default AccountShield;
