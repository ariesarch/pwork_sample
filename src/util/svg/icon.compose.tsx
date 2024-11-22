import { Circle, Path, Svg, SvgProps } from 'react-native-svg';

type ColorSchemeType = {
	colorScheme?: 'dark' | 'light';
	forceLight?: boolean;
};

export const ComposeCommunityIcon = ({
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

export const ComposeGalleryIcon = ({
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

export const ComposeGifIcon = ({
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

export const ComposeLocationIcon = ({
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

export const ComposePollIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Circle
			cx={5.5}
			cy={7.5}
			r={2.5}
			stroke={props.stroke || '#fff'}
			strokeWidth={2}
		/>
		<Path
			stroke={props.stroke || '#fff'}
			strokeLinecap="round"
			strokeWidth={2}
			d="M11 7.5h10"
		/>
		<Circle
			cx={5.5}
			cy={16.5}
			r={2.5}
			stroke={props.stroke || '#fff'}
			strokeWidth={2}
		/>
		<Path
			stroke={props.stroke || '#fff'}
			strokeLinecap="round"
			strokeWidth={2}
			d="M11 16.5h10"
		/>
	</Svg>
);

export const ComposeGlobeIcon = ({
	colorScheme,
	forceLight,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="22" height="21" viewBox="0 0 22 21" fill="none" {...props}>
		<Path
			fill={forceLight ? '#fff' : colorScheme == 'dark' ? '#fff' : '#000'}
			d="M11 18.625c.273 0 1.055-.273 1.836-1.875a9.851 9.851 0 0 0 .86-2.5h-5.43c.234.977.507 1.797.859 2.5.82 1.602 1.563 1.875 1.875 1.875Zm-3.047-6.25h6.055a15.107 15.107 0 0 0 0-3.75H7.953c-.078.625-.078 1.25-.078 1.875 0 .664 0 1.29.078 1.875Zm.313-5.625h5.43a10.092 10.092 0 0 0-.86-2.46C12.055 2.686 11.273 2.374 11 2.374c-.313 0-1.055.313-1.875 1.914-.352.703-.625 1.524-.86 2.461Zm7.617 1.875c.078.625.078 1.25.078 1.875 0 .664 0 1.29-.078 1.875h3.008a7.25 7.25 0 0 0 .234-1.875c0-.625-.078-1.25-.234-1.875h-3.008Zm2.305-1.875a8.037 8.037 0 0 0-3.829-3.633c.547 1.016.977 2.266 1.25 3.633h2.579Zm-11.836 0c.273-1.367.703-2.617 1.25-3.633A8.037 8.037 0 0 0 3.773 6.75h2.579ZM3.07 8.625c-.117.625-.195 1.25-.195 1.875 0 .664.04 1.29.195 1.875h3.008C6 11.789 6 11.165 6 10.5c0-.625 0-1.25.078-1.875H3.07Zm11.29 9.297a7.94 7.94 0 0 0 3.828-3.672h-2.579c-.273 1.406-.703 2.656-1.25 3.672Zm-6.758 0c-.547-1.016-.977-2.266-1.25-3.672H3.773a7.94 7.94 0 0 0 3.829 3.672ZM11 20.5c-3.594 0-6.875-1.875-8.672-5-1.797-3.086-1.797-6.875 0-10C4.125 2.414 7.406.5 11 .5c3.555 0 6.836 1.914 8.633 5 1.797 3.125 1.797 6.914 0 10a9.926 9.926 0 0 1-8.633 5Z"
		/>
	</Svg>
);

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
);

export const ComposePlusIcon = ({
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
);

export const ComposePinIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="18" height="21" viewBox="0 0 18 21" fill="none" {...props}>
		<Path
			fill={colorScheme == 'dark' ? '#fff' : '#000'}
			d="M12.5 10.266c.43-1.016.625-1.758.625-2.266 0-3.086-2.54-5.625-5.625-5.625A5.626 5.626 0 0 0 1.875 8c0 .508.156 1.25.586 2.266.39.937.977 2.03 1.64 3.125 1.133 1.796 2.422 3.515 3.399 4.765.938-1.25 2.227-2.968 3.36-4.765.663-1.094 1.25-2.188 1.64-3.125ZM8.398 20.03a1.178 1.178 0 0 1-1.835 0C4.57 17.492 0 11.438 0 8 0 3.86 3.36.5 7.5.5 11.64.5 15 3.86 15 8c0 3.438-4.57 9.492-6.602 12.031Z"
		/>
	</Svg>
);

export const ComposeUnlockIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="18" height="21" viewBox="0 0 18 21" fill="none" {...props}>
		<Path
			fill={colorScheme == 'dark' ? '#fff' : '#000'}
			d="M5.625 5.5V8H15c1.367 0 2.5 1.133 2.5 2.5V18c0 1.406-1.133 2.5-2.5 2.5H2.5A2.468 2.468 0 0 1 0 18v-7.5C0 9.133 1.094 8 2.5 8h1.25V5.5c0-2.734 2.227-5 5-5 2.227 0 4.102 1.484 4.727 3.477a.933.933 0 0 1-.586 1.171.933.933 0 0 1-1.172-.585c-.43-1.25-1.602-2.188-2.969-2.188A3.11 3.11 0 0 0 5.625 5.5Zm-3.75 5V18c0 .352.273.625.625.625H15a.642.642 0 0 0 .625-.625v-7.5c0-.313-.313-.625-.625-.625H2.5a.642.642 0 0 0-.625.625Z"
		/>
	</Svg>
);

export const ComposeLockIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="18" height="21" viewBox="0 0 18 21" fill="none" {...props}>
		<Path
			fill={colorScheme == 'dark' ? '#fff' : '#000'}
			d="M5.625 5.5V8h6.25V5.5A3.134 3.134 0 0 0 8.75 2.375 3.11 3.11 0 0 0 5.625 5.5ZM3.75 8V5.5c0-2.734 2.227-5 5-5 2.734 0 5 2.266 5 5V8H15c1.367 0 2.5 1.133 2.5 2.5V18c0 1.406-1.133 2.5-2.5 2.5H2.5A2.468 2.468 0 0 1 0 18v-7.5C0 9.133 1.094 8 2.5 8h1.25Zm-1.875 2.5V18c0 .352.273.625.625.625H15a.642.642 0 0 0 .625-.625v-7.5c0-.313-.313-.625-.625-.625H2.5a.642.642 0 0 0-.625.625Z"
		/>
	</Svg>
);

export const ComposeMentionIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
		<Path
			fill={colorScheme == 'dark' ? '#fff' : '#000'}
			d="M10 2.375c-4.492 0-8.125 3.672-8.125 8.125A8.119 8.119 0 0 0 10 18.625a.95.95 0 0 1 .938.938c0 .546-.43.937-.938.937a9.97 9.97 0 0 1-10-10C0 4.992 4.453.5 10 .5c5.508 0 10 4.492 10 10v1.094c0 1.992-1.64 3.594-3.594 3.594a3.574 3.574 0 0 1-2.968-1.524A4.632 4.632 0 0 1 10 15.188 4.652 4.652 0 0 1 5.312 10.5 4.676 4.676 0 0 1 10 5.812c1.094 0 2.148.43 2.93 1.055.195-.234.468-.43.82-.43a.95.95 0 0 1 .938.938v4.219c0 .976.742 1.719 1.718 1.719.938 0 1.719-.743 1.719-1.72V10.5c0-4.453-3.672-8.125-8.125-8.125Zm2.813 8.125c0-.977-.547-1.914-1.407-2.422-.898-.508-1.953-.508-2.812 0A2.772 2.772 0 0 0 7.188 10.5c0 1.016.507 1.953 1.406 2.46.86.509 1.914.509 2.812 0a2.87 2.87 0 0 0 1.406-2.46Z"
		/>
	</Svg>
);

export const ComposeCircleCheckIcon = (props: SvgProps) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			fill="#FF3C26"
			d="M12 24C5.344 24 0 18.656 0 12 0 5.39 5.344 0 12 0c6.61 0 12 5.39 12 12 0 6.656-5.39 12-12 12Zm5.297-14.203h-.047c.469-.422.469-1.125 0-1.594a1.104 1.104 0 0 0-1.547 0l-5.203 5.25-2.203-2.203c-.469-.469-1.172-.469-1.594 0a1.027 1.027 0 0 0 0 1.547l3 3c.422.469 1.125.469 1.594 0l6-6Z"
		/>
	</Svg>
);

export const ComposeRepostSendIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="15" height="13" viewBox="0 0 15 13" fill="none" {...props}>
		<Path
			fill={colorScheme == 'dark' ? '#fff' : '#000'}
			d="M4.637 6.094h6.836L2.777 2.375l1.86 3.719Zm0 1.312-1.86 3.746 8.696-3.746H4.637ZM2.203.707l12.25 5.25a.896.896 0 0 1 .547.82.887.887 0 0 1-.547.793l-12.25 5.25a.889.889 0 0 1-.984-.218c-.246-.247-.301-.657-.137-.985L3.516 6.75 1.082 1.91A.917.917 0 0 1 1.219.898a.93.93 0 0 1 .984-.191Z"
		/>
	</Svg>
);

export const ComposeRepostInputExplorer = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			stroke={colorScheme == 'dark' ? '#fff' : '#000'}
			strokeLinecap="round"
			strokeOpacity={0.8}
			strokeWidth={2}
			d="M15 3v6M15 9h6M9 21v-6M9 15H3"
		/>
	</Svg>
);

export const ComposeCameraIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
		<Path
			stroke={colorScheme == 'dark' ? '#fff' : '#000'}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9.65 6H6.197c-1.382 0-2.073 0-2.6.19-.465.169-.842.436-1.078.765-.269.375-.269.865-.269 1.845v8.4c0 .98 0 1.47.269 1.844.236.33.613.597 1.077.765.527.19 1.218.19 2.596.19L18.308 20c1.378 0 2.067 0 2.595-.19.464-.168.842-.437 1.078-.766.269-.374.269-.863.269-1.841V14.75"
		/>
		<Path
			stroke={colorScheme == 'dark' ? '#fff' : '#000'}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M14.85 20h3.454c1.38 0 2.072 0 2.6-.19.464-.168.84-.436 1.077-.765.269-.375.269-.865.269-1.845V8.8c0-.98 0-1.47-.269-1.844-.236-.33-.613-.597-1.077-.765C20.377 6 19.686 6 18.308 6L6.192 6c-1.378 0-2.067 0-2.595.19-.464.168-.842.437-1.078.766-.269.374-.269.863-.269 1.841v2.453"
		/>
		<Circle
			cx={12.25}
			cy={13}
			r={3}
			stroke={colorScheme == 'dark' ? '#fff' : '#000'}
			strokeWidth={2}
		/>
		<Path
			stroke={colorScheme == 'dark' ? '#fff' : '#000'}
			strokeWidth={2}
			d="M14.25 5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1h-5V5Z"
		/>
	</Svg>
);

