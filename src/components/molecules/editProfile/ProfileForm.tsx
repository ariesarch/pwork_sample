import React from 'react';
import { View } from 'react-native';
import TextInput from '@/components/atoms/common/TextInput/TextInput';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

interface Profile {
	display_name?: string;
	bio?: string;
}

interface ProfileFormProps {
	profile?: Profile;
	onChangeName: (text: string) => void;
	onChangeBio: (text: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
	profile,
	onChangeBio,
	onChangeName,
}) => (
	<View className="mx-5 flex-1">
		<ThemeText size={'md_16'}>Public Info</ThemeText>
		<ThemeText className="mt-3 mb-1">Display Name</ThemeText>
		<TextInput
			value={profile?.display_name || ''}
			onChangeText={onChangeName}
		/>
		<ThemeText className="mt-2 mb-1">Bio</ThemeText>
		<TextInput textArea value={profile?.bio || ''} onChangeText={onChangeBio} />
	</View>
);

export default ProfileForm;
