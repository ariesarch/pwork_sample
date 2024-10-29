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
	Profile: { id: string };
	Index: undefined;
	EmailVerification: undefined;
	ChannelCreate: undefined;
	WebViewer: { url: string };
};

export type BottomStackParamList = {
	Home: NavigatorScreenParams<HomeStackParamList>;
	Notification: undefined;
	Search: NavigatorScreenParams<SearchStackParamList>;
	Message: undefined;
	Compose: undefined;
};

export type HomeStackParamList = {
	PeopleFollowing: undefined;
	HomeFeed: undefined;
	FeedDetail: {
		id: string;
		selectedFeedIndex?: number;
	};
	ChannelProfile: {
		domain_name: string;
	};
	Profile: { id: string };
};

export type SearchStackParamList = {
	SearchResults: {
		query: string | undefined;
	};
	SearchFeed: undefined;
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type HomeStackScreenProps<S extends keyof HomeStackParamList> =
	StackScreenProps<HomeStackParamList, S>;

export type SearchStackScreenProps<S extends keyof SearchStackParamList> =
	StackScreenProps<SearchStackParamList, S>;

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
