import { QueryFunctionContext } from '@tanstack/query-core';
import { AxiosResponse } from 'axios';
import instance from './instance';
import { appendApiVersion } from '@/util/helper/helper';

export type NotificationsQueryKey = ['noti-query-key'];
export type MentionsNotificationsQueryKey = ['mention-noti-query-key'];

export interface NotificationItem {
	group_key: string;
	type: 'follow' | 'favourite' | 'mention' | 'reblog' | 'poll';
	latest_page_notification_at: string;
	account: Pathchwork.Account;
	status?: Pathchwork.Status | null;
}

export interface INotificationResponse {
	id: string;
	type: 'follow' | 'favourite' | 'mention' | 'reblog' | 'poll';
	group_key: string;
	status: Pathchwork.Status;
	account: Pathchwork.Account;
	created_at: string;
}

export const getNotifications = async (
	_: QueryFunctionContext<NotificationsQueryKey>,
) => {
	const response: AxiosResponse<INotificationResponse[]> = await instance.get(
		appendApiVersion('notifications'),
		{
			params: {
				grouped_types: ['favourite', 'reblog', 'follow'],
				exclude_types: ['follow_request'],
			},
		},
	);

	// const { accounts, statuses, notification_groups } = response.data;

	return response.data;
};

export const getMentionsNotifications = async (
	_: QueryFunctionContext<MentionsNotificationsQueryKey>,
) => {
	const response: AxiosResponse<INotificationResponse[]> = await instance.get(
		appendApiVersion('notifications'),
		{
			params: {
				grouped_types: ['favourite', 'reblog', 'follow'],
				exclude_types: [
					'follow',
					'follow_request',
					'favourite',
					'reblog',
					'poll',
					'status',
					'update',
					'admin.sign_up',
					'admin.report',
					'moderation_warning',
					'severed_relationships',
					'annual_report',
				],
			},
		},
	);

	return response.data;

	// const { accounts, statuses, notification_groups } = response.data;

	// return {
	// 	accounts: accounts || [],
	// 	statuses: statuses || [],
	// 	notification_groups: notification_groups || [],
	// };
};
