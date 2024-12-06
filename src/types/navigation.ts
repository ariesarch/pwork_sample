import { ChannelProfile } from '@/screens';
/* eslint-disable @typescript-eslint/no-namespace */
import {
	CompositeNavigationProp,
	CompositeScreenProps,
	NavigationProp,
	NavigatorScreenParams,
} from '@react-navigation/native';
import type {
	StackNavigationProp,
	StackScreenProps,
} from '@react-navigation/stack';
import type {
	BottomTabNavigationProp,
	BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { GetChannelFeedQueryKey } from './queries/channel.type';
import { AccountDetailFeedQueryKey } from './queries/feed.type';
import { SearchUsersQueryKey } from './queries/conversations.type';
import { Asset } from 'react-native-image-picker';

export type RootStackParamList = {
	AboutYou: undefined;
	Profile: { id: string };
	ProfileOther: { id: string };
	Index: NavigatorScreenParams<BottomStackParamList>;
	Guest: NavigatorScreenParams<GuestStackParamList>;
	EmailVerification: undefined;
	ChannelCreate: undefined;
	WebViewer: { url: string };
	ImageViewer: {
		imageUrls: Pathchwork.ImageUrl[];
		id: Pathchwork.Attachment['id'];
	};
	EditProfile: undefined;
	LocalImageViewer: {
		imageUrl: {
			url: string;
			width?: number;
			height?: number;
			isLocal?: boolean;
		};
	};
};

export type BottomStackParamList = {
	Home: NavigatorScreenParams<HomeStackParamList>;
	Notification: NavigatorScreenParams<NotiStackParamList>;
	Search: NavigatorScreenParams<SearchStackParamList>;
	Compose:
		| {
				type: 'create';
		  }
		| {
				type: 'repost' | 'edit';
				incomingStatus: Pathchwork.Status;
		  };
	Conversations: NavigatorScreenParams<ConversationsStackParamList>;
	HomeFeed: undefined;
};

export type HomeStackParamList = {
	HomeFeed: undefined;
	PeopleFollowing: undefined;
	FeedDetail: {
		id: string;
		openKeyboardAtMount?: boolean;
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
	ProfileOther: { id: string };
	HashTagDetail: { hashtag: string; hashtagDomain: string };
};

export type SearchStackParamList = {
	SearchResults: undefined;
	SearchFeed: undefined;
	ChannelProfile: {
		domain_name: string;
		channel_info: {
			avatar_image_url: string;
			banner_image_url: string;
			channel_name: string;
		};
	};
	FeedDetail: {
		id: string;
		openKeyboardAtMount?: boolean;
	};
	Profile: { id: string };
	ProfileOther: { id: string };
};

// ********** Notification Stack ********** //

export type NotiStackParamList = {
	NotificationList: undefined;
	FeedDetail: {
		id: string;
		openKeyboardAtMount?: boolean;
	};
};

export type NotificationScreenNavigationProp = NavigationProp<
	NotiStackParamList,
	'NotificationList'
>;
// ********** Notification Stack ********** //

export type ConversationsStackParamList = {
	StartConversation: undefined;
	NewMessage: undefined;
	Chat: undefined;
};

export type GuestStackParamList = {
	Login: undefined;
	Register: undefined;
	Welcome: undefined;
	ForgotPassword: undefined;
	ForgotPasswordOTP: { email: string; reset_password_token: string };
	ChangePassword: { reset_password_token: string };
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type HomeStackScreenProps<S extends keyof HomeStackParamList> =
	StackScreenProps<HomeStackParamList, S>;

export type SearchStackScreenProps<S extends keyof SearchStackParamList> =
	StackScreenProps<SearchStackParamList, S>;

export type ConversationsStackScreenProps<
	S extends keyof ConversationsStackParamList,
> = StackScreenProps<ConversationsStackParamList, S>;

export type GuestStackScreenProps<S extends keyof GuestStackParamList> =
	StackScreenProps<GuestStackParamList, S>;

export type TabBarScreenProps<
	S extends keyof BottomStackParamList = keyof BottomStackParamList,
> = CompositeScreenProps<
	BottomTabScreenProps<BottomStackParamList, S>,
	RootScreenProps<keyof RootStackParamList>
>;

export type TabBarScreenNavigationProp<
	S extends keyof BottomStackParamList = keyof BottomStackParamList,
> = CompositeNavigationProp<
	BottomTabNavigationProp<BottomStackParamList, S>,
	StackNavigationProp<RootStackParamList>
>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
