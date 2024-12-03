import React, { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from 'react-native-popup-menu';
import MenuOptionIcon from './MenuOptionIcon/MenuOptionIcon';
import {
	StatusMenuIcon,
	StatusDeleteIcon,
	StatusEditIcon,
	StatusBlockIcon,
} from '@/util/svg/icon.status_actions';
import customColor from '@/util/constant/color';
import { useAuthStore } from '@/store/auth/authStore';
import Underline from '../../common/Underline/Underline';
import { useStatusDeleteMutation } from '@/hooks/mutations/statusActions.mutation';
import {
	StatusCacheQueryKeys,
	getCacheQueryKeys,
} from '@/util/cache/queryCacheHelper';
import { deleteStatusCacheData } from '@/util/cache/statusActions/deleteStatusCache';
import Toast from 'react-native-toast-message';
import StatusDeleteModal from '../../common/StatusDeleteModal/StatusDeleteModal';
import { useCurrentActiveFeed } from '@/store/feed/activeFeed';
import { useNavigation } from '@react-navigation/native';

const StatusMenu = ({ status }: { status: Pathchwork.Status }) => {
	const navigation = useNavigation();

	const currentFeed = useCurrentActiveFeed();

	const [menuVisible, setMenuVisible] = useState(false);
	const hideMenu = () => setMenuVisible(false);
	const showMenu = () => setMenuVisible(true);

	const { userInfo } = useAuthStore();

	const isAuthor = useMemo(() => {
		return userInfo?.id == status.account.id;
	}, [status, userInfo?.id]);

	const [deleteModalVisible, setDeleteModalVisible] = useState(false);

	const onPressShowDeleteModal = () => {
		setDeleteModalVisible(prevState => !prevState);
		hideMenu();
	};

	const { mutate } = useStatusDeleteMutation({
		onSuccess(_, { status_id }) {
			if (currentFeed?.id === status_id) {
				navigation.goBack();
			}
			const queryKeys = getCacheQueryKeys<StatusCacheQueryKeys>(
				status.account.id,
				status.in_reply_to_id,
			);
			deleteStatusCacheData({ status_id, queryKeys });
		},
		onError(error) {
			Toast.show({
				type: 'error',
				text1: error.message,
				position: 'top',
				topOffset: 50,
			});
		},
	});

	const handleDeleteStatus = () => {
		mutate({ status_id: status.id });
		setDeleteModalVisible(false);
	};

	return (
		<>
			<Menu opened={menuVisible} onBackdropPress={hideMenu}>
				<MenuTrigger>
					<Pressable onPress={showMenu}>
						<StatusMenuIcon />
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
					{isAuthor ? (
						<>
							<MenuOption>
								<MenuOptionIcon icon={<StatusEditIcon />} name="Edit" />
							</MenuOption>
							<Underline className="border-patchwork-grey-400" />
							<MenuOption onSelect={onPressShowDeleteModal}>
								<MenuOptionIcon icon={<StatusDeleteIcon />} name="Delete" />
							</MenuOption>
						</>
					) : (
						<MenuOption>
							<MenuOptionIcon icon={<StatusBlockIcon />} name="Block" />
						</MenuOption>
					)}
				</MenuOptions>
			</Menu>

			<StatusDeleteModal
				openDeleteModal={deleteModalVisible}
				onPressHideDeleteModal={() => setDeleteModalVisible(false)}
				handleDeleteStatus={handleDeleteStatus}
			/>
		</>
	);
};

export default StatusMenu;
