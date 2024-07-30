import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { CaretRightIcon } from '@/util/svg/icon.common';

type UserNameProps = {
	username: string;
	joinedDate?: string;
};

const UserName = ({ username, joinedDate = '' }: UserNameProps) => {
	return (
		<ThemeText size="xs_12" variant="textGrey">
			@{username}{' '}
			{joinedDate && (
				<ThemeText size="xs_12" variant="textGrey">
					<CaretRightIcon /> {joinedDate}
				</ThemeText>
			)}
		</ThemeText>
	);
};

export default UserName;
