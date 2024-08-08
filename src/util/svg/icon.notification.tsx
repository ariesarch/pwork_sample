import { Path, Svg, SvgProps } from "react-native-svg";

interface ColorSchemeProps {
	colorScheme?: 'dark' | 'light';
};

export const NotificationFavoriteIcon = (props: SvgProps) => (
  <Svg width="20" height="17" viewBox="0 0 20 17" fill="none" {...props}>
    <Path
      fill="#FF3C26"
      stroke="#FF3C26"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.237 2.237a4.098 4.098 0 0 1 .135 5.654l-7.373 8.11-7.37-8.11a4.098 4.098 0 1 1 6.23-5.316L10 4l1.14-1.425a4.098 4.098 0 0 1 6.097-.338Z"
    />
  </Svg>
)

export const NotificationCommentIcon = (props: SvgProps) => (
  <Svg fill="none" width="20" height="18" viewBox="0 0 20 18" {...props}>
    <Path
      fill="#FF3C26"
      d="M14 5h4a1 1 0 0 1 1 1v11l-3.333-2.769a1.002 1.002 0 0 0-.64-.231H7a1 1 0 0 1-1-1v-3H4.973c-.234 0-.46.082-.64.23L1 13V2a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v3Z"
    />
    <Path
      stroke="#2E363B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5h4a1 1 0 0 1 1 1v11l-3.333-2.769a1.002 1.002 0 0 0-.64-.231H7a1 1 0 0 1-1-1v-3m8-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11l3.333-2.77c.18-.148.406-.23.64-.23H6m8-5v4a1 1 0 0 1-1 1H6"
    />
  </Svg>
)
export const NotificationRepostIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeProps) => (
  <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" {...props}>
    <Path
      stroke="#FF3C26"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.999 14h-5v5m9-13h5V1M1.582 7.003a8 8 0 0 1 14.331-1.027m.504 7.021a8 8 0 0 1-14.332 1.027"
    />
  </Svg>
)

export const NotificationPeopleFollowIcon = (props: SvgProps) => (
  <Svg width="14" height="17" viewBox="0 0 14 17" fill="none" {...props}>
    <Path
      stroke="#FF3C26"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16c0-2.21-2.686-4-6-4s-6 1.79-6 4m6-7a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
    />
  </Svg>
)