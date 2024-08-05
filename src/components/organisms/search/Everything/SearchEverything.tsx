import React from 'react';
import { View, ScrollView } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import AccountAvatar from '@/components/molecules/feed/AccountAvatar/AccountAvatar';
import { useNavigation } from '@react-navigation/native';
import { mockUserList } from '@/mock/feed/statusList';
import SeggestedPeopleList from '@/components/molecules/search/SuggestedPeople/SuggestedPeopleList';
import Browsing from '@/components/molecules/search/Browsing/Browsing';

const SearchEverything = () => {
	return (
		<View>
				<Browsing />
			<SeggestedPeopleList />
		</View>
	);
};

export default SearchEverything;