export const ComposeOpenGalleryIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
		<Path
			stroke={colorScheme == 'dark' ? '#fff' : '#000'}
			strokeLinecap="round"
			strokeWidth={2}
			d="M6.25 12h12M12.148 18V6"
		/>
	</Svg>
);

export const ComposeAddFileIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
		<Path
			stroke={colorScheme == 'dark' ? '#fff' : '#000'}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M3.5 9v10.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C4.26 21 4.54 21 5.098 21H15.5m-1-8v-3m0 0V7m0 3h-3m3 0h3m-10 3.8V6.2c0-1.12 0-1.68.218-2.108.192-.377.497-.682.874-.874C9.02 3 9.58 3 10.7 3h7.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874c.218.428.218.988.218 2.108v7.6c0 1.12 0 1.68-.218 2.108a2.001 2.001 0 0 1-.874.874c-.428.218-.986.218-2.104.218h-7.607c-1.118 0-1.678 0-2.105-.218a2 2 0 0 1-.874-.874C7.5 15.48 7.5 14.92 7.5 13.8Z"
		/>
	</Svg>
);

export const DeletePollOptionIcon = (props: SvgProps) => (
	<Svg width="25" height="25" fill="none" viewBox="0 0 24 24" {...props}>
		<Path
			stroke={props.stroke || '#fff'}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="m16 8-8 8m4-4 4 4M8 8l2 2m11 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
		/>
	</Svg>
);

export const PollDropperIcon = (props: SvgProps) => (
	<Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
		<Path
			d={'m12 6-4 4-4-4'}
			stroke={'#FF3C26'}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
