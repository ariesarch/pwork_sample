import React, { createContext, ReactNode, useContext } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

type ScrollContextType = {
	channelScrollYOffset: SharedValue<number>;
	profileScrollYOffest: SharedValue<number>;
};

type ScrollProviderProps = {
	children: ReactNode;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
	const channelScrollYOffset = useSharedValue(0);
	const profileScrollYOffest = useSharedValue(0);

	return (
		<ScrollContext.Provider
			value={{ channelScrollYOffset, profileScrollYOffest }}
		>
			{children}
		</ScrollContext.Provider>
	);
};

export const useSharedScrollY = (page: 'Channel' | 'Profile') => {
	const context = useContext(ScrollContext);
	if (!context)
		throw new Error('Error:: Using useSharedScrollY hook outside of provider');
	return page === 'Channel'
		? context.channelScrollYOffset
		: context.profileScrollYOffest;
};
