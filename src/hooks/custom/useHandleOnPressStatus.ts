import { useCallback } from 'react';
import { NavigationProp } from '@react-navigation/native';

const useHandleOnPressStatus = (
  feed: Pathchwork.Status[],
  navigation: NavigationProp<any>,
  screenToNavigate: string,
) => {
  return useCallback(
    (item: Pathchwork.Status) => {
      const index = feed.findIndex(feedItem => feedItem.id === item.id);
      if (index < 100) {
        navigation.navigate(screenToNavigate, {
          id: item.id,
          selectedFeedIndex: index,
        });
      } else {
        navigation.navigate(screenToNavigate, { id: item.id });
      }
    },
    [feed, navigation],
  );
};

export default useHandleOnPressStatus;
