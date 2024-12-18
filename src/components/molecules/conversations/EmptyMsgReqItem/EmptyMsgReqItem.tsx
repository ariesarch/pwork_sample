import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import ConversationsListLoading from '@/components/atoms/loading/ConversationsListLoading';
import { RequestApprovalIcon } from '@/util/svg/icon.conversations';
import { View } from 'react-native';

export const EmptyMsgReqItem = ({ isLoading }: { isLoading?: boolean }) => {
	if (isLoading) {
		return Array(8)
			.fill(null)
			.map((_, index) => <ConversationsListLoading key={index} />);
	}
	return (
		<View className="flex-1 mt-32 items-center">
			<RequestApprovalIcon fill={'white'} width={50} height={50} />
			<ThemeText size={'md_16'} className="mt-5">
				No message request at the moment
			</ThemeText>
		</View>
	);
};
