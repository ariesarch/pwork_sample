import { Circle, Path, Svg, SvgProps } from 'react-native-svg';

type ColorSchemeType = {
	colorScheme?: 'dark' | 'light';
};

export const CommunityIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
		<Path
			stroke={colorScheme == 'dark' ? '#fff' : '#000'}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.2}
			d="M1.333 7.544V12c0 .934 0 1.4.182 1.757.16.314.415.569.728.728.357.182.823.182 1.755.182h8.005c.931 0 1.397 0 1.753-.182.314-.16.57-.414.73-.728.18-.356.18-.822.18-1.754v-4.46c0-.445 0-.668-.054-.875a1.665 1.665 0 0 0-.233-.514c-.12-.177-.287-.324-.623-.617l-4-3.5c-.622-.545-.933-.817-1.283-.92a1.668 1.668 0 0 0-.946 0c-.35.103-.66.375-1.282.918l-4 3.502c-.336.293-.503.44-.623.617-.107.157-.186.33-.234.514-.054.207-.054.43-.054.876Z"
		/>
	</Svg>
);

export const GalleryIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M10 4H7.2c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 0 0-.874.874C4 5.52 4 6.08 4 7.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h9.824c1.118 0 1.677 0 2.104-.218.377-.191.683-.498.875-.874.218-.428.218-.987.218-2.105V14"
		/>
		<Path
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="m5 18 2.5-2.438c.066-.064.098-.096.128-.12a1.289 1.289 0 0 1 1.795.12 1.288 1.288 0 0 0 1.795.121c.03-.024.063-.056.128-.12l2.152-2.064c.848-.813 2.205-.863 3.002.001v0c1.432 1.552 3 4.5 3 4.5M20.195 14.5V7.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.873-.874C18.675 4 18.116 4 16.998 4H8"
		/>
		<Circle cx={10} cy={9} r={2} stroke="#fff" strokeWidth={2} />
	</Svg>
);

export const GifIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			fill="#fff"
			d="M11.5 15V9H13v6h-1.5ZM6 15a.92.92 0 0 1-.725-.312A1.02 1.02 0 0 1 5 14v-4c0-.25.092-.48.275-.688A.92.92 0 0 1 6 9h3c.3 0 .542.104.725.312.183.209.275.438.275.688v.5H6.5v3h2V12H10v2c0 .25-.092.48-.275.688A.92.92 0 0 1 9 15H6Zm8.5 0V9H19v1.5h-3v1h2V13h-2v2h-1.5Z"
		/>
		<Path
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9.53 4H6.25c-1.313 0-1.97 0-2.47.218-.442.192-.8.497-1.025.874C2.5 5.52 2.5 6.08 2.5 7.2v9.6c0 1.12 0 1.68.255 2.108.225.376.583.682 1.024.874.5.218 1.157.218 2.466.218h11.51c1.31 0 1.964 0 2.465-.218.44-.192.8-.498 1.025-.874.255-.428.255-.987.255-2.105V14"
		/>
		<Path
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M21.5 16V7.657c0-1.28 0-1.92-.25-2.409-.22-.43-.571-.78-1.003-1C19.756 4 19.113 4 17.83 4H7.5"
		/>
	</Svg>
);

export const LocationIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			stroke="#fff"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M13.75 19.624C16.144 16.036 20 13.812 20 9.5a7.5 7.5 0 0 0-15 0c0 4.312 3.857 6.536 6.25 10.124L12.5 21.5l1.25-1.876Z"
			clipRule="evenodd"
		/>
		<Circle cx={12.5} cy={9.5} r={2.5} stroke="#fff" strokeWidth={2} />
	</Svg>
);

export const PollIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={5.5} cy={7.5} r={2.5} stroke="#fff" strokeWidth={2} />
    <Path stroke="#fff" strokeLinecap="round" strokeWidth={2} d="M11 7.5h10" />
    <Circle cx={5.5} cy={16.5} r={2.5} stroke="#fff" strokeWidth={2} />
    <Path stroke="#fff" strokeLinecap="round" strokeWidth={2} d="M11 16.5h10" />
  </Svg>
)

export const ComposeGlobeIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeWidth={2}
      d="M20 12a8.002 8.002 0 1 1-16.003 0A8.002 8.002 0 0 1 20 12Z"
    />
    <Path
      stroke="#fff"
      strokeWidth={2}
      d="M15.199 12a18.9 18.9 0 0 1-.244 3.062c-.16.97-.396 1.852-.694 2.596-.297.743-.65 1.332-1.038 1.734-.389.402-.805.61-1.225.61-.42 0-.836-.208-1.224-.61-.389-.402-.741-.992-1.038-1.734-.298-.744-.534-1.625-.695-2.596A18.894 18.894 0 0 1 8.798 12c0-1.05.082-2.091.243-3.062.16-.97.397-1.852.695-2.595.296-.744.65-1.333 1.037-1.735.39-.4.805-.609 1.225-.609.42 0 .836.207 1.225.609.388.402.741.992 1.038 1.735.298.743.534 1.624.694 2.595.16.97.244 2.011.244 3.062Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="M3.999 12H20"
    />
  </Svg>
)

export const ComposeLinkIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
  <Svg width="22" height="17" viewBox="0 0 22 17" fill="none" {...props}>
    <Path
      fill="#fff"
      d="m19.66 9.023-3.719 3.72a4.75 4.75 0 0 1-6.773 0 4.791 4.791 0 0 1-.531-6.177l.033-.033c.365-.498 1.03-.597 1.494-.265.465.332.598.996.232 1.494l-.033.033a2.676 2.676 0 0 0 .3 3.453c1.028 1.063 2.722 1.063 3.784 0l3.719-3.719c1.063-1.062 1.063-2.756 0-3.785a2.676 2.676 0 0 0-3.453-.299l-.033.034a1.06 1.06 0 0 1-1.495-.233c-.332-.465-.232-1.129.233-1.494l.066-.033a4.791 4.791 0 0 1 6.176.531 4.75 4.75 0 0 1 0 6.773ZM2.428 8.26l3.718-3.752a4.85 4.85 0 0 1 6.807 0c1.66 1.66 1.86 4.283.498 6.209l-.033.033c-.332.498-1.03.598-1.494.266a1.06 1.06 0 0 1-.233-1.495l.034-.033a2.673 2.673 0 0 0-.3-3.453c-1.029-1.062-2.722-1.062-3.784 0L3.92 9.754c-1.028 1.03-1.028 2.723 0 3.785.93.93 2.392 1.063 3.454.299l.033-.033a1.06 1.06 0 0 1 1.494.232c.332.465.233 1.129-.232 1.494l-.066.034c-1.893 1.36-4.516 1.128-6.176-.532a4.75 4.75 0 0 1 0-6.773Z"
    />
  </Svg>
)

export const PlusIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="M6 12h12M11.898 18V6"
    />
  </Svg>
)