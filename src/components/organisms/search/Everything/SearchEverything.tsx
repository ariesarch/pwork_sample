import React from 'react';
import { ScrollView } from 'react-native';
import SeggestedPeopleList from '@/components/molecules/search/SuggestedPeople/SuggestedPeopleList';
import Browsing from '@/components/molecules/search/Browsing/Browsing';
import Trending from '@/components/molecules/search/Trending/Trending';

const SearchEverything = () => {
	return (
		<ScrollView>
			<Trending />
			<Browsing />
			<SeggestedPeopleList />
		</ScrollView>
	);
};

export default SearchEverything;
