import { View } from 'react-native';
import RebloggedStatus from '../RebloggedStatus/RebloggedStatus';
import StatusItem from '../StatusItem/StatusItem';

export const StatusWrapper = ({ status }: { status: Pathchwork.Status }) => {
	const checkStatusType = () => {
		if (status.reblog) {
			return <RebloggedStatus status={status} />;
		}
		return <StatusItem status={status} />;
	};

	return <View>{checkStatusType()}</View>;
};

export default StatusWrapper;
