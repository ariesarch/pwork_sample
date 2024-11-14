/* eslint-disable @typescript-eslint/no-namespace */
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { GetChannelFeedQueryKey } from './queries/channel.type';
import { AccountDetailFeedQueryKey } from './queries/feed.type';

export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	Welcome: undefined;
	AboutYou: undefined;
	Profile: { id: string };
	Index: NavigatorScreenParams<BottomStackParamList>;
	EmailVerification: undefined;
	ChannelCreate: undefined;
	WebViewer: { url: string };
	ImageViewer: {
		imageUrls: Pathchwork.ImageUrl[];
		id: Pathchwork.Attachment['id'];
	};
};

export type BottomStackParamList = {
	Home: NavigatorScreenParams<HomeStackParamList>;
	Notification: undefined;
	Search: NavigatorScreenParams<SearchStackParamList>;
	Message: undefined;
	Compose:
		| {
				type: 'create';
		  }
		| {
				type: 'repost';
				incomingStatus: Pathchwork.Status;
		  };
};

export type HomeStackParamList = {
	HomeFeed: undefined;
	PeopleFollowing: undefined;
	FeedDetail: {
		id: string;
		selectedFeedIndex?: number;
		queryKey?: GetChannelFeedQueryKey | AccountDetailFeedQueryKey;
	};
	ChannelProfile: {
		domain_name: string;
		channel_info: {
			avatar_image_url: string;
			banner_image_url: string;
			channel_name: string;
		};
	};
	Profile: { id: string };
	HashTagDetail: { hashtag: string; hashtagDomain: string };
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
