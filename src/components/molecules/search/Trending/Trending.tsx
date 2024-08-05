import React from 'react';
import { View, Text } from  'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import HashtagList from '@/components/atoms/search/HashtagList/HashtagList';


const Trending = () => {
    return(
        <View>
            <ThemeText>(FireIcon)Trending</ThemeText>
            <HashtagList/>
            <HashtagList/>
            <HashtagList/>
            <HashtagList/>
        </View>
    )
}

export default Trending
