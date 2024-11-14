import { View } from 'react-native';
import StatusHeader from '../StatusHeader/StatusHeader';
import StatusContent from '../StatusContent/StatusContent';
import StatusActionBar from '@/components/molecules/feed/StatusActionBar/StatusActionBar';
import Underline from '../../common/Underline/Underline';
import { ThemeText } from '../../common/ThemeText/ThemeText';
import { memo } from 'react';

const FeedDetailStatus = ({
	feedDetail,
}: {
	feedDetail: Pathchwork.Status;
}) => {
	return (
		<View>
			<View className="mx-4">
				<StatusHeader
					status={feedDetail}
					imageSize="w-8 h-8"
					showAvatarIcon
					showFollowIcon
				/>
				<StatusContent status={feedDetail} className="mt-2" />
				<StatusActionBar status={feedDetail} />
			</View>
			<Underline className="mt-3" />
			<ThemeText className="font-semibold ml-4 my-2">Replies</ThemeText>
			<Underline />
		</View>
	);
};

export default FeedDetailStatus;
