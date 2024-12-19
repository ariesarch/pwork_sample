import { QueryFunctionContext } from '@tanstack/query-core';
import { AxiosResponse } from 'axios';
import instance from './instance';
import { appendApiVersion, handleError } from '@/util/helper/helper';

export type NotificationsQueryKey = ['noti-query-key'];
export type MentionsNotificationsQueryKey = ['mention-noti-query-key'];
export type FollowRequestQueryKey = ['follow-request-query-key'];

export interface NotificationItem {
	group_key: string;
	type:
		| 'follow'
		| 'favourite'
		| 'mention'
		| 'reblog'
		| 'poll'
		| 'update'
		| 'admin.report'
		| 'status';
	latest_page_notification_at: string;
	account: Pathchwork.Account;
	status?: Pathchwork.Status | null;
}

export interface INotificationResponse {
	id: string;
	type:
		| 'follow'
		| 'favourite'
		| 'mention'
		| 'reblog'
		| 'poll'
		| 'update'
		| 'admin.report'
		| 'status';
	group_key: string;
	status: Pathchwork.Status;
	account: Pathchwork.Account;
	created_at: string;
	report: {
		id: number;
		comment: string;
		target_account: Pathchwork.Account;
	};
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

export const getFollowRequests = async (
	qfContext: QueryFunctionContext<FollowRequestQueryKey>,
) => {
	try {
		const max_id = qfContext.pageParam as string;

		const resp: AxiosResponse<Pathchwork.Status[]> = await instance.get(
			appendApiVersion('follow_requests'),
			{
				params: {
					max_id,
				},
			},
		);
		const linkHeader = resp.headers.link as string;
		let maxId = null;
		if (linkHeader) {
			const regex = /max_id=(\d+)/;
			const match = linkHeader.match(regex);
			if (match) {
				maxId = match[1];
			}
		}

		return {
			data: resp.data,
			links: { next: { max_id: maxId } },
		};
	} catch (e) {
		return handleError(e);
	}
};
