import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import React from 'react';
import { View, Text } from  'react-native';
import Keyword from '../../common/Keyword/Keyword';
import Underline from '../../common/Underline/Underline';
import HashtagLists from '../../common/Hashtag/HashtagList';

const HashtagList = () => {
    return(
        <View>
            {/* <View className="border border-slate-300 dark:border-gray-600 p-4 mb-8"> */}
				<View>
				<HashtagLists/>
				{/* <Underline className="mt-1 mr-5" /> */}
			</View>
            
        </View>
    )
}

export default HashtagList
