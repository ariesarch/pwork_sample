import { View } from 'react-native';
import RebloggedStatus from '../RebloggedStatus/RebloggedStatus';
import { stat } from 'fs';
import ReplyStatus from '../ReplyStatus/ReplyStatus';
import StatusItem from '../StatusItem/StatusItem';

export const StatusWrapper = ({ status }: { status: Pathchwork.Status }) => {
	const checkStatusType = () => {
		if (status.reblog) {
			return <RebloggedStatus status={status} />;
		}
		if (status.in_reply_to_id || status.in_reply_to_account_id) {
			return <ReplyStatus status={status} />;
		}
		return <StatusItem status={status} />;
	};

	return <View>{checkStatusType()}</View>;
};

export default StatusWrapper;
