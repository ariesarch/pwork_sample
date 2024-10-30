import { getHashtagDetail } from '@/services/hashtag.service';
import { HashtagDetailQueryKey } from '@/types/queries/hashtag.type';
import { useQuery } from '@tanstack/react-query';

export const useHashTagDetailQuery = ({
	domain_name,
	hashtag,
}: HashtagDetailQueryKey[1]) => {
	const queryKey: HashtagDetailQueryKey = [
		'hashtag-detail',
		{ domain_name, hashtag },
	];
	return useQuery({ queryKey, queryFn: getHashtagDetail });
};
