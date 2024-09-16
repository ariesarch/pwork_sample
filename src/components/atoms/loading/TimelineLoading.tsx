import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

type Props = {
  isMediaPlaceholder?: boolean;
  borderLineVisible?: boolean;
  style?: StyleProp<ViewStyle>;
};
const TimelineLoading: React.FC<Props> = ({
  isMediaPlaceholder = false,
  borderLineVisible = false,
  style,
}) => {
  return (
    <View
      style={[{
        flex: 1,
        paddingHorizontal: 20,
        // backgroundColor: colors.backgroundPrimary,
        // // backgroundColor:"blue",
        // paddingHorizontal: 16,
        // paddingVertical: 16,
        // ...(borderLineVisible && {
        //   borderBottomWidth: moderateScale(1),
        //   borderBottomColor: colors.divider,
        // }),
      }, style]}
    >
      <SkeletonPlaceholder backgroundColor="#585e62">
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={38}
              height={38}
              borderRadius={50}
            />
            <SkeletonPlaceholder.Item marginLeft={8}>
              <SkeletonPlaceholder.Item
                width={80}
                height={10}
                marginBottom={8}
              />
              <SkeletonPlaceholder.Item
                width={150}
                height={8}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={16}>
            <SkeletonPlaceholder.Item
              width={"100%"}
              height={12}
              marginBottom={8}
            />
            <SkeletonPlaceholder.Item
              width={"70%"}
              height={12}
            />

            {isMediaPlaceholder && (
              <SkeletonPlaceholder.Item
                width={"100%"}
                height={200}
                borderRadius={12}
                marginTop={16}
              />
            )}
          </SkeletonPlaceholder.Item>
          {/* Reaction */}
          <SkeletonPlaceholder.Item
            marginTop={16}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <SkeletonPlaceholder.Item flexDirection="row" gap={8}>
              <SkeletonPlaceholder.Item
                width={24}
                height={24}
                borderRadius={50}
              />
              <SkeletonPlaceholder.Item
                width={24}
                height={24}
                borderRadius={50}
              />
              <SkeletonPlaceholder.Item
                width={24}
                height={24}
                borderRadius={50}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item flexDirection="row" gap={8}>
              <SkeletonPlaceholder.Item
                width={24}
                height={24}
                borderRadius={50}
              />
              <SkeletonPlaceholder.Item
                width={24}
                height={24}
                borderRadius={50}
              />
              <SkeletonPlaceholder.Item
                width={24}
                height={24}
                borderRadius={50}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default TimelineLoading;
