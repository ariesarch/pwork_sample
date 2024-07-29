import React from 'react';
import { ScrollView } from 'react-native';
import Underline from '@/components/atoms/common/Underline/Underline';
import QuickVerticalInfo from '@/components/molecules/profile/QuickVerticalInfo/QuickVerticalInfo';
import { scale } from '@/util/helper/helper';

const profiles = [
	{
		id: 1,
		name: 'Account name',
		count: 101,
		image: require('../../../../../assets/images/mock/profile/image-1.png'),
	},
	{
		id: 2,
		name: 'Account name',
		count: 58,
		image: require('../../../../../assets/images/mock/profile/image-2.png'),
	},
	{
		id: 3,
		name: 'Account name',
		count: 31,
		image: require('../../../../../assets/images/mock/profile/image-3.png'),
	},
	{
		id: 4,
		name: 'Account name',
		count: 10,
		image: require('../../../../../assets/images/mock/profile/image-4.png'),
	},
];

const HorizontalScrollMenu = () => {
	return (
		<>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingLeft: scale(20) }}
        className='pt-5 pb-3 bg-patchwork-light-900 dark:bg-patchwork-dark-100'
			>
				<QuickVerticalInfo
					name="All"
					count={329}
					image={require('../../../../../assets/images/mock/profile/all.png')}
          className='bg-patchwork-red-50 text-patchwork-red-50 border-patchwork-red-50 -right-4'
          countColor={'text-white'}
				/>
				{profiles.map(profile => (
					<QuickVerticalInfo
						key={profile.id}
						name={profile.name}
						count={profile.count}
						image={profile.image}
					/>
				))}
			</ScrollView>
			<Underline />
		</>
	);
};

export default HorizontalScrollMenu;
