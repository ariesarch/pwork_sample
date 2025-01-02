import {
	CompositeNavigationProp,
	CompositeScreenProps,
	NavigationProp,
	NavigatorScreenParams,
	RouteProp,
} from '@react-navigation/native';
import type {
	StackNavigationProp,
	StackScreenProps,
} from '@react-navigation/stack';
import type {
	BottomTabNavigationProp,
	BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { StatusCurrentPage } from '@/context/statusItemContext/statusItemContext.type';

export type RootStackParamList = {
	AboutYou: undefined;
	Profile: { id: string };
	ProfileOther: {
		id: string;
		isFromNoti?: boolean;
		isOwnChannelFeed?: boolean;
	};
	Index: NavigatorScreenParams<BottomStackParamList>;
	Guest: NavigatorScreenParams<GuestStackParamList>;
	SettingStack: NavigatorScreenParams<SettingStackParamList>;
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
	ConversationDetail: {
		id: string;
		isFromNotification?: boolean;
		isFromProfile?: boolean;
	};
	InitiateNewConversation: {
		account: Pathchwork.Account;
	};
	BookmarkList: undefined;
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
				statusCurrentPage?: StatusCurrentPage;
				extraPayload?: Record<string, any>;
		  };
	Conversations: NavigatorScreenParams<ConversationsStackParamList>;
};

export type HomeStackParamList = {
	HomeFeed: undefined;
	SearchFeed: undefined;
	PeopleFollowing: undefined;
	FeedDetail: {
		id: string;
		isMainChannel?: boolean;
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
	ProfileOther: {
		id: string;
		isFromNoti?: boolean;
		isOwnChannelFeed?: boolean;
	};
	HashTagDetail: { hashtag: string; hashtagDomain: string };
	Conversations: NavigatorScreenParams<ConversationsStackParamList>;
	Search: NavigatorScreenParams<SearchStackParamList>;
	FollowingAccounts: {
		accountId: string;
		isMainChannel?: boolean;
	};
	FollowerAccounts: {
		accountId: string;
		isMainChannel?: boolean;
	};
	WebViewer: { url: string };
	SettingStack: NavigatorScreenParams<SettingStackParamList>;
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
		isMainChannel?: boolean;
		openKeyboardAtMount?: boolean;
	};
	Profile: { id: string };
	ProfileOther: {
		id: string;
		isFromNoti?: boolean;
		isOwnChannelFeed?: boolean;
	};
	CollectionDetail: { slug: string; title: string };
	FollowingAccounts: {
		accountId: string;
		isMainChannel?: boolean;
	};
	FollowerAccounts: {
		accountId: string;
		isMainChannel?: boolean;
	};
};

// ********** Notification Stack ********** //

export type NotiStackParamList = {
	NotificationList: {
		tabIndex: number;
	};
	FeedDetail: {
		id: string;
		isMainChannel?: boolean;
		openKeyboardAtMount?: boolean;
	};
	Profile: { id: string };
	ProfileOther: {
		id: string;
		isFromNoti?: boolean;
		isOwnChannelFeed?: boolean;
	};
	FollowingAccounts: {
		accountId: string;
		isMainChannel?: boolean;
	};
	FollowerAccounts: {
		accountId: string;
		isMainChannel?: boolean;
	};
};

export type NotificationScreenNavigationProp = NavigationProp<
	NotiStackParamList,
	'NotificationList'
>;
export type NotificationScreenRouteProp = RouteProp<
	NotiStackParamList,
	'NotificationList'
>;
// ********** Notification Stack ********** //

export type ConversationsStackParamList = {
	ConversationList: undefined;
	NewMessage: undefined;
	ConversationDetail: {
		id: string;
		isFromNotification?: boolean;
		isFromProfile?: boolean;
	};
	InitiateNewConversation: {
		account: Pathchwork.Account;
	};
	NotificationRequests: undefined;
	Profile: { id: string };
	ProfileOther: {
		id: string;
		isFromNoti?: boolean;
		isOwnChannelFeed?: boolean;
	};
	FollowingAccounts: {
		accountId: string;
		isMainChannel?: boolean;
	};
	FollowerAccounts: {
		accountId: string;
		isMainChannel?: boolean;
	};
};

export type GuestStackParamList = {
	Login: undefined;
	Register: undefined;
	Welcome: undefined;
	ForgotPassword: undefined;
	ForgotPasswordOTP: { email: string; reset_password_token: string };
	ChangePassword: { reset_password_token: string };
};

export type SettingStackParamList = {
	Settings: undefined;
	UpdatePassword: undefined;
	MuteAndBlockList: undefined;
	MyInformation: undefined;
};

export type CommonCompositeNavigationProp = CompositeNavigationProp<
	StackNavigationProp<HomeStackParamList>,
	StackNavigationProp<BottomStackParamList>
>;

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

export type SettingStackScreenProps<S extends keyof SettingStackParamList> =
	StackScreenProps<SettingStackParamList, S>;

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
