import { View } from 'react-native';
import RebloggedStatus from '../RebloggedStatus/RebloggedStatus';
import StatusItem from '../StatusItem/StatusItem';
import ReplyStatus from '../ReplyStatus/ReplyStatus';
import FeedDetailStatus from '@/components/atoms/feed/FeedDetailStatus/FeedDetailStatus';
import {
	StatusCurrentPage,
	StatusType,
} from '@/context/statusItemContext/statusItemContext.type';
import { StatusContextProvider } from '@/context/statusItemContext/statusItemContext';
import NotificationStatus from '../NotificationStatus/NotificationStatus';

type DefaultStatusProps = {
	status: Pathchwork.Status;
	currentPage: StatusCurrentPage;
	isFromNoti?: boolean;
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
	const { status, isFromNoti, currentPage, statusType, extraPayload } = props;

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
				return <RebloggedStatus status={status} isFromNoti={isFromNoti} />;

			case 'feedDetail':
				return <FeedDetailStatus feedDetail={status} />;

			case 'notification':
				return <NotificationStatus status={status} />;

			case 'normal':
				return <StatusItem status={status} isFromNoti={isFromNoti} />;

			default:
				return <></>;
		}
	};

	return (
		<StatusContextProvider
			value={{
				parentStatus: status,
				comeFrom: isFromNoti ? 'noti' : 'other',
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
