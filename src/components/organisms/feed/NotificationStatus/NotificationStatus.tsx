import StatusContent from '@/components/atoms/feed/StatusContent/StatusContent';
import StatusHeader from '@/components/atoms/feed/StatusHeader/StatusHeader';
import React from 'react';
import { View } from 'react-native';

interface NotificationStatusProps {
	status: Patchwork.Status;
}

const NotificationStatus: React.FC<NotificationStatusProps> = ({ status }) => {
	return (
		<View className="border border-slate-200 dark:border-patchwork-grey-70 my-2 p-3 rounded-lg">
			<StatusHeader status={status} isFromNoti showAvatarIcon />
			<StatusContent status={status} isMainChannel isFromNotiStatusImage />
		</View>
	);
};

export default NotificationStatus;
