import React from 'react';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';

type BioProps = {
	userBio: string;
	userBioTextStyle?: string
};

const Bio = ({ userBio, userBioTextStyle }: BioProps) => {
	return (
		<ThemeText className={`mt-2 leading-[18px] ${userBioTextStyle}`} textBreakStrategy="balanced">
			{userBio}
		</ThemeText>
	);
};

export default Bio;
