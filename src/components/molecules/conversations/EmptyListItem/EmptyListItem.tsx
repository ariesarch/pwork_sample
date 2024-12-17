import ConversationsListLoading from '@/components/atoms/loading/ConversationsListLoading';
import StartConversation from '@/components/organisms/conversations/StartConversation/StartConversation';

export const EmptyListComponent = ({
	isLoading,
	onPress,
}: {
	isLoading: boolean;
	onPress: () => void;
}) => {
	if (isLoading) {
		return Array(8)
			.fill(null)
			.map((_, index) => <ConversationsListLoading key={index} />);
	}
	return <StartConversation onPress={onPress} />;
};
