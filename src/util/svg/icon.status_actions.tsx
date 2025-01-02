import {
	Circle,
	ClipPath,
	Defs,
	G,
	Path,
	Svg,
	SvgProps,
} from 'react-native-svg';

export const StatusMenuIcon = (props: SvgProps) => (
	<Svg width="14" height="18" viewBox="0 0 14 18" fill="none" {...props}>
		<Path
			d="M7.5 4.75024C7.27019 4.75024 7.04262 4.70498 6.8303 4.61703C6.61798 4.52909 6.42507 4.40018 6.26256 4.23768C6.10006 4.07518 5.97116 3.88226 5.88321 3.66994C5.79527 3.45762 5.75 3.23006 5.75 3.00024C5.75 2.77043 5.79527 2.54287 5.88321 2.33055C5.97116 2.11823 6.10006 1.92531 6.26256 1.76281C6.42507 1.6003 6.61798 1.4714 6.8303 1.38345C7.04262 1.29551 7.27019 1.25024 7.5 1.25024C7.96413 1.25024 8.40925 1.43462 8.73744 1.76281C9.06563 2.091 9.25 2.53612 9.25 3.00024C9.25 3.46437 9.06563 3.90949 8.73744 4.23768C8.40925 4.56587 7.96413 4.75024 7.5 4.75024ZM7.5 10.7502C7.03587 10.7502 6.59075 10.5659 6.26256 10.2377C5.93437 9.90949 5.75 9.46437 5.75 9.00024C5.75 8.53612 5.93437 8.091 6.26256 7.76281C6.59075 7.43462 7.03587 7.25024 7.5 7.25024C7.96413 7.25024 8.40925 7.43462 8.73744 7.76281C9.06563 8.091 9.25 8.53612 9.25 9.00024C9.25 9.46437 9.06563 9.90949 8.73744 10.2377C8.40925 10.5659 7.96413 10.7502 7.5 10.7502ZM5.75 15.0002C5.75 15.4644 5.93437 15.9095 6.26256 16.2377C6.59075 16.5659 7.03587 16.7502 7.5 16.7502C7.96413 16.7502 8.40925 16.5659 8.73744 16.2377C9.06563 15.9095 9.25 15.4644 9.25 15.0002C9.25 14.5361 9.06563 14.091 8.73744 13.7628C8.40925 13.4346 7.96413 13.2502 7.5 13.2502C7.03587 13.2502 6.59075 13.4346 6.26256 13.7628C5.93437 14.091 5.75 14.5361 5.75 15.0002Z"
			fill="#828689"
			fill-opacity="0.4"
		/>
	</Svg>
);
export const StatusDeleteIcon = (props: SvgProps) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			stroke="#FFFFFF"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M6 6v11.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h5.606c1.118 0 1.677 0 2.104-.218.377-.192.683-.498.875-.874.218-.428.218-.987.218-2.105V6M6 6h2M6 6H4m4 0h8M8 6c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.082-1.083C9.602 3 10.068 3 11 3h2c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C16 4.602 16 5.068 16 6m0 0h2m0 0h2"
		/>
	</Svg>
);

export const StatusEditIcon = (props: SvgProps) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			stroke="#FFFFFF"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="m12 8-8 8v4h4l8-8m-4-4 2.869-2.869.001-.001c.395-.395.593-.593.821-.667a1 1 0 0 1 .618 0c.228.074.425.272.82.666l1.74 1.74c.396.396.594.594.668.822a1 1 0 0 1 0 .618c-.074.228-.272.426-.668.822h0L16 12.001m-4-4 4 4"
		/>
	</Svg>
);

export const StatusBlockIcon = (props: SvgProps) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			stroke="#FFFFFF"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="m5.75 5.75 12.5 12.5M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
		/>
	</Svg>
);

export const StatusFollowIcon = (props: SvgProps) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Circle cx={14} cy={12.833} fill="#FFFFFF" r={3.5} />
		<Path
			d="M14.583 19.834c-4.666-.467-6.222 3.11-6.416 4.666h11.666c.195-1.166-.583-4.2-5.25-4.666Z"
			fill={props.stroke || '#FFFFFF'}
		/>
		<Path
			d="M19.833 23.333c0-1.933-2.611-3.5-5.833-3.5s-5.833 1.567-5.833 3.5m16.333-3.5c0-1.435-1.44-2.668-3.5-3.208M3.5 19.833c0-1.435 1.44-2.668 3.5-3.208m14-4.683a3.5 3.5 0 1 0-4.667-5.218M7 11.942a3.5 3.5 0 1 1 4.667-5.218M14 16.333a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
			stroke={props.stroke || '#FFFFFF'}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);

export const StatusMuteIcon = (props: SvgProps) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			d="M15 17v1a3 3 0 1 1-6 0v-1m6 0H9m6 0h3.59c.383 0 .575 0 .73-.052a1 1 0 0 0 .627-.628c.053-.156.053-.348.053-.734 0-.169 0-.253-.014-.334a.998.998 0 0 0-.173-.42c-.048-.067-.108-.127-.227-.246l-.39-.39a.67.67 0 0 1-.196-.474V10a7 7 0 1 0-14 0v3.722a.67.67 0 0 1-.196.474l-.39.39c-.12.12-.179.179-.226.245a1 1 0 0 0-.175.421c-.013.08-.013.165-.013.334 0 .386 0 .578.052.734a1 1 0 0 0 .629.628c.155.052.346.052.729.052H9"
			stroke={props?.stroke || '#FFFFFF'}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			stroke={props?.stroke || '#FFFFFF'}
			strokeWidth={2}
			strokeLinecap="round"
			d="m19.165 3.405-13.76 17.43"
		/>
	</Svg>
);

export const StatusReportIcon = (props: SvgProps) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			d="M12.002 9v4m-7.621 2.2c-.91 1.575-1.364 2.363-1.296 3.01a2 2 0 0 0 .813 1.408C4.424 20 5.333 20 7.15 20h9.703c1.818 0 2.727 0 3.252-.382a2 2 0 0 0 .814-1.409c.068-.646-.386-1.434-1.296-3.01l-4.85-8.4c-.909-1.574-1.364-2.362-1.958-2.626a2 2 0 0 0-1.627 0c-.593.264-1.048 1.052-1.957 2.625L4.381 15.2Zm7.672.8v.1h-.1V16h.1Z"
			stroke={props?.stroke || '#FFFFFF'}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);

export const RemoveCrossIcon = (props: SvgProps) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<G clipPath="url(#a)">
			<Path
				d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm2.466 4.26L12 10.727 9.536 8.26a.9.9 0 1 0-1.273 1.273l2.465 2.468-2.465 2.469a.9.9 0 0 0 1.273 1.273L12 13.275l2.466 2.468a.9.9 0 1 0 1.273-1.273l-2.467-2.469 2.466-2.468a.9.9 0 1 0-1.272-1.273Z"
				fill={props.fill || '#9299A3'}
			/>
		</G>
		<Defs>
			<ClipPath id="a">
				<Path fill="#fff" transform="translate(4 4)" d="M0 0h16v16H0z" />
			</ClipPath>
		</Defs>
	</Svg>
);
