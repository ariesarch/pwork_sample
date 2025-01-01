import { View } from 'react-native';
import RebloggedStatus from '../RebloggedStatus/RebloggedStatus';
import StatusItem from '../StatusItem/StatusItem';
import ReplyStatus from '../ReplyStatus/ReplyStatus';
import FeedDetailStatus from '@/components/atoms/feed/FeedDetailStatus/FeedDetailStatus';
import {
	StatusCurrentPage,
	StatusOrigin,
	StatusType,
} from '@/context/statusItemContext/statusItemContext.type';
import { StatusContextProvider } from '@/context/statusItemContext/statusItemContext';
import NotificationStatus from '../NotificationStatus/NotificationStatus';
import RepostingStatusItem from '../RepostingStatusItem/RepostingStatusItem';

type DefaultStatusProps = {
	status: Pathchwork.Status;
	currentPage: StatusCurrentPage;
	comeFrom?: StatusOrigin;
	extraPayload?: Record<string, any> | undefined;
};

type NormalStatusProps = DefaultStatusProps & {
	statusType: Exclude<StatusType, 'reply'>;
};

type ReplyStatusProps = DefaultStatusProps & {
	statusType: 'reply';
	feedDetailId: string;
	nextStatus: Pathchwork.Status | undefined;
	isNestedNodeInclude: boolean | undefined;
};

type StatusWrapperProps = NormalStatusProps | ReplyStatusProps;

export const StatusWrapper = (props: StatusWrapperProps) => {
	const { status, comeFrom, currentPage, statusType, extraPayload } = props;

	const renderStatusComponent = () => {
		switch (statusType) {
			case 'reply': {
				const { feedDetailId, nextStatus, isNestedNodeInclude } = props;
				return (
					<ReplyStatus
						{...{ status, feedDetailId, nextStatus, isNestedNodeInclude }}
					/>
				);
			}

			case 'reblog':
				return (
					<RebloggedStatus status={status} isFromNoti={comeFrom == 'noti'} />
				);

			case 'feedDetail':
				return <FeedDetailStatus feedDetail={status} />;

			case 'notification':
				return <NotificationStatus status={status} />;

			case 'reposting':
				return <RepostingStatusItem status={status} />;

			case 'normal':
				return <StatusItem status={status} isFromNoti={comeFrom == 'noti'} />;

			default:
				return <></>;
		}
	};

	return (
		<StatusContextProvider
			value={{
				parentStatus: status,
				comeFrom: comeFrom || 'other',
				currentPage,
				statusType,
				extraPayload,
			}}
		>
			{renderStatusComponent()}
		</StatusContextProvider>
	);
};

export default StatusWrapper;
