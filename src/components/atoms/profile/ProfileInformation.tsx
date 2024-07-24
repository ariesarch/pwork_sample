import React from 'react';
import { ThemeText } from '@/components/ui/ThemeText/ThemeText';

type ProfileInformationProps = {
  info: string;
};

const ProfileInformation = ({ info }: ProfileInformationProps) => {
  return (
    <ThemeText className="mt-2 leading-[18px]">{info}</ThemeText>
  );
};

export default ProfileInformation;
