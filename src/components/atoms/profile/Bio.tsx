import React from 'react';
import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';

type BioProps = {
	info: string;
};

const Bio = ({ info }: BioProps) => {
	return (
		<ThemeText className="mt-2 leading-[18px]" textBreakStrategy="balanced">
			{info}
		</ThemeText>
	);
};

export default Bio;
