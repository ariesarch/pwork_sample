import { QueryFunctionContext } from '@tanstack/query-core';
import axios, { AxiosResponse } from 'axios';
import instance from './instance';
import { appendApiVersion } from '@/util/helper/helper';

const apiClient = axios.create({
	// baseURL: 'https://channel.org/api/v1/',
	baseURL: 'https://mastodon.social/api/v2/',
	headers: {
		// Authorization: 'Bearer GKQmZfv-tX4HsYH9Ke9YpjJWc3dP7Kcxx7OU84g6ztw',
		Authorization: 'Bearer 4LZK5x1LU8Hc4c5SHRo98EOfZqDeM3VbhDOs_jq0gnM',
	},
});

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
	accounts: Pathchwork.Account[];
	statuses: Pathchwork.Status[];
	notification_groups: Pathchwork.NotificatioinGroups[];
}

export const getNotifications = async (
	_: QueryFunctionContext<NotificationsQueryKey>,
) => {
	try {
		const response: AxiosResponse<INotificationResponse> = await apiClient.get(
			'notifications',
			{
				params: {
					grouped_types: ['favourite', 'reblog', 'follow'],
					exclude_types: ['follow_request'],
				},
			},
		);

		const { accounts, statuses, notification_groups } = response.data;

		return {
			accounts: accounts || [],
			statuses: statuses || [],
			notification_groups: notification_groups || [],
		};
	} catch (error) {
		console.error('Error fetching notifications:', error);
		throw new Error('Failed to fetch notifications');
	}
};

// export const getNotifications = async (
// 	_: QueryFunctionContext<NotificationsQueryKey>,
// ) => {
// 	const response: AxiosResponse<NotificationResponse> = await instance.get(
// 		appendApiVersion('notifications'),
// 		{
// 			params: {
// 				grouped_types: ['favourite', 'reblog', 'follow'],
// 				exclude_types: ['follow_request'],
// 			},
// 		},
// 	);

// 	const { accounts, statuses, notification_groups } = response.data;

// 	return {
// 		accounts: accounts || [],
// 		statuses: statuses || [],
// 		notification_groups: notification_groups || [],
// 	};
// };

export const getMentionsNotifications = async (
	_: QueryFunctionContext<MentionsNotificationsQueryKey>,
) => {
	try {
		const response: AxiosResponse<INotificationResponse> = await apiClient.get(
			'notifications',
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

		const { accounts, statuses, notification_groups } = response.data;

		return {
			accounts: accounts || [],
			statuses: statuses || [],
			notification_groups: notification_groups || [],
		};
	} catch (error) {
		console.error('Error fetching mentions notifications:', error);
		throw new Error('Failed to fetch mentions notifications');
	}
};
