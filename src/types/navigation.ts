/* eslint-disable @typescript-eslint/no-namespace */
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	Welcome: undefined;
	AboutYou: undefined;
	Profile: undefined;
	Index: undefined;
	ChannelDetail: undefined;
};

export type BottomStackParamList = {
	Home: NavigatorScreenParams<HomeStackParamList>;
	Notification: undefined;
	Search: undefined;
	Message: undefined;
	Compose: undefined;
};

export type HomeStackParamList = {
	Channel: undefined;
	HomeFeed: undefined;
	FeedDetail: {
		statusId: number | undefined;
	};
	ChannelDetail: undefined;
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type HomeStackScreenProps<S extends keyof HomeStackParamList> =
	StackScreenProps<HomeStackParamList, S>;

export type TabBarScreenProps<
	S extends keyof BottomStackParamList = keyof BottomStackParamList,
> = CompositeScreenProps<
	BottomTabScreenProps<BottomStackParamList, S>,
	RootScreenProps<keyof RootStackParamList>
>;
declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
