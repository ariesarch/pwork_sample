import React from 'react';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';

type BioProps = {
  info: string;
};

const Bio = ({ info }: BioProps) => {
  return (
    <ThemeText className="mt-2 leading-[18px]">{info}</ThemeText>
  );
};

export default Bio;
