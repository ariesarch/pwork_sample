import React from 'react';
import { View } from 'react-native';
import PollForm from '../PollForm/PollForm';
import ComposeTextInput from '@/components/atoms/compose/ComposeTextInput/ComposeTextInput';
import { LinkCard } from '@/components/atoms/compose/LinkCard/LinkCard';
import ImageCard from '@/components/atoms/compose/ImageCard/ImageCard';

const CreateComposeStatus = () => {
	return (
		<View className="px-4">
			<ComposeTextInput />

			<PollForm composeType="create" />

			<LinkCard composeType="create" />
			<ImageCard composeType="create" />
			{/* {ctaText && (
				<View>
					<Chip
						startIcon={<LinkIcon {...{ colorScheme }} />}
						title={ctaText}
						className="absolute"
					/>
				</View>
			)} */}
		</View>
	);
};

export default CreateComposeStatus;
