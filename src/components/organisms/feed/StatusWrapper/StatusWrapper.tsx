import { View } from 'react-native';
import RebloggedStatus from '../RebloggedStatus/RebloggedStatus';
import StatusItem from '../StatusItem/StatusItem';

export const StatusWrapper = ({
	status,
	isFromNoti,
}: {
	status: Pathchwork.Status;
	isFromNoti?: boolean;
}) => {
	const checkStatusType = () => {
		if (status.reblog) {
			return <RebloggedStatus status={status} />;
		}
		return <StatusItem status={status} isFromNoti={isFromNoti} />;
	};

	return <View>{checkStatusType()}</View>;
};

export default StatusWrapper;
