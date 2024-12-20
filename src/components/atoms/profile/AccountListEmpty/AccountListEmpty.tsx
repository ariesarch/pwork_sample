import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { AccountNotFoundIcon } from '@/util/svg/icon.profile';

const AccountListEmpty = () => {
	return (
		<View style={styles.container}>
			<AccountNotFoundIcon />
			<ThemeText
				size={'lg_18'}
				className="my-2 tracking-widest text-center font-SourceSans3_Bold"
			>
				No accounts found
			</ThemeText>
		</View>
	);
};

export default AccountListEmpty;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: Dimensions.get('screen').height * 0.4,
	},
});
