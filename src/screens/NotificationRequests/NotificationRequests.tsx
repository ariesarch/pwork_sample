import React, { useMemo } from 'react';
import { FlatList } from 'react-native';

import BackButton from '@/components/atoms/common/BackButton/BackButton';
import Header from '@/components/atoms/common/Header/Header';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import {
	useAcceptNotiReqMutation,
	useDismissNotiReqMutation,
} from '@/hooks/mutations/conversations.mutation';
import {
	removeAcceptedNotiReq,
	removeDismissedNotiReq,
} from '@/util/cache/conversation/conversationCahce';
import NotiReqItem from '@/components/molecules/conversations/NotiReqItem/NotiReqItem';
import { EmptyMsgReqItem } from '@/components/molecules/conversations/EmptyMsgReqItem/EmptyMsgReqItem';
import { queryClient } from '@/App';

const NofificationRequests = () => {
	const data: Pathchwork.NotiReq[] | undefined = queryClient.getQueryData([
		'all-noti-req',
	]);
	const notiReqList = useMemo(() => data?.flat() || [], [data]);

	// mutation
	const { mutate: acceptNotiReq } = useAcceptNotiReqMutation({
		onSuccess: (_, { id }) => {
			removeAcceptedNotiReq(id);
			queryClient.invalidateQueries({
				queryKey: ['conversations'],
				exact: true,
			});
		},
	});
	const { mutate: dismissNotiReq } = useDismissNotiReqMutation({
		onSuccess: (_, { id }) => removeDismissedNotiReq(id),
	});

	return (
		<SafeScreen>
			<Header title="Message Requests" leftCustomComponent={<BackButton />} />
			<FlatList
				data={notiReqList}
				keyExtractor={item => item.id}
				renderItem={({ item }: { item: Pathchwork.NotiReq }) => (
					<NotiReqItem
						item={item}
						onPressCancel={id => dismissNotiReq({ id })}
						onPressAccept={id => acceptNotiReq({ id })}
					/>
				)}
				ListEmptyComponent={EmptyMsgReqItem}
				showsVerticalScrollIndicator={false}
			/>
		</SafeScreen>
	);
};

export default NofificationRequests;
