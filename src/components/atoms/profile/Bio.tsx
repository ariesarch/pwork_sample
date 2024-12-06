import React, { useState } from 'react';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { cleanText } from '@/util/helper/cleanText';

type BioProps = {
	userBio: string;
	userBioTextStyle?: string;
};

const Bio = ({ userBio, userBioTextStyle }: BioProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const maxWordCount = 30;
	const cleanedText = cleanText(userBio);
	const words = cleanedText.split(' ');
	const shouldShorten = words.length > maxWordCount;

	const handleToggle = () => setIsExpanded(!isExpanded);

	const displayedText =
		shouldShorten && !isExpanded
			? `${words.slice(0, maxWordCount).join(' ')}...`
			: cleanedText;

	return (
		<ThemeText className={`mt-2 leading-5 ${userBioTextStyle}`}>
			{displayedText}
			{'   '}
			{shouldShorten && (
				<ThemeText
					onPress={handleToggle}
					className="text-patchwork-red-50 font-semibold"
				>
					{isExpanded ? 'See Less' : 'See More'}
				</ThemeText>
			)}
		</ThemeText>
	);
};

export default Bio;
