import { Image, Pressable, View, ViewProps } from 'react-native';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { Button } from '@/components/atoms/common/Button/Button';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { timelineDateFormatter } from '@/util/helper/helper';
import { useUserRelationshipMutation } from '@/hooks/mutations/profile.mutation';
import { createRelationshipQueryKey } from '@/hooks/queries/profile.queries';
import { queryClient } from '@/App';
import { Flow } from 'react-native-animated-spinkit';
import customColor from '@/util/constant/color';
import { memo, useMemo } from 'react';
import { useAuthStore } from '@/store/auth/authStore';

dayjs.extend(relativeTime);

type Props = {
	status: Pathchwork.Status;
	showAvatarIcon?: boolean;
	showFollowIcon?: boolean;
	imageSize?: string;
	relationships?: Pathchwork.RelationShip[];
	isFromNoti?: boolean;
} & ViewProps;

const StatusHeader = ({
	status,
	showAvatarIcon = false,
	showFollowIcon = false,
	imageSize = '',
	relationships,
	isFromNoti,
	...props
}: Props) => {
	const navigation = useNavigation();
	const { userInfo } = useAuthStore();

	const isAuthor = useMemo(() => {
		const currentUserAccHandle = userInfo?.acct + '@channel.org';
		return (
			userInfo?.id == status.account.id ||
			status.account.acct == currentUserAccHandle
		);
	}, [status, userInfo?.id]);

	const { mutate, isPending } = useUserRelationshipMutation({
		onSuccess: (newRelationship, { accountId }) => {
			const relationshipQueryKey = createRelationshipQueryKey([
				accountId,
				accountId,
			]);

			queryClient.setQueryData<Pathchwork.RelationShip[]>(
				relationshipQueryKey,
				old => {
					if (!old) return [newRelationship];
					return old.map(rel =>
						rel.id === accountId ? { ...rel, ...newRelationship } : rel,
					);
				},
			);
		},
	});

	const onMakeRelationship = () => {
		mutate({
			accountId: status.account.id,
			isFollowing: relationships ? relationships[0]?.following : false,
		});
	};

	return (
		<View className="flex flex-row items-center mb-2" {...props}>
			<Pressable
				onPress={() => {
					isAuthor
						? navigation.navigate('Profile', { id: status.account.id })
						: navigation.navigate('ProfileOther', {
								id: status.account.id,
								isFromNoti: isFromNoti,
						  });
				}}
				className="flex-row items-center active:opacity-80"
			>
				{showAvatarIcon === true && (
					<Image
						source={{ uri: status.account.avatar }}
						className={`w-5 h-5 rounded-full bg-slate-300 mr-2 ${imageSize}`}
					/>
				)}
				<ThemeText className="font-SourceSans3_Bold">
					{status.account.display_name
						? status.account.display_name
						: status.account.username}
				</ThemeText>
			</Pressable>
			<ThemeText variant="textGrey" className="ml-2 mt-[2]" size="xs_12">
				{timelineDateFormatter(dayjs(status.created_at).fromNow())}
			</ThemeText>
			<View className="flex-1" />
			{showFollowIcon && (
				<Button
					variant="outline"
					className="rounded-full h-8 py-0 px-4"
					onPress={onMakeRelationship}
					disabled
				>
					{isPending ? (
						<Flow size={25} color={customColor['patchwork-light-900']} />
					) : (
						<ThemeText size="fs_13">
							{relationships && relationships[0]?.following
								? 'Following'
								: 'Follow'}
						</ThemeText>
					)}
				</Button>
			)}
		</View>
	);
};

export default memo(StatusHeader);
