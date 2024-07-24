import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	Welcome: undefined;
	AboutYou: undefined;
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
