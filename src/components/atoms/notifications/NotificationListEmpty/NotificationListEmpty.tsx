import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { NotificationEmptyIcon } from '@/util/svg/icon.notification';

const NotificationListEmpty = () => {
	return (
		<View style={styles.container}>
			<NotificationEmptyIcon />
			<ThemeText
				size={'lg_18'}
				className="my-2 tracking-widest text-center font-bold"
			>
				No Notifications
			</ThemeText>
			<ThemeText size={'fs_15'} className="tracking-wider text-center px-3">
				You don't have any notifications yet. When other people interact with
				you, you will see it here.
			</ThemeText>
		</View>
	);
};

export default NotificationListEmpty;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: Dimensions.get('screen').height * 0.4,
	},
});
